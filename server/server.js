import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import Fuse from 'fuse.js';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

function fuzzyMatch(input, options) {
  const fuse = new Fuse(options, {
    threshold: 0.4,
    includeScore: true,
  });
  const results = fuse.search(input);
  return results.length > 0 ? results[0].item : null;
}

app.get('/api/search', async (req, res) => {
  const { hospital, location, service } = req.query;

  try {
    const hospitalsPath = path.join(DATA_DIR, 'Hospital.json');
    const hospitalsData = JSON.parse(fs.readFileSync(hospitalsPath, 'utf-8'));
    let matchedHospitals = hospitalsData.Hospitals;

    // Fuzzy match for hospital input
    if (hospital) {
      const hospitalNames = matchedHospitals.map(h => h.Hospital_Name);
      const matchedName = fuzzyMatch(hospital, hospitalNames);
      if (matchedName) {
        matchedHospitals = matchedHospitals.filter(h => h.Hospital_Name === matchedName);
      } else {
        return res.status(404).json({ error: 'No matching hospitals found.' });
      }
    }

    // Match location if provided
    if (location) {
      matchedHospitals = matchedHospitals.filter(h => {
        const fullAddress = `${h.Address} ${h.City || ''} ${h.State || ''} ${h.Zip || ''}`;
        return normalize(fullAddress).includes(normalize(location));
      });

      if (matchedHospitals.length === 0) {
        return res.status(404).json({ error: 'No matching hospitals found at this location.' });
      }
    }

    const allServices = [];

    // Loop over every JSON file except Hospital.json
    const allFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f !== 'Hospital.json');

    for (const file of allFiles) {
      const filePath = path.join(DATA_DIR, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      for (const hospitalKey in data) {
        const hospitalNormalized = normalize(hospitalKey.replace(/_/g, ' '));

        const match = matchedHospitals.find(h =>
          normalize(h.Hospital_Name) === hospitalNormalized
        );

        if (match) {
          const rawServices = data[hospitalKey];

          const filteredServices = service
            ? rawServices.filter(s =>
                normalize(s.Description).includes(normalize(service))
              )
            : rawServices;

          const enriched = filteredServices.map(s => ({
            ...s,
            hospitalName: match.Hospital_Name,
          }));

          allServices.push(...enriched);
        }
      }
    }

    if (allServices.length === 0) {
      return res.status(404).json({ error: 'Services not found for matched hospitals.' });
    }

    res.json(allServices);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

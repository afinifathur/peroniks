const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDirs = [
  'public/images/company/certifications',
  'public/images/company/factory',
  'public/images/company/factory/archive',
  'public/images/company/laboratory',
  'public/images/company/timeline'
];

// Ensure all future-ready directories exist
rootDirs.forEach(dir => {
  const absolutePath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
    console.log(`Created directory: ${absolutePath}`);
  }
});

const assets = [
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/37438-Sertifikat%20ISO%20PERONI%202023-2026.jpg',
    destination: 'public/images/company/certifications/iso9001.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/6f921-Q-25%200002-00_Main_EN_extsigned_page-0001.jpg',
    destination: 'public/images/company/certifications/ped2014.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/c8e34-REACH%20Analysis%20of%20SS%20Flange-Fitting-Valve.jpg',
    destination: 'public/images/company/certifications/reach-ss.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/558db-Report%20of%20Aluminium%20Flanges%20Analysis%20according%20to%20REACH.jpg',
    destination: 'public/images/company/certifications/reach-al.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/89ff3-ROHS%20CERTIFICATE%20-%202019.05.02%20-STAINLESS%20STEEL.jpg',
    destination: 'public/images/company/certifications/rohs-ss.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/e41d2-ROHS%20CERTIFICATE%20-%202019.05.02%20-ALUMINIUM.jpg',
    destination: 'public/images/company/certifications/rohs-al.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/4d4fb-HYDROSTATIC%20TEST%20-%202-PC%20BALL%20VALVE%20REPORT%20%28MERGED%20JPG%29.jpg',
    destination: 'public/images/company/certifications/hydro-ball-valve.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/eaedf-HYDROSTATIC%20TEST%20-%20ELBOW%2090%20FF%20REPORT%20%28MERGED%20JPG%29.jpg',
    destination: 'public/images/company/certifications/hydro-elbow.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/d6618-HYDROSTATIC%20TEST%20-%20HEX%20NIPPLE%20REPORT%20%28MERGED%20JPG%29.jpg',
    destination: 'public/images/company/certifications/hydro-hex-nipple.jpg'
  },
  {
    type: 'certification',
    url: 'https://peroniks.com/images/isoimages/f7430-HYDROSTATIC%20TEST%20-%20UNION%20CONICAL%20FF%20REPORT%20%28MERGED%20JPG%29.jpg',
    destination: 'public/images/company/certifications/hydro-union.jpg'
  },
  {
    type: 'factory',
    url: 'https://peroniks.com/images/gallery/d2252-352ca084-5dbb-4ffb-8c1c-b9354ab68e2b(1).png',
    destination: 'public/images/company/factory/homepage-hero-factory.png'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded: ${path.basename(dest)} (${dest})`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('Starting generic download of company assets...');
  for (const asset of assets) {
    const destPath = path.join(__dirname, '..', asset.destination);
    // If it's the homepage-hero-factory, always attempt to download it for A/B testing
    if (fs.existsSync(destPath) && asset.type !== 'factory') {
      console.log(`Asset already exists, skipping: ${asset.destination}`);
      continue;
    }
    try {
      await download(asset.url, destPath);
    } catch (err) {
      console.error(`Error downloading ${asset.destination} (${asset.type}):`, err.message);
    }
  }
  console.log('All asset downloads completed.');
}

downloadAll();

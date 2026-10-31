require('dotenv').config();

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const admin = require('firebase-admin');
const {
  achievements,
  recognitionPreview,
  testimonials,
  certificateGalleries
} = require('../data/siteData');

const DRY_RUN = process.argv.includes('--dry-run') || process.argv.includes('--preview');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const STORAGE_PREFIX = 'portfolio';

const timelineCards = [
  {
    id: 'timeline_2026_nus_bt1101_ta',
    year: '2026',
    order: 1,
    visible: true,
    entries: [
      {
        title: 'Teaching Assistant — BT1101, NUS',
        description: 'Guided students in introductory programming and data-driven problem solving through tutorials, consultations, and assignment support.'
      }
    ]
  },
  {
    id: 'timeline_2025_national_service',
    year: '2025',
    order: 2,
    visible: true,
    entries: [
      {
        title: 'National Service',
        description: 'Reached the age where I had to serve the nation and protect Singapore. Did well in Basic Military Training (BMT) and got into Specialist Cadet School (SCS), achieving the rank of 3rd Sergeant in the Singapore Armed Forces (SAF). Currently leading a section size of 6-7 men.'
      }
    ]
  },
  {
    id: 'timeline_2023_create_lab',
    year: '2023',
    order: 3,
    visible: true,
    entries: [
      {
        title: 'Part-Timed @ Create Lab Pte Ltd',
        description: 'At Create Lab, a top Singapore startup, I actively contributed by teaching, leading, and managing classes, with the highlight being my role as lead instructor at a successful programming camp.'
      }
    ]
  },
  {
    id: 'timeline_2023_poly_and_pg',
    year: '2023',
    order: 4,
    visible: true,
    entries: [
      {
        title: 'Nanyang Polytechnic',
        description: "With a clear goal and a burning passion for IT, I took on Business & Financial Technology and led the way to excel in the course. Graduated with a perfect 4.0 GPA, earning 28 distinctions & 4 A's out of 32 modules."
      },
      {
        title: 'Proctor & Gamble',
        description: 'Interned as an Associate Researcher at P&G. During my time there, I successfully curated a text and object detection model, backed by sophisticated algorithms to accurately identify specific brands and products from an image.'
      }
    ]
  },
  {
    id: 'timeline_2018_secondary_school',
    year: '2018',
    order: 5,
    visible: true,
    entries: [
      {
        title: 'Mayflower Secondary',
        description: 'Got into Normal Academic Stream (NA). Started to have clearer ambitions and goals that I wanted to achieve. Graduated with Net 6 pointer. Took National Police Cadet Corps (NPCC) as a Co-curricular Activity, and peaked at Staff Sergeant rank. Attained Edusave Scholarship Award 2017 & 2018 and Edusave Eagles Award 2018.'
      }
    ]
  },
  {
    id: 'timeline_2014_primary_school',
    year: '2014',
    order: 6,
    visible: true,
    entries: [
      {
        title: 'Da Qiao Primary',
        description: 'Graduated with 180/300, hit a breaking point, still a bit clueless, and maybe had a little too much fun.',
        icon: '/img/icons/guilty.png'
      }
    ]
  }
];

function getFirebase() {
  const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJSON) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON environment variable');
  }

  const serviceAccount = JSON.parse(serviceAccountJSON);
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || `${serviceAccount.project_id}.firebasestorage.app`;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket
    });
  }

  return {
    db: admin.firestore(),
    bucket: admin.storage().bucket()
  };
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function localPublicPath(publicUrl) {
  if (typeof publicUrl !== 'string' || !publicUrl.startsWith('/')) return null;
  return path.join(PUBLIC_DIR, publicUrl.replace(/^\//, ''));
}

function storagePathFor(publicUrl) {
  return path.posix.join(STORAGE_PREFIX, publicUrl.replace(/^\//, '').split(path.sep).join('/'));
}

function downloadUrl(bucketName, destination, token) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(destination)}?alt=media&token=${token}`;
}

async function createAssetUploader(bucket) {
  const uploaded = new Map();

  return async function uploadPublicAsset(publicUrl) {
    if (typeof publicUrl !== 'string') return publicUrl;
    if (/^https?:\/\//i.test(publicUrl)) return publicUrl;
    if (!publicUrl.startsWith('/')) return publicUrl;

    if (uploaded.has(publicUrl)) return uploaded.get(publicUrl);

    const source = localPublicPath(publicUrl);
    if (!source || !fs.existsSync(source)) {
      console.warn(`Asset not found, keeping original path: ${publicUrl}`);
      uploaded.set(publicUrl, publicUrl);
      return publicUrl;
    }

    const destination = storagePathFor(publicUrl);
    const token = crypto.randomUUID();

    await bucket.upload(source, {
      destination,
      metadata: {
        cacheControl: 'public, max-age=31536000',
        metadata: {
          firebaseStorageDownloadTokens: token
        }
      }
    });

    const url = downloadUrl(bucket.name, destination, token);
    uploaded.set(publicUrl, url);
    console.log(`Uploaded ${publicUrl} -> ${destination}`);
    return url;
  };
}

function coverImageFor(achievement) {
  if (achievement.coverImage) return achievement.coverImage;

  const match = String(achievement.coverClass || '').match(/cover-img(\d+)/);
  if (!match) return null;
  return `/img/book-covers/Book-Cover${match[1]}.png`;
}

async function achievementDocs(uploadAsset) {
  return Promise.all(achievements.map(async (achievement, index) => {
    const coverImage = coverImageFor(achievement);

    return {
      id: `achievement_${index + 1}`,
      data: {
        ...achievement,
        icon: await uploadAsset(achievement.icon),
        iconUrl: await uploadAsset(achievement.icon),
        coverImageUrl: coverImage ? await uploadAsset(coverImage) : null,
        order: index + 1,
        visible: true,
        isActiveDefault: achievement.id === 'firstAchieveBook'
      }
    };
  }));
}

async function galleryItemsWithUploadedAssets(items, uploadAsset) {
  return Promise.all(items.map(async (item) => ({
    ...item,
    src: await uploadAsset(item.src)
  })));
}

async function recognitionGalleryDocs(uploadAsset) {
  const testimonialGallery = {
    id: 'testimonials_main',
    data: {
      type: 'testimonials',
      title: 'Testimonials',
      order: 1,
      visible: true,
      previewItems: await Promise.all(recognitionPreview.testimonials.map(uploadAsset)),
      items: await galleryItemsWithUploadedAssets(testimonials, uploadAsset)
    }
  };

  const certificateDocs = await Promise.all(certificateGalleries.map(async (gallery, index) => ({
    id: `certificates_${slugify(gallery.title)}`,
    data: {
      ...gallery,
      type: 'certificates',
      order: index + 1,
      visible: true,
      previewItems: await Promise.all(recognitionPreview.certificates.map(uploadAsset)),
      items: await galleryItemsWithUploadedAssets(gallery.items, uploadAsset)
    }
  })));

  return [testimonialGallery, ...certificateDocs];
}

async function timelineDocs(uploadAsset) {
  return Promise.all(timelineCards.map(async (timelineCard) => ({
    id: timelineCard.id,
    data: {
      ...timelineCard,
      entries: await Promise.all(timelineCard.entries.map(async (entry) => ({
        ...entry,
        icon: entry.icon ? await uploadAsset(entry.icon) : null,
        iconUrl: entry.icon ? await uploadAsset(entry.icon) : null
      })))
    }
  })));
}

function previewCollection(collectionName, docs) {
  console.log(`\nWould seed ${docs.length} docs into ${collectionName}`);
  docs.forEach((doc) => console.log(`- ${collectionName}/${doc.id}`));
}

async function upsertCollection(db, collectionName, docs) {
  console.log(`\nSeeding ${docs.length} docs into ${collectionName}`);

  const batch = db.batch();
  const timestamp = admin.firestore.FieldValue.serverTimestamp();

  docs.forEach((doc) => {
    const ref = db.collection(collectionName).doc(doc.id);
    batch.set(ref, {
      ...doc.data,
      updatedAt: timestamp
    }, { merge: true });
  });

  await batch.commit();
}

async function main() {
  if (DRY_RUN) {
    previewCollection('achievements', await achievementDocs((value) => value));
    previewCollection('recognitionGalleries', await recognitionGalleryDocs((value) => value));
    previewCollection('timelineCards', await timelineDocs((value) => value));
    console.log('\nDone. No Firestore or Storage writes were made.');
    return;
  }

  const { db, bucket } = getFirebase();
  console.log(`Using Firebase Storage bucket: ${bucket.name}`);

  const uploadAsset = await createAssetUploader(bucket);
  const collections = [
    ['achievements', await achievementDocs(uploadAsset)],
    ['recognitionGalleries', await recognitionGalleryDocs(uploadAsset)],
    ['timelineCards', await timelineDocs(uploadAsset)]
  ];

  for (const [collectionName, docs] of collections) {
    await upsertCollection(db, collectionName, docs);
  }

  console.log('\nDone. Firebase Storage uploads and Firestore seed completed.');
}

main()
  .catch((error) => {
    console.error('Firestore seed failed:', error);
    process.exitCode = 1;
  });

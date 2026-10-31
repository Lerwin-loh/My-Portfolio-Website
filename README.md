# My Portfolio Website

A personal portfolio built with Node.js, Express, Handlebars, and Firebase.

## Run the Website Locally

### Prerequisites

- Node.js 18 or newer
- npm
- A Firebase service-account credential

### 1. Open the project

Open PowerShell or another terminal in the project directory:

```powershell
cd D:\Lerwin\My-Portfolio
```

### 2. Install dependencies

```powershell
npm install
```

You only need to repeat this after dependencies change or when setting up a fresh copy of the repository.

### 3. Configure the environment

Create a `.env` file in the project root if one does not already exist. Add the Firebase service-account JSON on a single line:

```env
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"your-project-id", ... }'
FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
PORT=3000
```

`FIREBASE_SERVICE_ACCOUNT_JSON` is required when the app starts. `FIREBASE_STORAGE_BUCKET` is required when uploading assets with the Firestore seed command. `PORT` is optional and defaults to `3000`.

Keep `.env` private and never commit Firebase credentials.

### 4. Start the website

```powershell
npm start
```

Wait for the terminal to display:

```text
Firebase initialized successfully.
Server is running on port 3000, http://localhost:3000/
```

### 5. View the website

Open the following address in a browser:

```text
http://localhost:3000/
```

Scroll to **My Achievements** to check the BrainHack Hackathon Champion and Artemis Certification books. Hover over a book to open it and view its description.

Press `Ctrl+C` in the terminal when you want to stop the server.

## Development Mode

Use the development server to restart Node.js automatically after source-file changes:

```powershell
npm run dev
```

Refresh the browser after changing Handlebars, CSS, JavaScript, or site data.

## Firestore Seeding

Seeding is **not required** to view the new achievement books locally. The homepage currently renders them from `data/siteData.js`.

To preview what would be seeded without writing to Firestore or Firebase Storage:

```powershell
npm run seed:firestore:preview
```

To upload referenced assets and write the portfolio content to Firebase:

```powershell
npm run seed:firestore
```

The write command updates the `achievements`, `recognitionGalleries`, and `timelineCards` collections using stable document IDs. Projects remain managed in the existing `projects` collection.

## Troubleshooting

- **Missing `FIREBASE_SERVICE_ACCOUNT_JSON`:** Check that `.env` exists in the project root and that the JSON is kept on one line.
- **Port 3000 is already in use:** Set a different value such as `PORT=3001` in `.env`, restart the app, and open that port in the browser.
- **A new cover is missing:** Confirm that both PNG files exist under `public/img/book-covers/` with their original filenames.

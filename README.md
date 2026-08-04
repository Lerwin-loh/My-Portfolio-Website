# My-Portfolio-Website
Portfolio website created with NodeJS

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and add your Firebase service account JSON as a single-line environment variable:

```env
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"your-project-id", ... }'
```

You can also set a custom port if needed:

```env
PORT=3000
```

3. Start the app:

```bash
node app.js
```

For development with auto-restart:

```bash
npx nodemon app.js
```

4. Open the website in your browser:

```text
http://localhost:3000/
```

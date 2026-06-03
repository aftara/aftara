# Deployment Instructions

## Backend on Render

1. Create a MongoDB Atlas cluster and copy the connection string.
2. Create a new Render Web Service from the repository.
3. Set the root directory to `server`.
4. Set build command: `npm install`.
5. Set start command: `npm start`.
6. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN=7d`
   - `CLIENT_ORIGIN=https://your-vercel-domain.vercel.app`

## Frontend on Vercel

1. Import the repository in Vercel.
2. Set framework preset to Vite.
3. Set root directory to `client`.
4. Set build command to `npm run build`.
5. Set output directory to `dist`.
6. Add `VITE_API_URL=https://your-render-service.onrender.com/api`.

## Production Checklist

- Use a strong `JWT_SECRET`.
- Restrict CORS to the production frontend domain.
- Enable HTTPS for camera, geolocation, and speech APIs.
- Verify MongoDB Atlas network access.
- Test SOS with real contacts before demonstration.

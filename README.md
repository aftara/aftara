# OnePulse – AI-Powered Accessibility and Emergency Assistance Platform

OnePulse is a full-stack final year engineering project that helps visually impaired, speech-impaired, and differently-abled users through AI accessibility tools and emergency assistance.

## Abstract

OnePulse combines speech assistance, OCR reading, real-time object detection, hand gesture recognition, AI scene narration, and GPS-based SOS alerts into a single accessible web platform. The system uses React, Tailwind CSS, Node.js, Express.js, MongoDB, TensorFlow.js, MediaPipe, Tesseract.js, and the Web Speech API to provide inclusive assistance through large controls, keyboard-friendly navigation, dark mode, high contrast mode, and voice feedback.

## Problem Statement

Differently-abled individuals often depend on multiple disconnected tools for reading text, understanding surroundings, communicating gestures, and requesting emergency help. These tools are frequently expensive, unavailable offline, difficult to operate, or not designed with accessible interaction patterns. OnePulse solves this by integrating core assistive and emergency features into a unified, responsive, and affordable platform.

## Objectives

- Build a secure JWT-based authentication system with user profiles.
- Convert speech to text and text to speech with multiple language support.
- Extract image text with OCR and read it aloud.
- Detect common real-world objects using camera input and TensorFlow.js.
- Recognize basic hand gestures with MediaPipe and convert them to text/speech.
- Trigger GPS-based emergency SOS alerts and manage emergency contacts.
- Provide high contrast, dark mode, large controls, keyboard navigation, and voice navigation support.
- Document architecture, APIs, database schema, setup, deployment, viva questions, and future scope.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI Vision | TensorFlow.js, COCO-SSD |
| Gesture Recognition | MediaPipe Hands |
| OCR | Tesseract.js |
| Speech | Web Speech API |
| Deployment | Vercel frontend, Render backend |

## Complete Folder Structure

```text
onepulse/
├── client/
│   ├── src/
│   │   ├── components/        # Navbar, cards, guards, reusable UI
│   │   ├── contexts/          # Auth context
│   │   ├── hooks/             # Camera hook
│   │   ├── pages/             # Auth, dashboard, speech, OCR, vision, gestures, SOS, profile
│   │   ├── services/          # Axios API client
│   │   ├── utils/             # Speech helpers
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/            # Environment and Mongo connection
│   │   ├── controllers/       # REST controller logic
│   │   ├── middleware/        # Auth and error handling
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── services/          # Activity and SOS helpers
│   │   ├── utils/             # JWT and async errors
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── DEPLOYMENT.md
│   └── VIVA.md
├── package.json
├── render.yaml
└── vercel.json
```

## Installation Guide

### Prerequisites

- Node.js 20+
- MongoDB Atlas or local MongoDB
- A browser that supports camera, geolocation, and Web Speech APIs

### Local Setup

```bash
git clone <repository-url>
cd onepulse
npm install
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev
```

Frontend runs at `http://localhost:5173` and backend runs at `http://localhost:5000`.

## API Summary

See [`docs/API.md`](docs/API.md) for request and response details.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/profile` | Get profile |
| PUT | `/api/auth/profile` | Update profile/accessibility preferences |
| GET/POST | `/api/contacts` | List or create emergency contacts |
| PUT/DELETE | `/api/contacts/:id` | Update or delete contact |
| GET/POST | `/api/sos` | List SOS history or trigger SOS |
| GET/POST | `/api/activities` | List or create activity logs |

## Future Scope

- Integrate SMS/WhatsApp providers for automatic emergency delivery.
- Add offline-first caching and Progressive Web App support.
- Improve gesture classification with a trained custom model.
- Add wearable device integration for fall detection.
- Add multilingual OCR and document summarization.
- Add caretaker dashboards and emergency acknowledgement workflow.
- Add privacy-preserving edge AI model execution options.

## License

This project is intended for academic and demonstration use.

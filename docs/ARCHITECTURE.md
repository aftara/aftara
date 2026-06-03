# Project Architecture

```mermaid
flowchart LR
  User[Accessible Web User] --> UI[React + Vite + Tailwind]
  UI --> Speech[Web Speech API]
  UI --> OCR[Tesseract.js]
  UI --> Vision[TensorFlow.js COCO-SSD]
  UI --> Gesture[MediaPipe Hands]
  UI --> API[Express REST API]
  API --> Auth[JWT Auth Middleware]
  API --> Mongo[(MongoDB)]
  Mongo --> Users[Users]
  Mongo --> Contacts[EmergencyContacts]
  Mongo --> Logs[ActivityLogs]
  Mongo --> SOS[SOSHistory]
  UI --> Geo[Browser Geolocation]
  Geo --> API
```

## Design Notes

- AI features run primarily in the browser to reduce server cost and latency.
- The backend persists user data, emergency contacts, activity logs, and SOS history.
- JWT protects all private APIs.
- Accessibility preferences are stored in each user profile and reflected in the UI.

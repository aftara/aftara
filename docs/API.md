# API Documentation

Base URL: `http://localhost:5000/api`

Protected endpoints require `Authorization: Bearer <jwt>`.

## Auth

### Register

`POST /auth/register`

```json
{
  "name": "Asha Kumar",
  "email": "asha@example.com",
  "password": "password123",
  "phone": "+911234567890",
  "disabilityType": "visual"
}
```

### Login

`POST /auth/login`

```json
{
  "email": "asha@example.com",
  "password": "password123"
}
```

### Profile

- `GET /auth/profile`
- `PUT /auth/profile`

```json
{
  "name": "Asha Kumar",
  "phone": "+911234567890",
  "disabilityType": "visual",
  "accessibility": {
    "darkMode": true,
    "highContrast": true,
    "preferredLanguage": "en-US",
    "voiceNavigation": true
  }
}
```

## Emergency Contacts

- `GET /contacts`
- `POST /contacts`
- `PUT /contacts/:id`
- `DELETE /contacts/:id`

```json
{
  "name": "Parent",
  "relationship": "Father",
  "phone": "+911234567890",
  "email": "parent@example.com",
  "isPrimary": true
}
```

## SOS

### Trigger SOS

`POST /sos`

```json
{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "accuracy": 15,
  "message": "I need urgent help."
}
```

### SOS History

`GET /sos`

## Activity Logs

- `GET /activities`
- `POST /activities`

```json
{
  "type": "ocr",
  "message": "OCR text extracted",
  "metadata": { "characters": 420 }
}
```

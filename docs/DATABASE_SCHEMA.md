# Database Schema

## Users

| Field | Type | Notes |
| --- | --- | --- |
| name | String | Required |
| email | String | Required, unique, valid email |
| password | String | Required, bcrypt hashed, hidden from queries |
| phone | String | Optional |
| disabilityType | Enum | visual, speech, mobility, hearing, multiple, other |
| accessibility.darkMode | Boolean | UI preference |
| accessibility.highContrast | Boolean | UI preference |
| accessibility.preferredLanguage | String | Example: en-US |
| accessibility.voiceNavigation | Boolean | Enables voice-first flow |
| createdAt/updatedAt | Date | Automatic timestamps |

## EmergencyContacts

| Field | Type | Notes |
| --- | --- | --- |
| user | ObjectId | References Users |
| name | String | Required |
| relationship | String | Optional |
| phone | String | Required |
| email | String | Optional |
| isPrimary | Boolean | Default false |

## ActivityLogs

| Field | Type | Notes |
| --- | --- | --- |
| user | ObjectId | References Users |
| type | Enum | speech, ocr, object_detection, gesture, scene_description, sos, profile |
| message | String | Required |
| metadata | Mixed | Additional context |

## SOSHistory

| Field | Type | Notes |
| --- | --- | --- |
| user | ObjectId | References Users |
| message | String | Generated emergency message |
| status | Enum | triggered, sent, acknowledged, cancelled |
| location.latitude | Number | Required |
| location.longitude | Number | Required |
| location.accuracy | Number | Optional GPS accuracy |
| location.mapsUrl | String | Google Maps link |
| notifiedContacts | ObjectId[] | References EmergencyContacts |

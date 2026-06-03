import { EmergencyContact } from '../models/EmergencyContact.js';
import { SOSHistory } from '../models/SOSHistory.js';
import { asyncHandler } from '../utils/error.js';
import { buildEmergencyMessage, buildMapsUrl } from '../services/sosService.js';
import { logActivity } from '../services/activityService.js';

export const triggerSos = asyncHandler(async (req, res) => {
  const { latitude, longitude, accuracy, message } = req.body;
  const contacts = await EmergencyContact.find({ user: req.user._id });
  const mapsUrl = buildMapsUrl(latitude, longitude);
  const emergencyMessage = buildEmergencyMessage(req.user.name, mapsUrl, message);

  const sos = await SOSHistory.create({
    user: req.user._id,
    message: emergencyMessage,
    status: contacts.length ? 'sent' : 'triggered',
    location: { latitude, longitude, accuracy, mapsUrl },
    notifiedContacts: contacts.map((contact) => contact._id),
  });
  await logActivity(req.user._id, 'sos', 'SOS alert triggered', { sos: sos._id, contacts: contacts.length });

  res.status(201).json({ success: true, sos, contacts, message: emergencyMessage });
});

export const listSosHistory = asyncHandler(async (req, res) => {
  const history = await SOSHistory.find({ user: req.user._id }).populate('notifiedContacts').sort('-createdAt');
  res.json({ success: true, history });
});

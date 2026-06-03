import { EmergencyContact } from '../models/EmergencyContact.js';
import { AppError, asyncHandler } from '../utils/error.js';

export const listContacts = asyncHandler(async (req, res) => {
  const contacts = await EmergencyContact.find({ user: req.user._id }).sort('-isPrimary name');
  res.json({ success: true, contacts });
});

export const createContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.create({ ...req.body, user: req.user._id });
  res.status(201).json({ success: true, contact });
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!contact) throw new AppError('Emergency contact not found', 404);
  res.json({ success: true, contact });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!contact) throw new AppError('Emergency contact not found', 404);
  res.json({ success: true, message: 'Emergency contact deleted' });
});

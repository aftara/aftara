import express from 'express';
import { createContact, deleteContact, listContacts, updateContact } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

export const contactRouter = express.Router();

contactRouter.use(protect);
contactRouter.route('/').get(listContacts).post(createContact);
contactRouter.route('/:id').put(updateContact).delete(deleteContact);

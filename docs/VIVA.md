# Viva Questions and Answers

1. **What is OnePulse?**
   OnePulse is an AI-powered accessibility and emergency assistance platform for differently-abled users.

2. **Why did you choose React and Vite?**
   React supports reusable components and Vite provides fast development and optimized production builds.

3. **How is authentication implemented?**
   The backend hashes passwords with bcrypt and issues JWTs after successful registration or login.

4. **Why do AI features run in the browser?**
   Browser-side AI reduces server load, latency, and deployment cost while keeping camera data local.

5. **How does OCR work?**
   Tesseract.js processes uploaded images and returns extracted text that can be read aloud or downloaded.

6. **How does object detection work?**
   TensorFlow.js loads COCO-SSD and predicts objects from live video frames.

7. **How does gesture recognition work?**
   MediaPipe Hands identifies hand landmarks; the app maps landmark patterns to predefined gestures.

8. **How does SOS work?**
   The browser obtains GPS coordinates, the backend creates a Google Maps link, stores SOS history, and returns an emergency message.

9. **Which MongoDB collections are used?**
   Users, EmergencyContacts, ActivityLogs, and SOSHistory.

10. **What accessibility features are included?**
    Large buttons, keyboard focus rings, dark mode, high contrast mode, voice feedback, and voice command support.

11. **How can the project be improved?**
    It can add SMS/WhatsApp gateways, PWA offline mode, trained gesture models, caretaker dashboards, and wearable integration.

12. **What are the main limitations?**
    Browser API availability, camera lighting conditions, model accuracy, and the current absence of a third-party SMS provider.

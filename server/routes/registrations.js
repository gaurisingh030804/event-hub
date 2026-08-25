const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');
const { sendRegistrationEmail } = require('../config/email');

router.post('/test-email', async (req, res) => {
  try {
    await sendRegistrationEmail('student@example.com', 'Test Student', 'Test Event', '2026-06-15');
    res.json({ message: 'Test email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/register', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.registeredUsers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    event.registeredUsers.push(req.user._id);
    await event.save();

    await sendRegistrationEmail(
      req.user.email,
      req.user.name,
      event.title,
      event.date.toDateString()
    );

    res.json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my-events', protect, async (req, res) => {
  const events = await Event.find({ registeredUsers: req.user._id }).populate('society', 'name societyName');
  res.json(events);
});

module.exports = router;

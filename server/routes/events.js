const express = require('express');
const { protect } = require('../middleware/auth');
const Event = require('../models/Event');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await Event.find().populate('society', 'name societyName'));
});

router.get('/:id', async (req, res) => {
  res.json(await Event.findById(req.params.id).populate('society', 'name societyName'));
});

router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'society') {
    return res.status(403).json({ message: 'Only societies can create events' });
  }
  const event = await Event.create({ ...req.body, society: req.user._id });
  res.status(201).json(event);
});

router.delete('/:id', protect, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  if (req.user.role !== 'admin' && event.society.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to delete this event' });
  }
  await event.deleteOne();
  res.json({ message: 'Event removed' });
});

module.exports = router;

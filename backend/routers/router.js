const { Router } = require('express');
const userController = require('../controllers/user.controller')
const eventController = require('../controllers/event.controller')

const router = Router();

router.post("/create/user", userController.createUser)
router.post("/create/event", eventController.createEvent)
router.post("/bookings/reserve", eventController.bookingEvent)

module.exports = router;
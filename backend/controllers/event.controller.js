const eventService = require("../services/event.service")

class EventController{
    async createEvent(req, res){
        try{
            const {name, total_seats} = req.body;
             if (!name || !total_seats) {
                return res.status(400).json({ 
                    error: "Name and total_seats are required" 
                });
            }
            const event = await eventService.createEvent(name, total_seats);
            return res.status(201).json({
            message: "Event created successfully",
            event: event
        });
        } catch(e){
            console.error("Error in createEvent:", e);
            return res.status(500).json({ 
                error: "Internal server error" 
            });
        }
    }

    async bookingEvent(req, res) {
    try {
        const { event_id, user_id } = req.body;
        
        if (!event_id || !user_id) {
            return res.status(400).json({ 
                error: "event_id and user_id are required" 
            });
        }
        
        const booking = await eventService.bookingEvent(event_id, user_id);
        
        return res.status(201).json({
            message: "Booking created successfully",
            booking: booking
        });
        
    } catch (e) {
        console.error("Error in bookingEvent:", e);
        if (e.message === "USER_ALREADY_REGISTERED") {
            return res.status(400).json({
                error: "Пользователь зарегистрирован"
            });
        }
        if (e.message === "EVENT_NOT_FOUND") {
            return res.status(404).json({
                error: "События не существует"
            });
        }
        if (e.message === "NO_SEAT") {
            return res.status(404).json({
                error: "Нет Мест"
            });
        }

        return res.status(500).json({
            error: "Internal server error",
            message: e.message
        });
    }
}
}

module.exports = new EventController();
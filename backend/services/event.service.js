const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class EventService{
    async createEvent(name, total_seats){
        try{
            const event = await prisma.events.create({
                data: {
                    name,
                    total_seats
                }})
        return event;
    } catch(e){
        console.log(e);
    }
    }

    async bookingEvent(event_id, user_id){
        try{
            const existingBooking = await prisma.bookings.findUnique({
            where: {
                event_id_user_id: {
                    event_id: event_id,
                    user_id: user_id
                }
            }
        })
         if(existingBooking){
            throw new Error("USER_ALREADY_REGISTERED")
        }
        
        const totalSeat = await prisma.events.findUnique({where:{
            id: event_id
        }})

        if(totalSeat.total_seats <= 0){
            throw new Error("NO_SEATS")
        }

        const newBooking = await prisma.bookings.create({
            data: {
                event_id: event_id,
                user_id: user_id,
            }
        })
        const decrementSeats = await prisma.events.update({where:{id: event_id},
             data: {
                total_seats: {
                decrement: 1 }}
        })

        return newBooking
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error("USER_ALREADY_REGISTERED")
            }
        throw error
    }
    }
}

module.exports = new EventService();
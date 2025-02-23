const EventModel = require("../model/events");
const {createToken} = require('../tokens');
const UserModel = require("../model/user");

const book  = (req,res) => {
    const { name, id, time,date, adr} = req.body;
    const event = new EventModel(id,name,time,date, adr);
    if (event.find()) {
        return res.json({ message: 'Already booked', success: false});
    }
    event.token = createToken(event.payload, process.env.BOOKJWT_SECRET)
    var user = new UserModel(id)
    user.updateBooking(event.token,event.payload)
    event.book()
        res.status(201)
            .json({
                message: "Booking successfull",
                success: true,
                token: event.token
    })
}
const isBooked = (req,res)=>{
    const {name,id} = req.query;
    const event = new EventModel(id,name);
    if (event.find()) {
        return res.json({ message: 'View booking', success: true});
    }
    return res.json({message: "Book now", success:false})
}
const getBookings = (id)=> new UserModel(id).find()['bookings']

module.exports  = {
    book,
    isBooked,
    getBookings
}
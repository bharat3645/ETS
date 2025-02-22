const EventModel = require("../model/events");
const {createToken} = require('../tokens');

const book  = (req,res) => {
    const { name, id, time,date, adr} = req.body;
    const event = new EventModel(id,name,time,date, adr);
    if (event.find()) {
        return res.status(409)
            .json({ message: 'Already booked', success: false});
    }
    event.book()
        res.status(201)
            .json({
                message: "Booking successfull",
                success: true,
                token: createToken(event.payload,process.env.BOOKJWT_SECRET)
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

module.exports  = {
    book,
    isBooked
}
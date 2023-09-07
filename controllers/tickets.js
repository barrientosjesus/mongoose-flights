const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    create
};

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);

    try {
        await Ticket.create(Object.assign(req.body, { flight: flight._id }));
    } catch (err) {
        console.log(err) 
    }

    res.redirect(`/flights/${flight._id}`)
}
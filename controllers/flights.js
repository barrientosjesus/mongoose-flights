const Flight = require('../models/flight');
const Ticket = require('../models/ticket')

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

async function index(req, res) {
    res.render('flights/index', {
        title: 'All Flights',
        flights: await Flight.find({})
    });
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const newDeparture = newFlight.departs;

    res.render('flights/new', {
        title: 'New Flight',
        errorMsg: '',
        datePlaceholder: createInputDatePlaceholder(newDeparture)
    });
}

async function create(req, res) {
    req.body.airline = req.body.airline.trim();

    try {
        await Flight.create(req.body);

        res.redirect('/flights');
    } catch (err) {
        console.log(err);
        res.render('flights/new', {
            title: 'New Flight',
            errorMsg: err.message
        });
    }
}

async function show(req, res) {
    const flight = await Flight.findById(req.params.id);
    const tickets = await Ticket.find({flight: flight._id})

    res.render('flights/show', {
        title: "Flight Details",
        flight,
        tickets
    });
}

function createInputDatePlaceholder(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const departsDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    return departsDate;
}
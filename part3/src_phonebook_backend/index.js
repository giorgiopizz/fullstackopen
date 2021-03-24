require('dotenv').config()

const express = require('express')

const morgan = require('morgan')

const Person = require('./models/person')

const app = express()
app.use(express.static('build'))

app.use(express.json())

// app.use(morgan('tiny'))


morgan.token('body', function (req, res) {
    if (req.method == 'POST' || req.method == 'PUT') {
        return JSON.stringify(req.body);
    }
    else {
        return "";
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(result => {
            response.json(result);
        })
        .catch(error => next(error));
})

app.get('/info', (request, response, next) => {
    Person.find({})
        .then(results => {
            response.send(`Phonebook has info for ${results.length} people<br/><br/>${String(new Date())}`);
        })
        .catch(error => next(error));
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(foundPerson => {
            if (foundPerson) {
                response.json(foundPerson);
            }
            else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
})


//const generateId = () => Math.floor(Math.random()*1000);

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'no name or number provided'
        })
    }

    Person.find({ name: body.name })
        .then(result => {
            if (result.length > 0) {
                return response.status(400).json({
                    error: `name ${body.name} already exists`
                })
            }
            else {
                console.log('this name is not present');

                const person = new Person({
                    name: body.name,
                    number: body.number
                })

                person.save()
                    .then(savedPerson => {
                        console.log(`added ${savedPerson.name} with number: ${savedPerson.number} to phonebook`);
                        response.json(savedPerson)
                    })
            }
        })
        .catch(error => console.log(error, 'error in POST'))
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            }
            else {
                response.status(404).end();
            }
        })
        .catch(error => {
            console.log(error);
        });
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
};
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name == "CastError") {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name) {
        return response.status(400).end();
    }
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('must specify password');
    process.exit(1);
}

const password = process.argv[2];

const url =
    `mongodb+srv://fullstackopen:${password}@cluster0.cqjoy.mongodb.net/phonebook?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

// let oldPersons = [
//     {
//         'name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//     },
//     {
//         "name": "Ada Lovelace",
//         'number': '39-44-5323523',
//         'id': 2
//     },
//     {
//         'name': 'Dan Abramov',
//         'number': '12-43-234345',
//         'id': 3
//     },
//     {
//         'name': 'Mary Poppendieck',
//         'number': '39-23-6423122',
//         'id': 4
//     }
// ]
// oldPersons.forEach(oldPerson => {
//     // console.log('entrato nel loop')
//     const person = new Person({
//         name: oldPerson.name,
//         number: oldPerson.number,
//     })

//     person.save().then(result => {
//         console.log(`person ${person.name} saved!`)
//     })
//     // if (oldPerson.id === 4){
//     //     mongoose.connection.close();
//     // }
// })


if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });
    person.save().then(result => {
        console.log(`added ${person.name} with number: ${person.number} to phonebook`);
        mongoose.connection.close();
    });
}


else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(element => {
            console.log(`${element.name} ${element.number}`);
        });
        mongoose.connection.close();
    });
}
else {
    console.log('you should either add a person or display phonebook');
    mongoose.connection.close();
    process.exit(1);
}
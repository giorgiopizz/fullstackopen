import React, { useState, useEffect } from "react";
import personService from "./services/person";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';




const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notificationMessage, setNotification] = useState(null);


  useEffect(() => {
    personService.getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      }
      );
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    // this changes shownPersons
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((element) => element.name === newName) === undefined) {
      const personObject = {
        name: newName,
        number: newNumber
      };
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setNotification({
            message: `Added ${returnedPerson.name}`,
            description: 'good'
          });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch(error => {
          setNotification({
            message: error.response.data,
            description: 'error'
          });
          setTimeout(() => setNotification(null), 5000);
        })

    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find((element) => element.name === newName);
        const personObject = {
          ...oldPerson,
          number: newNumber
        };
        personService
          .update(oldPerson.id, personObject)
          .then(returnedPerson => {
            const newPersons = persons.map(person => (person.id !== oldPerson.id) ? person : returnedPerson)
            setPersons(newPersons);
          })
          .catch(reason => {
            console.log(reason);
            setNotification({
              message: `Information of ${oldPerson.name} has already been removed from server`,
              description: 'error'
            });
            setTimeout(() => setNotification(null), 5000);
            setPersons(persons.filter(person => person.id !== oldPerson.id))
          })

      }
    }
  };

  const shownPersons =
    newSearch.length === 0
      ? persons
      : persons.filter((person) =>
        person.name.toUpperCase().includes(newSearch.toUpperCase())
      );




  const handleDeleteOf = (id) => {
    if (window.confirm(`Are you sure to delete ${persons.find(el => el.id === id).name}?`)) {
      console.log("delete element: " + id)
      personService.del(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }

  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} />
      <Filter value={newSearch} handler={handleSearchChange} />

      <h2>Add a new</h2>

      <PersonForm
        handSumbit={handleSubmit}
        valName={newName}
        handName={handleNameChange}
        valNum={newNumber}
        handNumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      {shownPersons.map((person) => <Person person={person} handleDelete={() => handleDeleteOf(person.id)} key={person.id} />)}
    </div>
  );
};

export default App;

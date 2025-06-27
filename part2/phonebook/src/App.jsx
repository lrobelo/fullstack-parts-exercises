import { useEffect, useState } from 'react';
import Filter from './components/Filter.jsx';
import Persons from './components/Persons.jsx';
import PersonForm from './components/PersonForm.jsx';
import personService from './services/persons';
import Notification from './components/Notification.jsx';


function App() {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState('success')

    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const personToUpdate = persons.find(person => person.name === newName)
                const updatedPerson = { ...personToUpdate, number: newNumber }
                personService.update(personToUpdate.id, updatedPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response.data))
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        setNotification(`Information of ${newName} has already been removed from server`)
                        setNotificationType('error')
                        setPersons(persons.filter(person => person.id !== personToUpdate.id))
                    })
            }
        } else {
            const newPerson = { name: newName, number: newNumber }
            personService.create( newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setNotification(`Added ${newName}`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    console.error('Error adding person:', error)
                })
        }
    }

    const handleDelete = (id) => {
        if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
            personService.remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    console.error('Error deleting person:', error)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} type={notificationType} />
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <h3>Add a new </h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleNameChange={(event) => setNewName(event.target.value)}
                handleNumberChange={(event) => setNewNumber(event.target.value)}
                handleSubmit= {handleSubmit}
            />
            <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
        </div>
    )
}

export default App

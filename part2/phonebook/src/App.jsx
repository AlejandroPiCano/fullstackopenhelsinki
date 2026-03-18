import { useState } from 'react'
import { Filter } from './components/filter'
import { PersonForm } from './components/personForm'
import { PersonList } from './components/personList'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [newFilter, setNewFilter] = useState('')

  function handleOnSubmit(event) {
    event.preventDefault()

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
       <h2>Add a new</h2>

       <PersonForm newName={newName} newNumber={newNumber} handleOnSubmit={handleOnSubmit} setNewName={setNewName} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
     
      <PersonList personsToShow={personsToShow} />
      
    </div>
  )
}

export default App
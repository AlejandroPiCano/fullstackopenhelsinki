import { useEffect, useState } from 'react'
import axios from 'axios'
import { Filter } from './components/filter'
import { PersonForm } from './components/personForm'
import { PersonList } from './components/personList'
import phoneBookService from './services/phoneBookService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    phoneBookService.getAll().then(data => {
      setPersons(data)
    }).catch(error => { 
      console.log(error)
    })
  }, [])

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

    phoneBookService.create(personObject).then(data => {
      setPersons(persons.concat(data))
    }).catch(error => {
      alert(error.response.data.error)
    })
        
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
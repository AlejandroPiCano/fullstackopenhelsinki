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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }

        phoneBookService.update(personToUpdate.id, updatedPerson).then(data => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : data))
        }).catch(error => {
          alert(error.response.data.error)
        })
      }      
    }
    else {
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
    }
        
    setNewName('')
    setNewNumber('')
  }


  function deletePerson(id, name) {
        if(window.confirm(`Delete ${name}?`)) {
            phoneBookService.deletePerson(id).then(data => {    
                console.log(data);
                setPersons(persons.filter(person => person.id !== id))
            }).catch(error => {
                alert(error.response.data.error)
            })
        }
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
     
      <PersonList personsToShow={personsToShow} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App
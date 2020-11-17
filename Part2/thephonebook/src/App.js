import React, { useEffect, useState } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({
    name: '', number: ''
  })
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState({
    success: '', error: ''
  })

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let dupId = -1
    for( let i = 0; i < persons.length; i++){
      if(persons[i].name === newPerson.name){
        dupId = persons[i].id
      }
    }
    if(dupId !== -1){
      let replace = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if(replace){
        let personUpd = persons.find(person => person.id === dupId)
        personService
          .update(dupId, {...personUpd, number: newPerson.number})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== dupId ?
              person : returnedPerson))
          })
          .catch(error => {
            setMessage({success: '', error: 
              `Information of ${newPerson.name} has already been removed from server`})
            setTimeout(() => {
              setMessage({success: '', error: ''})
            }, 3000)
          })
      } 
    } else{
      const personObj = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons[persons.length-1].id + 1
      }
      personService.create(personObj)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
    }
    setMessage({success: `Added ${newPerson.name}`, error: ''})
    setTimeout(() => {
      setMessage({success: '', error: ''})
    }, 3000)
    setNewPerson({name: '', number: ''})
    setNewFilter('') 
  }

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = (newFilter === '') ?
    persons : 
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
 
  const confirmDelete = (person) => {
    const deletedName = person.name
    const confirm = window.confirm(`Delete ${person.name}?`)
    if(confirm){
      personService.remove(person.id)
        .then(response => {
          setPersons(persons.filter(person => person.name !== deletedName))
        })
        .catch(error => {
          setMessage({success: '', error: 
            `Information of ${person.name} has already been removed from server`})
          setTimeout(() => {
            setMessage({success: '', error: ''})
          }, 3000)
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>
        Add new person
      </h3>
      <PersonForm addPerson={addPerson}
        newName={newPerson.name}
        handleNameChange={handleNameChange}
        newNumber={newPerson.number}
        handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      {personsToShow.map(person => 
      <Person key={person.id} person={person} confirmDelete={() => 
        confirmDelete(person)}/>
      )}
    </div>
  )
}
const Filter = (props) => {
  return (
    <form>
      <div>
        Filter by name <input
          value={props.newFilter}
          onChange={props.handleFilterChange}
        />
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
      </form>
  )
}

const Person = ({person, confirmDelete}) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={confirmDelete}>delete</button>
    </div>
  )
}

const Notification = ({message}) => {
  if(message.success === ''){
    if(message.error === ''){
      return null
    }
    return (
      <div className="error">
        {message.error}
      </div>
    )
  }
  return (
    <div className="success">
      {message.success}
    </div>
  )
}
export default App


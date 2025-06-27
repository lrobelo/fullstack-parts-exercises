import React from 'react'

const Persons = ({ persons, filter, handleDelete }) => {
  const filteredPersons = persons.filter(person =>
	person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
	<div>
	  <h3>Numbers</h3>
	  <ul>
		{filteredPersons.map(person => (
		  <li key={person.id}>
			{person.name} {person.number}
			<button onClick={() => handleDelete(person.id)}>Delete</button>
		  </li>
		))}
	  </ul>
	</div>
  )
}

export default Persons
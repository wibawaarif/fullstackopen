import { useState, useEffect } from "react";
import axios from 'axios'

const Filter = ({ search }) => (
  <div>
    filter shown with <input onChange={search} />
  </div>
);

const Persons = ({ persons }) =>
  persons.map((x) => (
    <p key={x.name}>
      {x.name} {x.number}
    </p>
  ));

const PersonForm = (props) => {
  const { formHandler, newName, nameController, newNumber, numberController } =
    props.event;
  return (
    <>
      <form onSubmit={formHandler}>
        <div>
          name: <input value={newName} onChange={nameController} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberController} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredList, setFilteredList] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
        setFilteredList(res.data)
      })
  }, [])


  const formHandler = (event) => {
    event.preventDefault();
    for (let i of persons) {
      if (i.name === newName) {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNewNumber("");
        return;
      }
    }

    const newInput = [
      ...persons,
      {
        name: newName,
        number: newNumber,
      },
    ];

    setPersons(newInput);
    setFilteredList(newInput);

    setNewName("");
    setNewNumber("");
  };

  const nameController = (event) => {
    setNewName(event.target.value);
  };

  const numberController = (event) => {
    setNewNumber(event.target.value);
  };

  const searchController = (event) => {
    const query = event.target.value;

    if (query === "") {
      return setFilteredList(persons);
    }

    let updatedList = [...persons];

    updatedList = updatedList.filter((x) => {
      return x.name.indexOf(query) !== -1;
    });

    setFilteredList(updatedList);
  };

  const eventHandler = {
    formHandler,
    newName,
    nameController,
    newNumber,
    numberController,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={searchController} />
      <h3>add a new</h3>
      <PersonForm event={eventHandler} />
      <h3>Numbers</h3>
      <Persons persons={filteredList} />
    </div>
  );
};

export default App;

import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import personServices from "./services/persons";
import './index.css'

const Filter = ({ search }) => (
  <div>
    filter shown with <input onChange={search} />
  </div>
);

const Persons = ({ persons, deleteButton }) =>
  persons.map((x) => {
    return (
      <Fragment key={x.name}>
        <p>
          {x.name} {x.number}{" "}
          <button onClick={() => deleteButton(x.name, x.id)}>delete</button>
        </p>
      </Fragment>
    );
  });

const Notification = ({ messages, showElement, category }) => showElement ? <p className={category}>{messages}</p> : <></> 

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
  const [errorMessage, setErrorMessage] = useState('')
  const [showElement,setShowElement] = useState(false)
  const [notifColor, setNotifColor] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data)
      setFilteredList(res.data);
    });
  }, []);

  const formHandler = (event) => {
    event.preventDefault();
    for (let i of filteredList) {
      if (i.name === newName) {
        if (
          window.confirm(
            `${newName} is already added to phone book, replace the old number with a new one ?`
          )
        ) {
          const sendUpdatednumber = {
            name: i.name,
            number: newNumber,
            id: i.id,
          };
          personServices.updatePerson(i.id, sendUpdatednumber).then((res) => {
            personServices.getAll().then((x) => {
              setFilteredList([...x]);
              setErrorMessage(`Updated ${newName} numbers`)
              setNotifColor('success')
              setShowElement(true)
              setTimeout(() => {
                setShowElement(false)
              }, 3000)
            });
          });
        }
        setNewName("");
        setNewNumber("");
        return;
      }
    }

    const newInput = {
      name: newName,
      number: newNumber,
    };

    personServices.create(newInput).then((returnedData) => {
      setPersons([...persons, returnedData]);
      setFilteredList([...filteredList, returnedData]);
    });

    setErrorMessage(`Added ${newName}`)
    setNotifColor('success')
    setShowElement(true)
    setTimeout(() => {
      setShowElement(false)
    }, 3000)
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

  const deletebutton = (person, id) => {
    if (window.confirm(`Delete ${person} ?`)) {
      
      personServices.deletePerson(id).then((res) => {
        personServices.getAll().then((res) => {
          setFilteredList(res);
          setPersons(res);
        });
      }).catch(err => {
        setErrorMessage(`Information of ${person} has already been removed from server`)
        setNotifColor('failed')
        setShowElement(true)
        setTimeout(() => {
          setShowElement(false)
        }, 3000)
      })
    }
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
      <Notification messages={errorMessage} showElement={showElement} category={notifColor}/>
      <Filter search={searchController} />
      <h3>add a new</h3>
      <PersonForm event={eventHandler} />
      <h3>Numbers</h3>
      <Persons persons={filteredList} deleteButton={deletebutton} />
    </div>
  );
};

export default App;

import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notify, setNotify] = useState('');
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filterText, setFilterText] = useState('');

  const showPersons = async () => {
    const response = await axios.get('/api/persons');
    const data = response.data;
    setPersons(data);
  };

  useEffect(() => showPersons(), []);

  const handleSetPersons = async (event) => {
    event.preventDefault();
    const check = persons.find((person) => person.name === newName);
    if (check) {
      const id = persons.filter((person) => person.name === newName)[0].id;
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        await axios.put(`/api/persons/${id}`, {
          name: newName,
          number: number,
        });
        setPersons([...persons]);
      }
      return;
    }
    try {
      const request = await axios.post('/api/persons', {
        name: newName,
        number: number,
      });
      setPersons([...persons, { name: newName, number: number }]);
      setNotify(`added ${newName}`);
      setTimeout(() => {
        setNotify(null);
      }, 3000);
      return request.data;
    } catch (err) {
      console.log(`error ${err}`);
    }
  };

  const handleDeletePerson = async (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}`
      )
    ) {
      try {
        await axios.delete(`/api/persons/${id}`);
        setPersons((prevPerson) =>
          prevPerson.filter((person) => person.id !== id)
        );
      } catch (err) {
        setNotify(
          `information of ${newName} has already been removed from the server`
        );
        setTimeout(() => {
          setNotify(null);
        }, 2000);
      }
    }
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().match(filterText.toLowerCase())
  );

  return (
    <div>
      <h2>
        <b>Phonebook</b>
      </h2>
      <form className="flex flex-col gap-2 p-2 items-center justify-center">
        <div className="flex flex-col gap-3 w-full items-center justify-center">
          {notify && (
            <h1 className="h-10 w-full my-2 p-2 border rounded-md bg-green-500">
              {notify}
            </h1>
          )}

          <input
            placeholder="filter show with"
            className="border-2 rounded-md outline-none px-2"
            onChange={(event) => setFilterText(event.target.value)}
            value={filterText}
          />
          <h1>
            <b> add a new </b>
          </h1>
          <input
            placeholder="name"
            className="border-2 rounded-md outline-none px-2"
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
          />

          <input
            placeholder="phonenumber"
            className="border-2 rounded-md outline-none px-2"
            onChange={(event) => setNumber(event.target.value)}
            value={number}
          />
          <button
            // onClick={handleSetPersons}
            onClick={handleSetPersons}
            type="submit"
            className="border-2 rounded-md p-2 w-20"
          >
            add
          </button>
          <p className="font-bold">Numbers</p>
          <table className="table-auto border-spacing-y-2 border-spacing-x-4 w-full border-separate flex justify-center text-left">
            <tbody>
              {filteredPerson.map((person) => (
                <tr key={person.id}>
                  <td>{person.name}</td>
                  <td className="w-12"> {person.number}</td>
                  <td>
                    <button
                      onClick={() => handleDeletePerson(person.id)}
                      id={person.id}
                      className="border hover:bg-red-300 outline-none border-red-500 rounded-md p-2"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default App;

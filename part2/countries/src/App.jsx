import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [country, setCountry] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState(null);
  const fetchCountry = async () => {
    try {
      const request = await axios.get(
        `https://restcountries.com/v3.1/all?fields=name`
      );
      const data = await request.data;
      setCountry(data);
    } catch (err) {
      console.log('cannot fetch, timeout');
    }
  };
  useEffect(() => async () => fetchCountry(), []);
  const handleFilter = (event) => {
    event.preventDefault();
    const temp = country?.slice();
    const filtered = temp.filter((name) =>
      name.name.common.toLowerCase().match(query.toLowerCase())
    );
    if (filtered.length > 10) {
      setMessage('too many matches, specify another filter');
    } else {
      setFiltered(filtered);
      setMessage(null);
    }
  };
  return (
    <div className="mt-4 mx-4">
      <form onSubmit={handleFilter}>
        find countries{' '}
        <input
          className="outline-none rounded-md border p-2"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </form>
      {!message ? (
        filtered.map((name) => {
          return <p key={name.name.common}>{name.name.common}</p>;
        })
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default App;

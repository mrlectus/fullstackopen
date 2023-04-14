import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [country, setCountry] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const fetchCountry = async () => {
    try {
      const request = await axios.get(`https://restcountries.com/v3.1/all?fields=name`);
      const data = await request.data;
      setCountry(data);
    } catch (err) {
      console.log('cannot fetch, timeout');
    }
  };
  useEffect(() => async () => fetchCountry(), []);
  const handleFilter = (event) => {
    event.preventDefaults();
    alert(query);
    const temp = country?.slice();
    const filtered = temp.filter((name) => name.name.common.toLowerCase().match(query.toLowerCase()));
    if (filtered.length > 10) {
      setMessage("too many matches, specify another filter");
    } else {
      setCountry(filtered);
    }
  }
  return (
    <div className="mt-4 mx-4">
      <form onSubmit={(event) => handleFilter(event)}>
        find countries <input className="outline-none rounded-md border p-2" onChange={() => setQuery(event.target.value)} value={query} />
      </form>
      {message? country.map((name) => {
        return <p>{name.name.common}</p>
      }) : <p>{message}</p>}
    </div>
  );
};

export default App;

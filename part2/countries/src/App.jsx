import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [country, setCountry] = useState(null);
  const fetchCountry = async () => {
    try {
      const request = await axios.get('https://restcountries.com/all');
      const data = await request.data;
      console.log('render..');
      setCountry(data);
    } catch (err) {
      console.log('cannot fetch, timeout');
    }
  };
  useEffect(() => async () => fetchCountry());

  return (
    <div className="mt-4 mx-4">
      <form>
        find countries <input className="outline-none rounded-md border p-2" />
      </form>
    </div>
  );
};

export default App;

import './App.css'
import Dropdown from './components/Dropdown';
import FetchService from './components/FetchService';
import { useState } from 'react';

const App = () => {

  const [list, setList] = useState([]);

  // Careful while changing the API since we need a list of name for our component
  const url = 'https://jsonplaceholder.typicode.com/users';

  // Map fetched data to list of names
  const onFetch = (data: any) => {
    setList(data.map((user: any) => user.name));
  }

  return (
    <>
      <h2>Custom Dropdown</h2>
      <Dropdown list={list} />
      <FetchService url={url} onFetch={onFetch}/>
    </>
  );
};

export default App;

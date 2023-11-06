import './App.css'
import Dropdown from './components/dropdown';

const App = () => {
  const list = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div>
      <h2>Custom Dropdown</h2>
      <Dropdown list={list} />
    </div>
  );
};

export default App;

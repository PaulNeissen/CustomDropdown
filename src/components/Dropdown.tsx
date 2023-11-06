import { useState } from 'react';
import "./Dropdown.css"
import 'font-awesome/css/font-awesome.min.css';


interface Props {
  list: string[];
}

const Dropdown = ({ list }: Props) => {

  // Manage options list
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Get the dropdown component selection
  const [selectedOption, setSelectedOption] = useState("");
  
  return (
    <div className="container">
      <div className="selection" onClick={toggleDropdown}>
        {selectedOption}
        <i className="fa fa-caret-down icon"></i>
      </div>
      {isOpen && (
        <ul className="list container">
          {list.map((option, index) => (
            <li key={option + index} onClick={() => setSelectedOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

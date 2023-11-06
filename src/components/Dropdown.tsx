import { MouseEvent, useState } from 'react';
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
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const onSelectOption = (option: string, event: MouseEvent) => {
    if (selectedOption.includes(option)) { // Remove element if it is in array
      setSelectedOption(selectedOption.filter(name => name != option));
    } else { // Else add element to array
      setSelectedOption([
        ...selectedOption,
        option
      ]);
    }

    // Prevent the click on the close icon to toggle the dropdown
    event.stopPropagation();
  }

  return (
    <div className="container">

      {/* SELECTED VALUES */}
      <div className="selection border" onClick={toggleDropdown}>
        {selectedOption.map((option, index) => (
            <div key={option + index} className="tag">
              {option}
              <i className="fa fa-close close icon" onClick={(event) => {onSelectOption(option, event)}}></i>
            </div>
        ))}
        <i className="fa fa-caret-down arrow icon"></i>
      </div>

      {/* DROPDOWN */}
      {/* ternary condition in JSX */}
      {isOpen && (
        <ul className="list container">
          {list.map((option, index) => (
            <li className="border" key={option + index} onClick={(event) => {onSelectOption(option, event)}}>
              <input className="check" type="checkbox" checked={selectedOption.includes(option)} onChange={() => false}/> {/* onChange is empty because I want a readonly checkbox*/}
              {option}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default Dropdown;

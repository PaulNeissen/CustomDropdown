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
  };

  // Pagination
  const [pageSize, setPageSize] = useState(5); // Number of element displayed in one page
  const pageSizeOptions = [5, 10, 20]; // Possible page size
  const [startIndex, setStartIndex] = useState(0); // Index of the first element displayed in current page

  // Display the next or previous elements
  const changePage = (next: boolean) => {
    if (next && startIndex < list.length - pageSize) {
      setStartIndex(startIndex + pageSize);
    } else if (!next) { // Don't change page if it's already the end of the array
      setStartIndex(Math.max(0, startIndex - pageSize));
    }
    console.log(startIndex);
  };

  return (
    <div className="container">

      {/* SELECTED VALUES */}
      <div className="selection border" onClick={toggleDropdown}>
        {selectedOption.map((option, index) => (
            <div key={option + index} className="tag">
              {option}
              <i className="fa fa-close close icon" onClick={(event) => onSelectOption(option, event)}></i>
            </div>
        ))}
        <i className={isOpen ? "fa fa-caret-up arrow icon" : "fa fa-caret-down arrow icon"}></i>
      </div>

      {/* DROPDOWN */}
      {/* Ternary condition trick in JSX */}
      {isOpen && (
        <ul className="list container">

          {/* Iterate over the dropdown options */}
          {/* Select options to display depending on pageSize and current page*/}
          {list.slice(startIndex, startIndex + pageSize) 
            .map((option, index) => (
              <li className="border selectable-option" key={option + index} onClick={(event) => onSelectOption(option, event)}>
                <input className="check" type="checkbox" checked={selectedOption.includes(option)} onChange={() => false}/> {/* onChange is empty because I want a readonly checkbox*/}
                {option}
              </li>
          ))}

          {/* Pagniation options */}
          <li className="pagination">
            Items per page : 
            {pageSizeOptions.map(size => (
              <div key={size} className="page-size" onClick={() => {
                  setPageSize(size);
                  setStartIndex(0); {/* Reset to first page */}
                }}
              >{size}</div>
            ))}
            <i className="fa fa-arrow-right arrow icon" onClick={() => changePage(true)}/>
            <i className="fa fa-arrow-left arrow icon" onClick={() => changePage(false)}/>
            <div className="page-indicator">
              {startIndex + 1} - {Math.min(startIndex + pageSize, list.length)} of {list.length} {/* Display current pagination */}
            </div> 
          </li>

        </ul>
      )}
    </div>
  );
};

export default Dropdown;

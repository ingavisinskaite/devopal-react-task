import React from 'react';
import './style.scss';


const Select = () => {
    const base = ["Vanilla", "Van", "Dark chocolate", "White chocolate"];
    const [options, setOptions] = React.useState([]);
    const [dropdownState, setDropdownState] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState("");

    const showAllOptions = () => {
        const dropdownBtn = document.getElementsByClassName("dropdownBtn")[0];
        if(dropdownState === false) {
            const allOptions = base.map(option => <li className="option" onClick={e => selectOption(option)}>{option}</li>);
            setOptions(allOptions);
            dropdownBtn.innerHTML = "/\\";
            setDropdownState(true);
        } else {
            dropdownBtn.innerHTML = "V";
            setOptions([]);
            setDropdownState(false);
        }

    }


    const showFilteredOptions = (filter) => {
        if(filter !== '') {
            const filterBy = filter[0].toUpperCase() + filter.slice(1);
            const filteredOptions = base.filter(option => option.startsWith(filterBy));
            const allOptions = filteredOptions.map(option => <li className="option" onClick={e => selectOption(option)}>{option}</li>);
            setOptions(allOptions);
        } else {
            const allOptions = base.map(option => <li className="option" onClick={e => selectOption(option)}>{option}</li>);
            setOptions(allOptions);
        }
    }

    const selectOption = (option) => {
        setSelectedOption(option)
    }

    return (
        <section>
            <div>
                <input className="selectInput" type="text" placeholder="Select" onClick={e => showAllOptions()} onChange={e => showFilteredOptions(e.target.value)}></input>
                <button className="dropdownBtn" onClick={e => showAllOptions()}>V</button>
                <ul className="optionList">
                    {options}
                </ul>
                <p>{selectedOption}</p>
            </div>
        </section>
    )  
}

export default Select;
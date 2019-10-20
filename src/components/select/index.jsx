import React from "react";
import "./style.scss";

const Select = () => {
  const base = ["Vanilla", "Van", "Dark chocolate", "White chocolate"];
  const [options, setOptions] = React.useState([]);
  const [dropdownState, setDropdownState] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");

  React.useEffect(() => {
    attachCloseClickHandler();
  });

  const toggleOptions = e => {
    const dropdownBtn = document.getElementsByClassName("dropdownBtn")[0];
    const dropdownInput = document.getElementById("select-input");
    if (dropdownState === false) {
      dropdownInput.focus();
      const allOptions = getLiElementsFromOptions(base);
      setOptions(allOptions);
      dropdownBtn.innerHTML = "/\\";
      setDropdownState(true);
    } else {
      dropdownBtn.innerHTML = "V";
      setOptions([]);
      setDropdownState(false);
    }
  };

  const showFilteredOptions = filter => {
    if (filter !== "") {
      const filterBy = filter[0].toUpperCase() + filter.slice(1);
      const filteredOptions = base.filter(option =>
        option.startsWith(filterBy)
      );
      const filteredLiElements = getLiElementsFromOptions(filteredOptions);
      setOptions(filteredLiElements);
    } else {
      const allOptions = getLiElementsFromOptions(base);
      setOptions(allOptions);
    }
  };

  const selectOption = option => {
    setSelectedOption(option);
    const selectInput = document.getElementById("select-input");
    selectInput.value = option;
  };

  const attachCloseClickHandler = () => {
    document.body.addEventListener("click", e => {
      const selectContainer = document.getElementById("select");

      if (!selectContainer.contains(e.target) && dropdownState === true) {
        toggleOptions();
      }
    });
  };

  const getLiElementsFromOptions = options => {
    return options.map((option, index) => (
      <li
        key={index}
        className="SELECT__options-option"
        onClick={e => selectOption(option)}
      >
        {option}
      </li>
    ));
  };

  return (
    <section>
      <div id="select" className="SELECT">
        <input
          id="select-input"
          className="SELECT__input"
          type="text"
          placeholder="Select"
          onClick={e => toggleOptions()}
          onChange={e => showFilteredOptions(e.target.value)}
        ></input>
        <button className="dropdownBtn" onClick={e => toggleOptions(e)}>
          V
        </button>
        <ul className="SELECT__options">{options}</ul>
      </div>
      <div>
        <p> {selectedOption}</p>
      </div>
    </section>
  );
};

export default Select;

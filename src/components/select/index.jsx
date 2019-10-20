import React from "react";
import "./style.scss";

const SelectInput = props => {
  return (
    <input
      id="select-input"
      className="SELECT__input"
      type="text"
      placeholder="Select"
      onClick={props.toggleOptions}
      onChange={props.showFilteredOptions}
    ></input>
  );
};

const Tag = props => {
  return (
    <span>
      {props.text}
      <button onClick={props.removeTag}>X</button>
    </span>
  );
};

const Select = props => {
  let base = ["Vanilla", "Van", "Dark chocolate", "White chocolate"];
  const [options, setOptions] = React.useState([]);
  const [dropdownState, setDropdownState] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    attachCloseClickHandler();
  });

  const toggleOptions = e => {
    const dropdownBtn = document.getElementsByClassName("dropdownBtn")[0];
    const dropdownInput = document.getElementById("select-input");
    if (dropdownState === false) {
      dropdownInput.focus();
      const availableOptions = base.filter(opt => tags.indexOf(opt) < 0);
      setOptions(availableOptions);
      dropdownBtn.innerHTML = "/\\";
      setDropdownState(true);
    } else {
      dropdownBtn.innerHTML = "V";
      setOptions([]);
      setDropdownState(false);
    }
  };

  const filterOptions = filter => {
    const leftAvailableOptions = base.filter(opt => tags.indexOf(opt) < 0);
    if (filter !== "") {
      const filterBy = filter[0].toUpperCase() + filter.slice(1);
      const filteredOptions = leftAvailableOptions.filter(option =>
        option.startsWith(filterBy)
      );
      setOptions(filteredOptions);
    } else {
      setOptions(leftAvailableOptions)
    }
    // else {
    //   setOptions(base);
    // }
  };

  const selectOption = (e, option) => {
    e.preventDefault();
    if (props.mode === "single") {
      setSelectedOption(option);
      const selectInput = document.getElementById("select-input");
      selectInput.value = option;
    } else {
      addTag(option);
    }
  };

  const attachCloseClickHandler = () => {
    document.body.addEventListener("click", e => {
      const selectContainer = document.getElementById("select");

      if (!selectContainer.contains(e.target) && dropdownState === true) {
        toggleOptions();
      }
    });
  };

  const addTag = text => {
    setTags(tags => [...tags, text]);
    const dropdownInput = document.getElementById("select-input");
    dropdownInput.focus();
    setOptions(options => options.filter(opt => opt !== text));
  };

  const removeTag = (tagIndex, tagText) => {
    setTags(tags.filter((t, index) => index !== tagIndex));
    setOptions(options => [...options, tagText]);
  };

  return (
    <section>
      <div id="select" className="SELECT">
        {props.mode === "single" ? (
          <SelectInput
            toggleOptions={e => toggleOptions()}
            filterOptions={e => filterOptions(e.target.value)}
          />
        ) : (
            <div>
              {tags.map((text, index) => (
                <Tag key={index} text={text} removeTag={e => removeTag(index, text)} />
              ))}
              <SelectInput
                toggleOptions={e => toggleOptions()}
                showFilteredOptions={e => filterOptions(e.target.value)}
              />
            </div>
          )}
        <button className="dropdownBtn" onClick={e => toggleOptions(e)}>
          V
        </button>

        <ul className="SELECT__options">{dropdownState && options.map((opt, index) => {
          return (<li
            key={index}
            className="SELECT__options-option"
            onClick={e => selectOption(e, opt)}
          >
            {opt}
          </li>)
        })}</ul>

      </div>
      <div>
        <p>{selectedOption}</p>
      </div>
    </section>
  );
};

export default Select;
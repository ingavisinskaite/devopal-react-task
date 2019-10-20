import React from "react";
import "./style.scss";

const SelectInput = React.forwardRef((props, ref) => (
  <input
    id="select-input"
    className={
      props.mode === "tags" ? "SELECT__tags-input-container__input" : undefined
    }
    type="text"
    placeholder="Select..."
    onClick={props.toggleOptions}
    onChange={props.showFilteredOptions}
    ref={ref}
  ></input>
));

const Tag = props => {
  return (
    <div className="SELECT__tags-input-container__tags__tag-container">
      <span className="SELECT__tags-input-container__tags__tag-container__tag">
        {props.text}
        <button
          className="SELECT__tags-input-container__tags__remove"
          onClick={props.removeTag}
        >
          X
        </button>
      </span>
    </div>
  );
};

const Select = props => {
  const allPossibleOptions = props.data;
  const [options, setOptions] = React.useState([]);
  const [dropdownState, setDropdownState] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const selectContainer = React.useRef(null);
  const selectInput = React.useRef(null);

  const closeSelect = () => {
    setOptions([]);
    setDropdownState(false);
  };

  React.useEffect(() => {
    const clickHandler = e => {
      if (
        !selectContainer.current.contains(e.target) &&
        dropdownState === true
      ) {
        closeSelect();
      }
    };

    document.body.addEventListener("click", clickHandler);

    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, [dropdownState]);

  React.useEffect(() => {
    return () => {
      if (props.setSingleSelection) {
        props.setSingleSelection(selectedOption);
      }
      if (props.setTagsSelection) {
        props.setTagsSelection(tags);
      }
    };
  });

  const toggleOptions = e => {
    if (dropdownState === false) {
      selectInput.current.focus();
      const availableOptions = allPossibleOptions.filter(
        opt => tags.indexOf(opt) < 0
      );
      setOptions(availableOptions);
      setDropdownState(true);
    } else {
      closeSelect();
    }
  };

  const filterOptions = filter => {
    const leftAvailableOptions = allPossibleOptions.filter(
      opt => tags.indexOf(opt) < 0
    );
    if (filter !== "") {
      const filterBy = filter[0].toUpperCase() + filter.slice(1);
      const filteredOptions = leftAvailableOptions.filter(option =>
        option.startsWith(filterBy)
      );
      setOptions(filteredOptions);
    } else {
      setOptions(leftAvailableOptions);
    }
  };

  const selectOption = (e, option) => {
    e.preventDefault();
    if (props.mode === "single") {
      setSelectedOption(option);
      selectInput.current.value = option;
    } else {
      addTag(option);
    }
  };

  const addTag = text => {
    setTags(tags => [...tags, text]);
    selectInput.current.focus();
    setOptions(options => options.filter(opt => opt !== text));
  };

  const removeTag = (tagIndex, tagText) => {
    setTags(tags.filter((t, index) => index !== tagIndex));
    setOptions(options => [...options, tagText]);
  };

  return (
    <section>
      <div ref={selectContainer} className="SELECT">
        {props.mode === "single" ? (
          <SelectInput
            toggleOptions={e => toggleOptions()}
            filterOptions={e => filterOptions(e.target.value)}
            mode={props.mode}
            ref={selectInput}
          />
        ) : (
          <div className="SELECT__tags-input-container">
            <div className="SELECT__tags-input-container__tags">
              {tags.map((text, index) => (
                <Tag
                  key={index}
                  text={text}
                  removeTag={e => removeTag(index, text)}
                />
              ))}
            </div>
            <SelectInput
              toggleOptions={e => toggleOptions()}
              showFilteredOptions={e => filterOptions(e.target.value)}
              mode={props.mode}
              ref={selectInput}
            />
          </div>
        )}
        <button
          className="SELECT__dropdown-button"
          onClick={e => toggleOptions(e)}
        >
          {dropdownState ? "/\\" : "V"}
        </button>

        <ul className="SELECT__options">
          {dropdownState &&
            options.map((opt, index) => {
              return (
                <li
                  key={index}
                  className="SELECT__options-option"
                  onClick={e => selectOption(e, opt)}
                >
                  {opt}
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default Select;

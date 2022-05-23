import { useState } from "react";

function SearchBox({ onClick }) {
  const [searchInputValue, setSearchInputValue] = useState("");

  function handleChange(e) {
    const inputValue = e.target.value;
    setSearchInputValue(inputValue);
  }

  const handleOnClick = () => onClick(searchInputValue);

  return (
    <>
      <input type="text" value={searchInputValue} onChange={handleChange} />
      <button onClick={handleOnClick}>search</button>
    </>
  );
}

export default SearchBox;

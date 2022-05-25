function SearchBox({ onClick, onChange, value }) {
  const handleOnClick = () => onClick(value);

  return (
    <>
      <input type="search" value={value} onChange={onChange} />
      <button onClick={handleOnClick}>search</button>
    </>
  );
}

export default SearchBox;

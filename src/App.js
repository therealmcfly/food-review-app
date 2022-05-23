import { useEffect, useRef, useState } from "react";
import { getFoodList } from "./api";
import FoodList from "./components/FoodList/FoodList";
import SearchBox from "./components/SearchBox/SearchBox";

function App() {
  const [listOfFoods, setListOfFoods] = useState([]);
  const [orderState, setOrder] = useState("");
  const [nextCursor, setNextCursor] = useState(0);
  const nextCursorRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const responseStatusRef = useRef();

  const handleOrderClick = (e) => {
    setNextCursor(0);
    setOrder(() => e.target.name);
  };

  const handleDelete = (id) => {
    setListOfFoods((prevList) => {
      const filteredList = prevList.filter((item) => item.id !== id);
      return filteredList;
    });
  };

  const loadFoodList = async (orderBy, cursor, searchValue) => {
    let result;
    try {
      setIsLoading(true);
      responseStatusRef.current = null;
      result = await getFoodList(orderBy, cursor, searchValue);
    } catch (error) {
      responseStatusRef.current = error;
    } finally {
      setIsLoading(false);
      const { foods, paging } = await result;
      setListOfFoods((prevList) => {
        if (nextCursor && !searchValue) {
          nextCursorRef.current = paging.nextCursor;
          const list = [...prevList, ...foods];
          return list;
        } else {
          nextCursorRef.current = paging.nextCursor;
          responseStatusRef.current =
            foods.length === 0 ? "Not Available" : null;
          return foods;
        }
      });
    }
  };

  const handleLoadMore = () => {
    setNextCursor(() => nextCursorRef.current);
  };

  const handleSearchSubmit = (searchValue) => {
    loadFoodList(null, null, searchValue);
  };

  useEffect(() => {
    loadFoodList(orderState, nextCursor);
  }, [orderState, nextCursor]);

  return (
    <div>
      <button name="createdAt" onClick={handleOrderClick}>
        Newest
      </button>
      <button name="calorie" onClick={handleOrderClick}>
        By Calories
      </button>
      <SearchBox onClick={handleSearchSubmit} />
      <FoodList items={listOfFoods} onDelete={handleDelete} />
      {nextCursorRef.current && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          Load More
        </button>
      )}
      {responseStatusRef.current && (
        <div>
          {responseStatusRef.current.message || responseStatusRef.current}
        </div>
      )}
    </div>
  );
}

export default App;

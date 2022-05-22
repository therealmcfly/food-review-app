import { useEffect, useRef, useState } from "react";
import { getFoodList } from "./api";
import FoodList from "./components/FoodList/FoodList";

function App() {
  const [listOfFood, setListOfFood] = useState([]);
  const [orderState, setOrder] = useState("");
  const [nextCursor, setNextCursor] = useState(0);
  const nextCursorRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderClick = (e) => {
    setNextCursor(0);
    setOrder(() => e.target.name);
  };

  const handleDelete = (id) => {
    setListOfFood((prevList) => {
      const filteredList = prevList.filter((item) => item.id !== id);
      return filteredList;
    });
  };

  const loadFoodList = async (orderBy, cursor) => {
    let result;
    try {
      setIsLoading(true);
      result = await getFoodList(orderBy, cursor);
    } catch (error) {
      alert(error);
      console.error(error);
    } finally {
      setIsLoading(false);
      const { foods, paging } = await result;
      setListOfFood((prevList) => {
        if (nextCursor) {
          nextCursorRef.current = paging.nextCursor;
          const list = [...prevList, ...foods];
          return list;
        } else {
          nextCursorRef.current = paging.nextCursor;
          return foods;
        }
      });
    }
  };

  const handleLoadMore = () => {
    console.log(nextCursorRef.current);
    setNextCursor(() => nextCursorRef.current);
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
      <FoodList items={listOfFood} onDelete={handleDelete} />
      {nextCursorRef.current && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;

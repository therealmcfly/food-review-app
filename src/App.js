import { useEffect, useState } from "react";
import { getFoodList } from "./api";
import FoodList from "./components/FoodList/FoodList";

function App() {
  const [listOfFood, setListOfFood] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const sortedFoodList = listOfFood.sort((a, b) => a[orderBy] - b[orderBy]);

  const handleOrderClick = (e) => {
    setOrderBy(() => e.target.name);
  };

  const handleDelete = (id) => {
    setListOfFood((prevList) => {
      const filteredList = prevList.filter((item) => item.id !== id);
      return filteredList;
    });
  };

  const loadFoodList = async () => {
    const result = await getFoodList();
    const { foods } = result;
    setListOfFood(foods);
  };

  useEffect(() => {
    loadFoodList();
  }, []);

  return (
    <div>
      <button name="createdAt" onClick={handleOrderClick}>
        최신순
      </button>
      <button name="calorie" onClick={handleOrderClick}>
        칼로리순
      </button>
      <FoodList items={sortedFoodList} onDelete={handleDelete} />
    </div>
  );
}

export default App;

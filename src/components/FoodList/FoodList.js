import "./FoodList.scss";

export default function FoodList({ items, onDelete }) {
  return (
    <ul className="food-list">
      {items.map((item) => {
        const handleDelete = () => onDelete(item.id);
        return (
          <FoodListItem key={item.id} item={item} onDelete={handleDelete} />
        );
      })}
    </ul>
  );
}

function FoodListItem({ item, onDelete }) {
  const { imgUrl, title, calorie, content } = item;

  return (
    <div className="food-list-items">
      <img src={imgUrl} alt={title} width="300px" />
      <div>{title}</div>
      <div>{`${calorie} kcal`}</div>
      <div>{content}</div>
      <button>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}

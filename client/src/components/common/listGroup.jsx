const ListGroup = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className="listGroup">
      {items.map((item) => (
        <li
          key={item}
          className={
            item === selectedItem
              ? "listGroup__item listGroup__item--active"
              : "listGroup__item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;

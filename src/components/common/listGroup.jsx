const LisGroup = ({
  items,
  onItemSelected,
  valueProperty,
  textProperty,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((i, index) => {
        return (
          <li
            key={index}
            className={
              "list-group-item" + (i === selectedItem ? " active" : "")
            }
            onClick={() => onItemSelected(i)}
          >
            {i[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

LisGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default LisGroup;

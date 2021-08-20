const TodoItem = ({ item, ...props }) => {
  const ActionBtn = () => (
    <div className="action-btn">
      {!item.done ? (
        <button onClick={props.doneItem}>✓</button>
      ) : (
        <button onClick={props.deleteItem}>X</button>
      )}
    </div>
  );

  const className = "item " + (item.done ? "item-done" : "");

  return (
    <div className={className}>
      <p>{item.title}</p>
      <ActionBtn />
    </div>
  );
};

export default TodoItem;

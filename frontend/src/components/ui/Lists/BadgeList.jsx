import React from "react";

const ListItem = ({ item, onClick }) => {
  return (
    <span className="m-1 badge bg-primary" onClick={onClick.bind(null, item)}>
      {item.name} <i className="bi bi-x-circle-fill" />
    </span>
  );
};

const BadgeList = ({ list, onAnyClick = () => {}, title = null }) => {
  return (
    <div>
      {title && <p>{title}</p>}
      <div className="direction-rtl">
        {list.map((item) => (
          <ListItem item={item} key={item.id} onClick={onAnyClick} />
        ))}
      </div>
    </div>
  );
};

export default BadgeList;

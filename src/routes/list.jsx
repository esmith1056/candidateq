import { useState } from "react";
import { Link } from "react-router-dom";

const List = ({ data }) => {
  const [candidates] = useState(() => {
    return Object.keys(localStorage).reduce((previousValue, currentValue) => {
      const data = JSON.parse(localStorage.getItem(currentValue));
      const name = `${data.name?.last}, ${data.name?.first}`;
      return [...previousValue, [currentValue, name]];
    }, []);
  });

  return (
    <>
      {!candidates?.length ? (
        <div>You have not reviewed any candidates yet.</div>
      ) : (
        <ul>
          {candidates.map((el) => (
            <li key={el[0]}>
              <Link to={`/info/${el[0]}`}>{el[1]}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;

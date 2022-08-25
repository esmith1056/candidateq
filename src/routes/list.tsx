import { useState } from "react";
import { Link } from "react-router-dom";

type TReducerReturn = [string, string][];

const List = () => {
  const [candidates] = useState(() =>
    Object.keys(localStorage).reduce<TReducerReturn>((acc, cur) => {
      if (cur.startsWith("uid.")) {
        const entry = localStorage.getItem(cur);
        if (entry) {
          const data = JSON.parse(entry);
          const name = `${data.name?.last}, ${data.name?.first}`;
          return [...acc, [cur, name]];
        }
      }

      return [...acc];
    }, [] as TReducerReturn)
  );

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

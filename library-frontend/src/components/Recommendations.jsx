import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, USER } from "../queries";
import { useState } from "react";

const Recommendations = (props) => {
  const userResult = useQuery(USER, {
    skip: !localStorage.getItem("books-user-token"),
  });
  const genre = userResult.data?.me?.favoriteGenre;
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (!props.show) {
    return null;
  }

  console.log(genre);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      {genre && (
        <p>
          books in your favourite genre <strong>{genre}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;

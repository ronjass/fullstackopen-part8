import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useQuery } from "@apollo/client/react";
import Notify from "./components/Notify";

const App = ({ setError }) => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("books-user-token"));
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")} token={token}>
          authors
        </button>
        <button onClick={() => setPage("books")}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button onClick={onLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} token={token} />

      <Recommendations show={page === "recommendations"} token={token} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;

import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import BookSearch from "./components/BookSearch";
import BookList from "./components/BookList";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1>Book Search</h1>
        <BookSearch />
        <BookList />
      </div>
    </Provider>
  );
};

export default App;
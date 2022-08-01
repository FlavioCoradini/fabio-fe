import React from "react";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navbar";

class App extends React.Component {
  render() {
    return (
      <>
        <main className="container">
          <NavBar />
          <Movies />
        </main>
      </>
    );
  }
}

export default App;

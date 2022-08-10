import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Costumers from "./components/costumers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

import "./App.css";
class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/costumers" component={Costumers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;

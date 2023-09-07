import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Notes from "./pages/notes";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import NoteForm from "./components/noteForm";
import "./App.css";
import { initGA, logPageView } from "./analytics";
import UpdateNote from "./pages/updateNote";
import CreateNote from "./pages/createNote";

function App() {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/notes/update/:id" component={NoteForm} />
          <Route path="/notes/detail/:id" component={NoteForm} />
          <Route path="/notes/delete/:id" component={NoteForm} />
          <Route path="/notes/:id" component={NoteForm} />
          <Route path="/notes" component={Notes} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/notes" />
          <Redirect to="not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;

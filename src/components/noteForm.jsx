import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { updateNote, getNoteById, createNote } from "../services/NoteService";

class NoteForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.string(),
    title: Joi.string().required().label("title"),
    description: Joi.string().required().label("description"),
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id === "new") return;

    const note = await getNoteById(id);
    if (!note) this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(note) });
  }

  mapToViewModel = (note) => {
    return {
      id: note.id.toString(),
      title: note.title,
      description: note.description,
    };
  };

  doSubmit = () => {
    const { id } = this.props.match.params;
    if (id === "new") createNote(this.state.data);
    else updateNote(this.state.data.id, this.state.data);
    this.props.history.push("/notes");
  };

  render() {
    return (
      <div>
        <h2>Note Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NoteForm;

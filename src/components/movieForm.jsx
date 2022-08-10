import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== "new") {
      const movie = getMovie(id);
      if (!movie) this.props.history.push("/not-found");
      else {
        const { title, genre, numberInStock, dailyRentalRate } = movie;
        const data = {
          ...this.state.data,
          title,
          genreId: genre._id,
          numberInStock,
          dailyRentalRate,
        };
        this.setState({ data });
      }
    }
    this.setState({
      genres: [{ name: "All Genres" }, ...getGenres()],
    });
  }

  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number().required().min(0).label("Number in stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  onSubmit = () => {
    console.log("saving", this.state);
    // Navigate to /products
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h2>Movie Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("numberInStock", "Number in stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

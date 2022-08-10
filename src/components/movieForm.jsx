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
    if (id) {
      const { title, genre, numberInStock, dailyRentalRate } = getMovie(id);
      const data = {
        ...this.state.data,
        title,
        genreId: genre._id,
        numberInStock,
        dailyRentalRate,
      };
      this.setState({ data });

      this.setState({
        genres: [{ name: "All Genres" }, ...getGenres()],
      });
    }
  }

  schema = {
    title: Joi.string().required().label("Username"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.string().required().label("Number in stock"),
    dailyRentalRate: Joi.string().required().label("Rate"),
  };

  onSubmit = () => {
    console.log("saving", this.state);
    // Navigate to /products
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h2>Movie - {this.props.match.params.id}</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Username")}
          {/* {this.renderInput("genre", "Genre")} */}
          {this.renderInput("numberInStock", "Number in stock", "numeric")}
          {this.renderInput("dailyRentalRate", "Rate", "numeric")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

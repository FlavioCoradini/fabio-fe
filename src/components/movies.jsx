import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = { movies: getMovies(), listLiked: [] };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handleLike = (movie) => {
    const listLiked = [...this.state.listLiked];
    if (this.state.listLiked.includes(movie._id)) {
      var index = listLiked.indexOf(movie._id);
      if (index !== -1) {
        listLiked.splice(index, 1);
      }
    }
    //listLiked.filter((e) => e !== movie._id);
    else listLiked.push(movie._id);
    console.log("depois", listLiked);
    this.setState({ listLiked });
  };

  getClass = (movie) => {
    return (
      "fa fa-heart" + (this.state.listLiked.includes(movie._id) ? "" : "-o")
    );
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return "No movies in Database";
    return (
      <>
        <p> Showing {count} movies in Database. </p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tile</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie, index) => {
              return (
                <tr key={index}>
                  <th>{movie.title}</th>
                  <th>{movie.genre.name}</th>
                  <th>{movie.numberInStock}</th>
                  <th>{movie.dailyRentalRate}</th>
                  <th>
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleLike(movie)}
                      className={this.getClass(movie)}
                      aria-hidden="true"
                    ></i>
                  </th>
                  <th>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movies;

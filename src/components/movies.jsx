import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";

class Movies extends Component {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    var index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    //Change the current data
  };

  getClass = (movie) => {
    return (
      "fa fa-heart" + (this.state.listLiked.includes(movie._id) ? "" : "-o")
    );
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);

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
            {movies.map((movie, index) => {
              return (
                <tr key={index}>
                  <th>{movie.title}</th>
                  <th>{movie.genre.name}</th>
                  <th>{movie.numberInStock}</th>
                  <th>{movie.dailyRentalRate}</th>
                  <th>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
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

        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default Movies;

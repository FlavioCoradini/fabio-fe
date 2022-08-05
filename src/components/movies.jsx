import React, { Component } from "react";
import _ from "loadsh";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import LisGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: 0,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "All Genres" }, ...getGenres()],
    });
  }

  handleDelete = (movie) => {
    let movies = [...this.state.movies];
    movies = movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
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
  };

  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  getClass = (movie) => {
    return (
      "fa fa-heart" + (this.state.listLiked.includes(movie._id) ? "" : "-o")
    );
  };

  getPagedData() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;

    if (count === 0) return "No movies in Database";

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row m-2">
        <div className="col-3">
          <LisGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelected={this.handleGenreSelected}
          />
        </div>
        <div className="col">
          <p> Showing {totalCount} movies in Database. </p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

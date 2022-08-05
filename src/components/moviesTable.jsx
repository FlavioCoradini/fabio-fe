import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MovieTable extends Component {
  columns = [
    {
      name: "Tile",
      path: "title",
    },
    {
      name: "Genre",
      path: "genre.name",
    },
    {
      name: "Stock",
      path: "numberInStock",
    },
    {
      name: "Rate",
      path: "dailyRentalRate",
    },
    {
      key: "Like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "Delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MovieTable;

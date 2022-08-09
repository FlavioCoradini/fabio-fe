import React, { Component } from "react";

class MovieDetails extends Component {
  handleSave = () => {
    // Navigate to /products
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Details - {this.props.match.params.id} </h1>
        <button className="btn btn-primary" onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;

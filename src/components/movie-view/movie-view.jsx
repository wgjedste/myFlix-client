import React from "react";
import { Link } from "react-router-dom";

import "./movie-view.scss"

import { Button, Col } from "react-bootstrap"

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (

      <div className="movie-view">
        <div className="movie-view-column">
          <img src={movie.ImagePath} />
        </div >
        <div className="movie-view-column" >
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div >
        <div className="movie-view-column" >
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div >

        <div className="movie-view-button">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
      </div>
    );
  }
}

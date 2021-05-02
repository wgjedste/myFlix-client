import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Row, Col } from "react-bootstrap";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      selectedMovie: null,
    };
  }


  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  //  src/components/main-view/main-view.jsx
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  // src/components/main-view/main-view.jsx
  getMovies(token) {
    axios
      .get("https://willsmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //  src/components/main-view/main-view.jsx

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={movies.find(
                      (m) => m.Director.Name === match.params.name
                    )}
                    onBackClick={() => window.history.back()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    onBackClick={() => window.history.back()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

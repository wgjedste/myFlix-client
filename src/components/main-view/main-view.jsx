import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';


import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import './main-view.scss'; 
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Row, Col, Button, Navbar } from "react-bootstrap";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from '../update-view/update-view';
import { About } from '../about/about';


 class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // movies: [],
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
        this.props.setMovies(response.data);
        // this.setState({
        //   movies: response.data,
        // });
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

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    // const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    // if (!user)
    //   return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // // Before the movies have been loaded
    // if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Navbar
          bg="dark"
          expand="lg"
          sticky="top"
          variant="dark"
          expand="lg"
          className="navbar shadow-sm mb-5"
        >
          <Navbar.Brand href="http://localhost:1234" className="navbar-brand">
            FlixNET
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            {/* <VisibilityFilterInput visibilityFilter={visibilityFilter} /> */}
            {!user ? (
              <ul>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link">
                    Sign In
                  </Button>
                </Link>
                <Link to={`/register`}>
                  <Button variant="link" className="navbar-link">
                    Register
                  </Button>
                </Link>
              </ul>
            ) : (
              <ul>
                <Link to={`/`}>
                  <Button
                    variant="dark"
                    className="navbar-link"
                    onClick={() => this.logOut()}
                  >
                    Sign Out
                  </Button>
                </Link>
                <Link to={`/users/${user}`}>
                  <Button variant="dark" className="navbar-link">
                    My Account
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="dark" className="navbar-link">
                    Movies
                  </Button>
                </Link>
                <Link to={`/about`}>
                  <Button variant="dark" className="navbar-link">
                    About
                  </Button>
                </Link>
              </ul>
            )}
          </Navbar.Collapse>
        </Navbar>
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
                return <MoviesList movies={movies}/>;
              // return movies.map((m) => (
              //   <Col md={3} key={m._id}>
              //     <MovieCard movie={m} />
              //   </Col>
              // ));
            }}
          />
          <Route
            path="/register"
            render={() => {
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          {/* you keep the rest routes here */}

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
                    movies={movies}
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
                    movies={movies}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/about"
            render={() => <About/>}
          />
          <Route
            exact
            path="/users/:userId"
            render={() => <ProfileView movies={movies} />}
          />
          <Route
            path="/update/:userId"
            render={() => {
              return <UpdateView />;
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}
export default connect(mapStateToProps, { setMovies } )(MainView);
 

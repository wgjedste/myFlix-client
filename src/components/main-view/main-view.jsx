import React from 'react';
import axios from 'axios';

import {LoginView} from '../login-view/login-view';
import {RegisterView} from '../registration-view/registration-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {Row, Col} from 'react-bootstrap'


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      user: null,
      selectedMovie: null
    }
  }

  componentDidMount(){
    axios.get('https://willsmovies.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
        register
    });
}

  
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
        }
      </Row>
    );
  }

}
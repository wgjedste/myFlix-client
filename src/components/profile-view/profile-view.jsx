import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./profile-view.scss";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

import axios from "axios";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser(token) {
    //console.log(localStorage.getItem("user"));
    let url =
      "https://willsmovies.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response);
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  //   removeFavorite(movie) {
  //     let token = localStorage.getItem("token");
  //     let url =
  //       "https://my-flix-db-app.herokuapp.com/users/" +
  //       localStorage.getItem("user") +
  //       "/favorites/" +
  //       movie._id;
  //     axios
  //       .delete(url, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         this.componentDidMount();
  //       });
  //   }

  handleDelete() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(`https://willsmovies.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(user + " has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    // this.getUser(localStorage.getItem("token"));
    // const favoriteMovieList = movies.filter((movie) => {
    //   return this.state.favoriteMovies.includes(movie._id);
    // });
    // console.log(favoriteMovieList);

    if (!movies) alert("Please sign in");
    return (
      <div className="profile-view-container" style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col>
              <Form className="profile-view-form" style={{ width: "24rem", float: "center" }}>
                <h1 className="profile-view-card" style={{ textAlign: "center" }}>Profile Details</h1>
                <Form.Group controlId="formBasicUsername">
                  <h3 style={{ textAlign: "center" }}>Username: </h3>
                  <Form.Label>{this.state.username}</Form.Label>
                </Form.Group>
               
                <Form.Group controlId="formBasicEmail">
                  <h3 style={{ textAlign: "center" }}>Email:</h3>
                  <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicDate">
                  <h3 style={{ textAlign: "center" }}>Date of Birth:</h3>
                  <Form.Label>{this.state.dob}</Form.Label>
                </Form.Group>

                <Link to={`/update/${this.state.username}`}>
                  <Button className="profile-view-button" variant="outline-light" type="link" size="sm" block>
                    Edit Profile
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button className="profile-view-button" variant="outline-light" type="submit" size="sm" block>
                    Back to Main
                  </Button>
                </Link>
                <Button
                  className="profile-view-button"
                  variant="dark"
                  size="sm"
                  block
                  onClick={() => this.handleDelete()}
                >
                  Delete Account
                </Button>
              </Form>
            </Col>
            {/* <Col>
              <div
                className="favoriteMovies"
                style={{
                  float: "right",
                  textAlign: "center",
                  width: "24rem",
                }}
              >
                <h1>Favorite Movies</h1>
                {favoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card>
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button onClick={() => this.removeFavorite(movie)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};

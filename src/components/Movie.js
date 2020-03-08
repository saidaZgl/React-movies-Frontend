import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  Badge,
  ButtonGroup,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button
} from "reactstrap";

function Movie(props) {
  const [watchMovie, setWatchMovie] = useState(false);
  const [countWatchMovie, setCountWatchMovie] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(0);
  const [isRatingMovie, setIsRatingMovie] = useState(false);

  const [rating, setRating] = useState(props.globalRating);
  const [countRating, setcountRating] = useState(props.globalCountRating);

  var changeLiked = (name, img) => {
    if (props.movieSee == true) {
      props.handleClickDeleteMovieParent(name, img);
    } else {
      props.handleClickAddMovieParent(name, img);
    }
  };

  var addWatch = () => {
    setWatchMovie(true);
    setCountWatchMovie(countWatchMovie + 1);
  };

  var setMyRating = rating => {
    if (rating < 0) {
      rating = 0;
    }
    if (rating > 10) {
      rating = 10;
    }
    setMyRatingMovie(rating);
    setIsRatingMovie(true);
  };

  var tabRating = [];
  for (let i = 0; i < 10; i++) {
    var color = {};
    if (i < myRatingMovie) {
      color = { color: "#f1c40f" };
    }
    let count = i + 1;
    tabRating.push(
      <FontAwesomeIcon
        onClick={() => setMyRating(count)}
        style={color}
        icon={faStar}
      />
    );
  }

  var nbTotalNote = rating * countRating;
  var nbTotalVote = countRating;

  if (isRatingMovie) {
    nbTotalVote += 1;
    nbTotalNote += myRatingMovie;
  }

  var avgTotal = Math.round(nbTotalNote / nbTotalNote);

  let tabGlobalRating = [];
  for (let i = 0; i < 10; i++) {
    let color = {};
    if (i < avgTotal) {
      color = { color: "#f1c40f" };
    }
    tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />);
  }

  if (props.movieSee) {
    var colorLike = { color: "#e74c3c", cursor: "pointer" };
  } else {
    var colorLike = { cursor: "pointer" };
  }

  if (watchMovie) {
    var colorWatch = { color: "#e74c3c" };
  } else {
    var colorWatch = {};
  }

  return (
    <Col xs="12" lg="6" xl="4">
      <Card style={{ marginBottom: 30 }}>
        <CardImg top src={props.movieImg} alt={props.movieName} />
        <CardBody>
          <p>
            Like{" "}
            <FontAwesomeIcon
              style={colorLike}
              icon={faHeart}
              onClick={() => changeLiked(props.movieName, props.movieImg)}
            />
          </p>
          <p>
            Nombre de vues{" "}
            <FontAwesomeIcon
              style={colorWatch}
              icon={faVideo}
              onClick={() => addWatch()}
            />
            <Badge color="secondary">{countWatchMovie}</Badge>
          </p>
          <p>
            Mon avis
            {tabRating}
            <ButtonGroup size="sm">
              <Button
                onClick={() => setMyRating(myRatingMovie - 1)}
                color="secondary"
              >
                -
              </Button>
              <Button
                onClick={() => setMyRating(myRatingMovie + 1)}
                color="secondary"
              >
                +
              </Button>
            </ButtonGroup>
          </p>
          <p>
            Moyenne {tabGlobalRating}({nbTotalVote})
          </p>
          <CardTitle>{props.movieName}</CardTitle>
          <CardText>{props.movieDesc}}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
}

export default Movie;

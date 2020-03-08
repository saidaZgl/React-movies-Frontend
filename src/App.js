import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Container,
  Row,
  Nav,
  NavLink,
  NavItem,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  ListGroupItemText
} from "reactstrap";

import Movie from "./components/Movie";

function App() {
  const [moviesCount, setMoviesCount] = useState(0);

  const [moviesWishList, setMoviesWishList] = useState([]);

  const [movieList, setMovieList] = useState([]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(async () => {
    const response = await fetch("/new-movies");
    const jsonResponse = await response.json();
    //console.log(jsonResponse);
    setMovieList(jsonResponse.movies);

    const responseWhish = await fetch("/whishlist-movie");
    const jsonResponseWish = await responseWhish.json();
    //console.log(jsonResponseWish);

    const wishlistFromDB = jsonResponseWish.movies.map((movie, i) => {
      return { name: movie.movieName, img: movie.movieImg };
    });
    setMoviesWishList(wishlistFromDB);
    setMoviesCount(jsonResponseWish.movies.length);
  }, []);

  var handleClickAddMovie = async (name, img) => {
    setMoviesCount(moviesCount + 1);
    setMoviesWishList([...moviesWishList, { name: name, img: img }]);

    const response = await fetch("/whishlist-movie", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${name}&img=${img}`
    });
  };

  var handleClickDeleteMovie = async name => {
    setMoviesCount(moviesCount - 1);
    setMoviesWishList(moviesWishList.filter(object => object.name != name));

    const response = await fetch(`/whishlist-movie/${name}`, {
      method: "DELETE"
    });
  };

  let cardWish = moviesWishList.map((movie, i) => {
    return (
      <ListGroupItem>
        <ListGroupItemText
          onClick={() => {
            handleClickDeleteMovie(movie.name);
          }}
        >
          <img width="25%" src={movie.img} /> {movie.name}
        </ListGroupItemText>
      </ListGroupItem>
    );
  });

  // let moviesData = [
  //   {
  //     name: "Star Wars: L'ascension de Skywalker",
  //     desc:
  //       "La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette...",
  //     img: "/starwars.jpg",
  //     note: 6.7,
  //     vote: 5
  //   },
  //   {
  //     name: "Maléfique: Le pouvoir du mal",
  //     desc:
  //       "Plusieurs années, après avoir découvert pourquoi la plus célèbre méchante Dismey avait un coeur...",
  //     img: "/maleficent.jpg",
  //     note: 8.2,
  //     vote: 3
  //   },
  //   {
  //     name: "Jumanji: The Next Level",
  //     desc:
  //       "L'équipe est de retour mais le jeu a changé. Alors qu'ils retournent dans Jumanji pour secourir... ",
  //     img: "/jumanji.jpg",
  //     note: 4,
  //     vote: 5
  //   },
  //   {
  //     name: "Once Upon a time...in Hollywood",
  //     desc:
  //       "En 1969, Rick Dalton -Star déclinante de série télévisée de western- et Cliff Booth...",
  //     img: "/once_upon.jpg",
  //     note: 6,
  //     vote: 7
  //   },
  //   {
  //     name: "La Reine des neiges 2",
  //     desc:
  //       "Ana, Elsa, Kristoff, Olaf et Sven voyagent bien au-delà des portes d'Arendelle à la recherche de réponses...",
  //     img: "/frozen.jpg",
  //     note: 7,
  //     vote: 9
  //   },
  //   {
  //     name: "Terminator: Dark Fate",
  //     desc:
  //       "De nos jours à Mexico, Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobiles...",
  //     img: "/terminator.jpg",
  //     note: 6.1,
  //     vote: 1
  //   }
  // ];

  let movieListItems = movieList.map((movie, i) => {
    var result = moviesWishList.find(element => element.name == movie.title);
    var isSee = false;
    if (result != undefined) {
      isSee = true;
    }

    var result = movie.overview;
    if (result.length > 80) {
      result = result.slice(0, 8) + "...";
    }

    var urlImage = "/generique.jpg";
    if (movie.backdrop_path != null) {
      urlImage = `https://image.tmdb.org/t/p/w500/` + movie.backdrop_path;
    }

    return (
      <Movie
        key={i}
        movieSee={isSee}
        handleClickDeleteMovieParent={handleClickDeleteMovie}
        handleClickAddMovieParent={handleClickAddMovie}
        movieName={movie.title}
        movieDesc={result}
        movieImg={urlImage}
        globalRating={movie.popularity}
        globalCountRating={movie.vote_count}
      />
    );
  });

  return (
    <div style={{ backgroundColor: "#232528" }}>
      <Container>
        <Nav>
          <span className="navbar-brand">
            <img
              src="./logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </span>
          <NavItem>
            <NavLink style={{ color: "white" }}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button id="Popover1" type="button">
                {moviesCount} films
              </Button>
              <Popover
                placement="bottom"
                isOpen={popoverOpen}
                target="Popover1"
                toggle={toggle}
              >
                <PopoverHeader>Wishlist</PopoverHeader>
                <PopoverBody>
                  <ListGroup>{cardWish}</ListGroup>
                </PopoverBody>
              </Popover>
            </NavLink>
          </NavItem>
        </Nav>
        <Row>{movieListItems}</Row>
      </Container>
    </div>
  );
}

export default App;

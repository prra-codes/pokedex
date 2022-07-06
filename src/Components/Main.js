import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/"); //intial 20 results from API stored in state. gets updated with next and previous buttons
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokedex, setPokedex] = useState();

  const pokeFun = () => {
    setLoading(true);
    axios
      .get(url) //getting the pokemon api saved in state and making a call to the pokemon api
      .then((res) => {
        // console.log(res);
        // console.log(res.data.results); // once data is retrieved, saves in state
        setNextUrl(res.data.next); //sets next 20 items API link to state
        setPrevUrl(res.data.previous); //sets previous 20 items link to state
        getPokemon(res.data.results); // pass in intial 20 results
        setLoading(false); //once the data has loaded, can show data in UI
      })
      .catch((error) => {
        console.log(error); // console.logs error is there is one
      });
  };

  const getPokemon = (res) => {
    res.map((item) => {
      //maps over each item within  results array
      //   console.log("LET'S GO", item.url);

      axios
        .get(item.url) //making call to each pokemon within the 20 items, so we all the data about each pokemon
        .then((res) => {
          //   console.log("TESTING", res.data);
          setPokeData((state) => {
            state = [...state, res.data];
            state.sort((a, b) => (a.id > b.id ? 1 : -1));
            return state;
          });
        })
        .catch((error) => console.log(error));
    });
  };

  useEffect(() => {
    pokeFun(); //calling func within useEffect to make API calls
  }, [url]); // the useEffect intially runs once. with url state in the dependency array, the useEffect runs everything time the url changes

  return (
    <div className="container">
      <div className="left-content">
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={(poke) => setPokedex(poke)}
        />

        <div className="btn-group">
          {prevUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(prevUrl); // show the previous 20 pkmn
              }}
            >
              Previous
            </button>
          )}
          {nextUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl); // show the next 20 pokemon
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="right-content">
        <Pokeinfo data={pokedex} />
      </div>
    </div>
  );
};

export default Main;

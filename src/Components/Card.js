import React from "react";
import charmander from "../images/charmander.png";

const Card = ({ pokemon, loading, infoPokemon }) => {
  console.log("PO-KE-MON!", pokemon);

  //   shows each pokemon in every card with map method
  return (
    <>
      {loading ? (
        <h1>...Loading</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div
              className="card"
              key={item.id}
              onClick={() => infoPokemon(item)}
            >
              <p>{item.id}</p>
              <img src={item.sprites.front_default} alt="" />
              <p>{item.name}</p>
            </div>
          );
        })
      )}
    </>
  );
};

export default Card;

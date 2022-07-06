import React from "react";

const Pokeinfo = ({ data }) => {
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          {" "}
          <div className="info-container">
            <h1>{data.name}</h1>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
              alt=""
            />
            <div className="abilities">
              {data.abilities.map((poke) => {
                return (
                  <div className="group" key={poke.id}>
                    <p>{poke.ability.name}</p>
                  </div>
                );
              })}

              {/* show pokemon abilities */}
            </div>
            <div className="base-stat">
              {data.stats.map((poke) => {
                return (
                  <div key={poke.id}>
                    <p>
                      {poke.stat.name}: {poke.base_stat}
                    </p>
                  </div>
                );
              })}
              {/* show pokemon base stats */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pokeinfo;

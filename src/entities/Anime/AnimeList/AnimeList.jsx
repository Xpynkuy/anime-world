import {React} from "react";
import AnimeCard from "../AnimeCard/AnimeCard";


const AnimeList = ({ anime }) => {
  return (
    <div>
      {anime.map((item, index) => (
        <AnimeCard
          key={index}
          anime={item.release} 
        />
      ))}
    </div>
  );
};

export default AnimeList;

import {React} from 'react'

import GenresCard from './GenresCard/GenresCard'

const GenresList = (genres) => {
  return (
    <div>
    {genres.map((item, index) => (
      <GenresCard
        key={index}
        schedule={item} 
      />
    ))}
  </div>
  )
}

export default GenresList

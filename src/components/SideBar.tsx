
import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Button} from './Button'

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


type Props={

  trocar: (id:number)=> void
  selectedGenreId:number
  
}

export function SideBar({trocar,selectedGenreId}:Props) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);


  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

   const handleClickButton = (id: number) =>{
     trocar(id)

   }


  return (
    <>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
     </>
    
  )
}
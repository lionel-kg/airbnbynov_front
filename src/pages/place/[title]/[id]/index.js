import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import placeService from '../../../../service/place.service';
import { Favorite, Share, Star } from '@mui/icons-material';

const Index = () => {
  
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState({});

  useEffect(() => {
    if (router.isReady) {
        placeService.getPlace(router.query.id).then((res) => {
            setPlace(res.data);
            setLoading(false)
        })
    }
  }, [router.isReady])

  return (
    
    <div className='page_wrapper'>
      { loading === true ? "loading" :
        <div className='container'>
          <h1 className='title'>{place.title}</h1>
          <div className='info_content'>
            <div className='rating_comment'>
              <div><Star/> <p>4,89</p></div>
              .
              <div><p>150 commentaires</p></div>
              .
              <div><Favorite /> <p>Superhôte</p></div>
              .
              <div><p>{place.address.street+" "+place.address.zipCode+", "+place.address.city}</p></div>
            </div>
            <div className='share_save'>
              <div><Share /><p>Partager</p></div>
              <div><Favorite /><p>Enregistrer</p></div>
            </div>
          </div>
          <div className='container_img'>
            <div className='main_img'>
              <img src={place.image[0]} alt="Netflix" />

            </div>
            <div className='second_part'>
              {
                place.image.map((img, index)=>{
                  if(index !== 0 ) {
                    return <div className="thumbnail"><img src={img} alt="Netflix" /></div>
                  }
                })
              }
            </div>
          </div>
        </div> 
      }  
    </div>
  );
}

export default Index;
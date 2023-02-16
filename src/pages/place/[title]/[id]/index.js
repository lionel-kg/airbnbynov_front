import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import placeService from '../../../../service/place.service';

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
    <div className='place_detail_container'>
        <div className='information_container'>
            <h1 className='title'>{place.title}</h1>
        </div>
    </div>
  );
}

export default Index;
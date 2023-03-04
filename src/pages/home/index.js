import {React, useEffect, useState, useContext} from 'react';
import placeService from '../../service/place.service';
import GridCard from "../../component/GridCard/index";
import { useRouter } from 'next/router';
import SearchContext from '../../context/SearchContext';
import ListIconsFilter from "../../component/ListIconsFilter/index"
import dynamic from 'next/dynamic';
import CustomButton from "../../component/CustomButton/index";

const MapComponent = dynamic(() => import('../../component/Map/index'), { ssr: false });

const Index = () => {
    const {search} = useContext(SearchContext);
    const [showMap, setShowMap] = useState(false);
    const [places, setPlaces] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const latitude = 48.856614; // latitude de Paris
    const longitude = 2.3522219; // longitude de Paris

    useEffect(() => {
        placeService.getPlaces().then((res) => {
            setPlaces(res.data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
          })
    }, []);

    useEffect(()=>{
        if(loading === false) {
            placeService.searchPlace(search).then((res)=>{
                setPlaces(res.data);
            }).catch((err)=>{
                console.log(err);
              })
        } 
    },[search])

    useEffect(()=>{
        let query = router.query;
            let params = "";
            if(query !== undefined && query.length !== 0 ) {
                Object.entries(query).forEach(([key,val]) =>{
                  params += key+"="+val+"&";
                })
                placeService.filterPlaces(params).then((res)=>{
                    setPlaces(res.data);
                }).catch((err)=>{
                    console.log(err)
                  })
            }
        
    },[router.query])


    return (
        <div className='homepage_container'>
           <ListIconsFilter />
           <div className='container_grid'>
            {showMap ? 
                <MapComponent latitude={latitude} longitude={longitude} places={places} /> :
                <GridCard places={places} loading={loading}/>
            }

            <CustomButton classes="btn_show_map" text="Afficher la carte" onClick={()=>{setShowMap(!showMap)}} />
           </div>
        </div>
    );
}

export default Index;

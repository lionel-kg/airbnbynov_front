import {React, useEffect, useState, useContext} from 'react';
import placeService from '../../service/place.service';
import GridCard from "../../component/GridCard/index";
import { useRouter } from 'next/router';
import SearchContext from '../../context/SearchContext';

const Index = () => {
    const {search} = useContext(SearchContext);
    const [places, setPlaces] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        placeService.getPlaces().then((res) => {
            setPlaces(res.data);
            setLoading(false);
        })
    }, []);

    useEffect(()=>{
        if(loading === false) {
            placeService.searchPlace(search).then((res)=>{
                setPlaces(res.data);
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
                })
            }
        
    },[router.query])


    return (
        <div className='homepage_container'>
           <GridCard places={places} loading={loading}/>
        </div>
    );
}

export default Index;

import React,{useEffect} from 'react';
import Card from '../../component/Card/Index';
import styles from "./index.module.scss";

const Index = (props) => {
    const {loading , places, setIsDelete, setIsUpdate} = props;
    useEffect(()=> {
        console.log(places, Object.keys(places).length)
    })
    return (
        <div className={styles.grid_container}>
             {loading !== true ? places.map((place) => {
                return <div key={place._id} className={styles.list_card}><Card place={place} setIsDelete={setIsDelete} setIsUpdate={setIsUpdate}/></div>
            })
            : "loading"}
        </div>
    );
}

export default Index;

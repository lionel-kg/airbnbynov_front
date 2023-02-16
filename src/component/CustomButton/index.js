import React from 'react';
import styles from "./index.module.scss";

const Index = (props) => {
    const {text, type, onClick, classes} = props; 
    return (
        <>
            <button  
                type={type}
                className={classes}
                onClick={onClick}
                >
                {text}
            </button>
        </>
       
    );
}

export default Index;

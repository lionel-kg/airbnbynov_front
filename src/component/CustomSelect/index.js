import React from 'react';
import styles from "./index.module.scss";

const Index = (props) => {
    const {  
        classes,
        id,
        name,
        defaultValue,
        label,
        handleChange,
        options
    } = props

    return (
        <div className={styles.input_wrapper}>
            <label>{label}</label>
            <select 
                className={classes} 
                id={id} 
                name={name} 
                onChange={handleChange}
                defaultValue={defaultValue}
                >
                    <option value={""} selected={true} >vide</option>
                {options.map((option)=> {
                    return <option value={option._id}>{option.title}</option>
                })}
            </select>
        </div>
    );
}

export default Index;

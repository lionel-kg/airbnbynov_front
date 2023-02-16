import React from 'react';
import styles from "./index.module.scss";


const Input = (props) => {
    const {
        type,
        classes,
        id,
        name,
        placeHolder,
        value,
        handleChange,
        defaultValue,
        required,
        label
    } = props

    return (
        <div className={styles.input_wrapper}>
            <label>{label}</label>
            <input 
                type={type}
                className={classes} 
                id={id} 
                name={name} 
                placeholder={placeHolder} 
                onChange={handleChange} 
                defaultValue={defaultValue}
                value={value}
                required={required} 
                >
            </input>
        </div>
      
    );
}

export default Input;

import React from 'react';
import styles from "./index.module.scss";


const Input = (props) => {
    const {
        type,
        classes,
        customWrapper,
        id,
        name,
        placeHolder,
        value,
        handleChange,
        defaultValue,
        required,
        label,
        multiple,
        step,
        accept,
        ref
    } = props

    return (
        <div className={customWrapper? customWrapper : styles.input_wrapper}>
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
                step={step}
                multiple={multiple}
                accept={accept}
                required={required} 
                ref={ref}
                >
            </input>
        </div>
      
    );
}

export default Input;

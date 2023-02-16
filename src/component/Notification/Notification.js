import React from 'react';
import styles from "./index.module.scss";

const Index = (props) => {
    return (
        <div className={`${styles.notification} ${styles[props.type]}`}>
        <p>
                {props.message}
            </p>
        </div>
    );
}

export default Index;
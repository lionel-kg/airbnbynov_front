import React from 'react';
import styles from "./index.module.scss";


const Index = (props) => {
    return (
        <div className={styles.title_page}>
      <h1>{props.title}</h1>
    </div>
    );
}

export default Index;

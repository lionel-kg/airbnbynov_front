import React from 'react';
import styles from "./index.module.scss";
import TitlePage from "../../component/TitlePage";
import { CloseOutlined } from '@mui/icons-material';

const Modal = (props) => {
    const {show, title,children,setShow} = props ;
    
    const closeModal = () => {
        if(show === true){setShow(false);}
    }

    return (
        <div className={styles.page_wrapper}>
        <div className={`${styles.page_overlay}`}>
            <div className={`${styles.page_modal}`}>
                <div className={styles.container}>
                    <div className={styles.container_title}>
                        <TitlePage title={title}  />
                    </div>
                    <div className={styles.container_close} >
                        <CloseOutlined onClick={()=>{closeModal()}}/>
                    </div>
                </div>
                {children} 
            </div>
        </div>
        </div>
    );
}

export default Modal;

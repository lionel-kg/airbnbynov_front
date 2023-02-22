import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import { React, useState } from "react";
import styles from "./index.module.scss";

const Index = (props) => {
    const { imgs } = props;
    const [slideIndex, setSlideIndex] = useState(0);

    const handleSlideIndex = (addOne = true) => {
        const num = addOne === true ? 1 : -1;
        let newSlideIndex = slideIndex + num;
        if (newSlideIndex < 0) {
            newSlideIndex = imgs.length - 1;
        }
        if (newSlideIndex > imgs.length - 1) {
            newSlideIndex = 0;
        }
        setSlideIndex(newSlideIndex);
    };

    const getImgStyle = (key) => {
        const pourcentage = (key - slideIndex) * 100;
        const keySlideSame = key === slideIndex;
        return {
            position: keySlideSame ? "relative" : "absolute",
            transform: `translate3d(${pourcentage}%, 0px, 0px)`,
            transition: "all 450ms ease-out 0s",
        };
    };

    return (
        <>
            <div className={styles.carouselContent}>
                {imgs?.map((img, key) => {
                    return <img key={"img-" + key} src={img} style={{ ...getImgStyle(key) }} />;
                })}
            </div>
            {imgs.length > 1 ? 
            <>
                <a className={styles.prev} onClick={(e) => handleSlideIndex(false)}>
                    <ArrowBackRounded />
                </a>
                <a className={styles.next} onClick={(e) => handleSlideIndex(true)}>
                    <ArrowForwardRounded />
                </a>
            </> : null}
            
        </>
    );
};

export default Index;
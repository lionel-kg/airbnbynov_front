import { ArrowBack, ArrowBackRounded, ArrowForward, ArrowForwardRounded } from '@mui/icons-material';
import {React, useEffect, useState, useRef} from 'react';
import styles from "./index.module.scss";

const Index = (props) => {
    const {imgs} = props;
    const imgSelect = useRef(null)
    const [slideIndex, setSlideIndex] = useState(1);
    
    // useEffect(()=>{
    //     console.log(imgs);
    // },[])

    function plusSlides(n) {
        showSlides(setSlideIndex(slideIndex + n));
      }

    const showSlides = (n) => {
        let i;
        let currentSlider = imgSelect;
        if(currentSlider) {
            //currentSlider.current.style.transform = "translate3d(100%, 0px, 0px)";
        }
        //let dots = document.getElementsByClassName("dot");
        if (n > imgs.length) {setSlideIndex(1)}
        if (n < 1) {setSlideIndex(imgs.length)}
        /*for (i = 0; i < imgs.length; i++) {
          slides[i].style.display = "none";
        }*/
        /*for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }*/
        //currentSlider.current.style.display = "block";
        //dots[slideIndex-1].className += " active";
      
    }

    return (
    <>
        <div className={styles.slideshow_container}>
            {imgs?.map((img,key)=>{
                return   (
                <div id={key} name={img+key} className={styles.mySlides+" "+styles.fade} key={key} ref={imgSelect}>
                    <img src={img}/>
                </div>)
            })

            }
        </div>
        <a className={styles.prev} onClick={()=> {plusSlides(-1)}}><ArrowBackRounded /></a>
        <a className={styles.next} onClick={()=> { plusSlides(1)}}><ArrowForwardRounded /></a>       
    </>
       
    );
}

export default Index;

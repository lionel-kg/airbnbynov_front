import { Star } from '@mui/icons-material';
import React, {useState,useEffect, useContext} from 'react';
import styles from "./index.module.scss";
import DateRangePickerField from '../DateRangePicker';
import CustomSelect from "../CustomSelect/index";
import CustomButton from "../CustomButton/index";
import bookingService from '../../service/booking.service';
import userContext from "../../context/UserContext";

const Index = ( props) => {
    const {place} = props;
    const {user, token} = useContext(userContext);
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [option, setOption] = useState([]);
    const [value, setValue] = useState({});
    const [nbTraveler, setNbTraveler] = useState(1);
    const [nbNight, setNbNight] = useState(1);

    useEffect(()=> {
        let newOption = [];
         for (let index = 0; index < place.capacity; index++) {
            newOption.push({_id:index , title: index});
        }
        setOption(newOption);
    },[])

    useEffect(() => {
        let newValue = {...value};
        newValue.place = place._id;
        if(dateStart !== null && dateEnd !== null) {
            newValue.dateStart = dateStart;
            newValue.dateEnd = dateEnd;
            setNbNight(dateEnd.diff(dateStart,'days'))
        }
        if (user !== null && place.owner !== null)
        {   
            newValue.owner = place.owner;
        }
        
        
        setValue(newValue)
    }, [dateStart,dateEnd,nbTraveler]);

    const handleChangeInput = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
      }
    const displayPrice = () => {
        return <>
            {place.pricing.perDay*nbNight}
        </>
    }
    const submit = () => {
        bookingService.createBooking(value,token)
        console.log(value);
    }

    return (
        <div className={styles.wrapper_sticky}>
            <div className={styles.container_card}>
                <div className={styles.reminde_info}>
                    <p>{place.pricing.perDay} € par nuit</p>
                    <div className={styles.container_rating_comment}>
                        <div className={styles.rating}>
                            <Star /> <p>4,89</p>
                        </div>
                        <p>.</p>
                        <div>
                            <p>150 commentaires</p>
                        </div>
                    </div>

                </div>
                <div className={styles.calendar}>
                    <DateRangePickerField 
                        dateStart={dateStart}
                        setDateStart={setDateStart}
                        dateEnd={dateEnd}
                        setDateEnd={setDateEnd}
                    />
                    <CustomSelect defaultValue={1} name="nbTraveler" options={option} handleChange={(e)=>{handleChangeInput(e)}} classes={styles.select}/>
                </div>
                <CustomButton type="submit" classes={styles.btn_booking} text="Reserver" onClick={(e)=>{submit();}}/>
                <div className={styles.text}>Aucun montant ne vous sera débité pour le moment</div>
                <div className={styles.price}>
                    <div className={styles.calc}>
                        {place.pricing.perDay} € x {nbNight} nuits
                    </div>
                    <div>
                        {displayPrice()}
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Index;

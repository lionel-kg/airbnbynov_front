import React, { useContext, useEffect, useState } from 'react';
import styles from "./index.module.scss"

import PoolIcon from '@mui/icons-material/Pool';
import { Agriculture, Apartment, ArrowBackRounded, ArrowForwardRounded, Castle, DownhillSkiing, Houseboat, HouseSiding, LocalFireDepartment, TuneSharp } from '@mui/icons-material';
import CustomButton from "../CustomButton/index"
import CustomSelect from "../CustomSelect/index"
import { useRouter } from 'next/router';
import Modal from '../Modal/Modal';
import Input from '../Input';
import typePlaceService from '../../service/typePlace.service';


const preventDefault = f => e => {
    e.preventDefault()
    f(e)
  }

const index = () => {
    
    const [openModal, setOpenModal] = useState(false);
    const [typePlaces, setTypePlaces] = useState({});
    const [value, setValue] = useState({});
    const router = useRouter();
    const [capacityDefault, setCapacityDefault] = useState({
        min: 0,
        max: 50
      });
      const [priceDefault, setPriceDefault] = useState({
        min: 0,
        max: 50
      });
    



    const handleSubmit = preventDefault(() => {
        window.history.replaceState({ ...window.history.state, as: path, url: path }, '', path);
    
      })

    const handleChangeInput = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
      }
    
      useEffect(() => {
        typePlaceService.getTypePlaces()
        .then((res)=>{
          setTypePlaces(res.data);
        })
      }, []);
    
      const applyFilter = () => {
        if(value !== undefined && value.length !== 0){
            Object.entries(value).forEach(([key,val])=>{
            router.query[key] = val;
          })
          router.push(
                router
          );
        }
        setOpenModal(false);
      }

  return (
    <div className={styles.slider_icons}>
        <div className={styles.container_icons}>
            <PoolIcon/>
            <p>Piscine</p>
        </div>
        <div className={styles.container_icons}>
            <DownhillSkiing/>
            <p>Au pied des pistes</p>
        </div>
        <div className={styles.container_icons}>
            <Castle/>
            <p>Châteaux</p>
        </div>
        <div className={styles.container_icons}>
            <Agriculture/>
            <p>fermes</p>
        </div>
        <div className={styles.container_icons}>
            <HouseSiding/>
            <p>Cabanes</p>
        </div>
        <div className={styles.container_icons}>
            <Apartment/>
            <p>Appartement</p>
        </div>
        <div className={styles.container_icons}>
            <LocalFireDepartment/>
            <p>Tendance</p>
        </div>
        <div className={styles.container_icons}>
            <Houseboat/>
            <p>Bateaux</p>
        </div>
        <div className={styles.filter} onClick={()=>{setOpenModal(!openModal)}}>
        <CustomButton classes={styles.btnFilter} 
        text={
            <>
                <div className={styles.container} >
                <TuneSharp className={styles.icons}  />
                <p>Filtres</p>
                </div>
            </>}
        />
        </div>
        { openModal ?
            <Modal show={openModal} setShow={setOpenModal} title="Filtres">
                <form method='get' onSubmit={handleSubmit}>
                    <div className={styles.filterContainer}>
                        <Input name="price_min" classes="form_input" type="text" label="prix minimum" defaultValue={router.query.price_min?router.query.price_min : priceDefault.min}  handleChange={(e) => handleChangeInput(e)}/>
                        <Input name="price_max" classes="form_input" type="text"  label="prix maximum"  defaultValue={router.query.price_max?router.query.price_max : priceDefault.max}  handleChange={(e) => handleChangeInput(e)}/>                     
                    </div>
                    <div className={styles.filterContainer}>
                        <Input name="capacity_min" classes="form_input" type="text" label="capacité minimum" defaultValue={router.query.capacity_min ? router.query.capacity_min : capacityDefault.min}  handleChange={(e) => handleChangeInput(e)}/>
                        <Input name="capacity_max" classes="form_input" type="text"  label="capacité maximum"  defaultValue={router.query.capacity_max ? router.query.capacity_max : capacityDefault.max} handleChange={(e) => handleChangeInput(e)}/>                     
                    </div>
                    <div>
                        <CustomSelect defaultValue={router.query.type} name="type" options={typePlaces} handleChange={(e)=>{handleChangeInput(e)}} classes={styles.select}/>
                    </div>
                    <CustomButton type="submit" classes="btn btn_color_customRed btn_full" text="Afficher" onClick={(e)=>{applyFilter();}}/>
                </form>
            </Modal> : null
        }
    </div>)

}

export default index
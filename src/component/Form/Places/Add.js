import React, { useContext, useEffect, useState } from 'react';
import styles from "./index.module.scss"
import Input from '../../Input';
import CustomSelect from "../../CustomSelect/index";
import CustomButton from "../../CustomButton/index";
import { useRouter } from 'next/router';
import typePlaceService from '../../../service/typePlace.service';
import UploadField from "../../Upload/index"
import { getDownloadURL, uploadBytes,uploadBytesResumable } from "firebase/storage";
import {fireStorage} from "../../../FireBase/initFirebase";
import UserContext from '../../../context/UserContext';
import AutoComplete from '../../AutoComplete';
import addressTool from '../../../tools/address';
import placeService from '../../../service/place.service';



const add = () => {
    const [typePlaces, setTypePlaces] = useState({});
    const {user,token} = useContext(UserContext);
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedImages, setSelectedImages] = useState([]);
    const [url, setUrl] = useState([]);

    // const [path, setPath] = useState("");
    // const [capacityDefault, setCapacityDefault] = useState({
    //   min: 0,
    //   max: 50
    // });
    // const [priceDefault, setPriceDefault] = useState({
    //   min: 0,
    //   max: 50
    // });
    const [value, setValue] = useState({});
    const router = useRouter();

  
    // const handleParam = setValue => e => setValue(e.target.value)
  
    // const handleSubmit = preventDefault(() => {
    //   window.history.replaceState({ ...window.history.state, as: path, url: path }, '', path);
  
    // })
  
    const handleChangeInput = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleChangePrice = (e) => {
        let newPrice = {
            perDay: e.target.value
        }
        setValue({ ...value, [e.target.name]: newPrice })
      }
  
    useEffect(() => {
      typePlaceService.getTypePlaces()
      .then((res)=>{
        setTypePlaces(res.data);
        setLoading(false)
      })
    }, []);

    

    const uploadFiles = async (filesList,newValue) => {
        const files = [...filesList]
        const promises = []
        let newUrl = [];
        let newNewValue = {...newValue}
        files.map((file) => {
            console.log('loop');
            const storageRef = fireStorage.ref( `files/${file.name}`);

            const uploadTask = uploadBytesResumable(storageRef, file);
            promises.push(uploadTask)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    
                },
                (error) => console.log(error),
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        newUrl.push(downloadURLs);
    
                    });
                }
            );


        })
        Promise.all(promises)
            .then(() => /*alert('All images uploaded')*/{console.log(newUrl); newNewValue.image = newUrl }).finally(()=>{
                console.log(newNewValue.image);
                placeService.createPlace(newNewValue,token);
            })

    };


    useEffect(()=>{
        
    },[address])
    
  
    const submit = () => {
        let newValue = {...value};
        if(address !== undefined && loading !== true){
                     //newValue.address =addressTool.createAddress(address);
                      value.address = addressTool.createAddress(address);
        }
        uploadFiles(selectedImages,newValue).then(()=>{
             
               
        }).finally(()=>{ //newValue.user = user._id; 
            console.log(newValue.image);
        })
    }
  

  return (
    <div>
        {loading === false?
        <>
            <div>
                <Input name="title" classes="form_input" type="text" label="titre" defaultValue={""}  handleChange={(e) => handleChangeInput(e)}/>
                <Input name="pricing" classes="form_input" type="text"  label="prix par jour"  defaultValue={""}  handleChange={(e) => handleChangePrice(e)}/>                     
                <Input name="capacity" classes="form_input" type="text" label="capacité" defaultValue={""}  handleChange={(e) => handleChangeInput(e)}/>
                <Input name="description" type="textarea"  label="description"  defaultValue={""} handleChange={(e) => handleChangeInput(e)}/>      
                <UploadField handleChange={(e) => { setSelectedImages(e.target.files);}} />              
                <AutoComplete setAddress={setAddress}/>           
                <div>
                        <CustomSelect name="type" options={typePlaces} handleChange={(e)=>{handleChangeInput(e)}} classes={styles.select}/>
                </div>
            </div>
            <CustomButton type="submit" classes="btn btn_color-black btn_full" text="Afficher" onClick={(e)=>{submit();}}/>
        </> : "loading"
        
        }
    </div>

  )
}

export default add
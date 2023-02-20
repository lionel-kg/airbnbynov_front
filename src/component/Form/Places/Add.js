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



const add = () => {
    const [typePlaces, setTypePlaces] = useState({});
    const {user} = useContext(UserContext);

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
    const [value, setValue] = useState({
        user:null
    });
    const router = useRouter();

  
    // const handleParam = setValue => e => setValue(e.target.value)
  
    // const handleSubmit = preventDefault(() => {
    //   window.history.replaceState({ ...window.history.state, as: path, url: path }, '', path);
  
    // })
  
    const handleChangeInput = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value })
    }
  
    useEffect(() => {
      typePlaceService.getTypePlaces()
      .then((res)=>{
        setTypePlaces(res.data);
        setLoading(false)
      })
    }, []);

    

    const uploadFiles = async (filesList) => {
        const files = [...filesList]
        const promises = []
        files.map((file) => {
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
                        setUrl(prevState => [...prevState, downloadURLs])
                        console.log("File available at", downloadURLs);
                    });
                }
            );


        })
        Promise.all(promises)
            .then(() => {alert('All images uploaded')})
            .then(err => console.log(err))

    };

    useEffect(() => {
        if(value !== undefined && value.length !== 0){
            value.user = user._id;
            value.image = [url];
        }
        console.log(value)
    }, [url])
    
  
    const submit = () => {
        uploadFiles(selectedImages).then(()=>{
            console.log(user)
            if(user !== undefined && user !== null ) {
                
                
            }}).finally(()=>{if(value !== undefined && value.length !== 0){
            console.log(value)
        }})
    }
  

  return (
    <div>
        {loading === false?
        <>
            <div>
                <Input name="title" classes="form_input" type="text" label="titre" defaultValue={""}  handleChange={(e) => handleChangeInput(e)}/>
                <Input name="price" classes="form_input" type="text"  label="prix par jour"  defaultValue={""}  handleChange={(e) => handleChangeInput(e)}/>                     
                <Input name="capacity" classes="form_input" type="text" label="capacité" defaultValue={""}  handleChange={(e) => handleChangeInput(e)}/>
                <Input name="description" type="textarea"  label="description"  defaultValue={""} handleChange={(e) => handleChangeInput(e)}/>      
                <UploadField handleChange={(e) => { handleChangeInput(e); setSelectedImages(e.target.files);}} />              
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
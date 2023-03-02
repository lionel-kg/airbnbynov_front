import {React, useEffect, useState, useContext} from 'react';
import { uuid } from 'uuidv4';
import styles from "./index.module.scss"
import Input from '../../Input';
import CustomSelect from "../../CustomSelect/index";
import CustomButton from "../../CustomButton/index";
import { useRouter } from 'next/router';
import typePlaceService from '../../../service/typePlace.service';
import UploadField from "../../Upload/index"
import { getDownloadURL, uploadBytes,uploadBytesResumable, getStorage, ref } from "firebase/storage";
import {fireStorage} from "../../../FireBase/initFirebase";
import {userContext} from '../../../context/UserContext';
import AutoComplete from '../../AutoComplete';
import addressTool from '../../../tools/address';
import placeService from '../../../service/place.service';
import { resolve } from 'styled-jsx/css';
import { checkFormField } from '../../../tools/formField';



const add = () => {
    const [typePlaces, setTypePlaces] = useState({});
    const { state: globalState } = useContext(userContext);
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedImages, setSelectedImages] = useState([]);
    const [url, setUrl] = useState([]);
    const [progress, setProgress] = useState(0);
    const [trySend, setTrySend] = useState(false);
    const [formField, setFormField] = useState(["title","pricing","description","image","type","address"])

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


    const uploadFiles = (filesList) => {
        const folderName = uuid();
        const files = [...filesList];
        let newUrl = [];
        files.map((file) => {
            let extension = "png";
            if(file.type === "image/jpg"|| file.type === "image/jpeg") {
                extension = "jpg";
            }
            const fileName = uuid() + "." + extension;
            const storageRef = fireStorage.ref( `images/${folderName}/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setProgress((snapshot.bytesTransferred/ snapshot.totalBytes) * 100);
                },
                (error) => console.log(error),
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        newUrl.push(downloadURLs);
                        setUrl((prev) => {
                            let a =[...prev];
                            a.push(downloadURLs);
                            return a;
                        });
                    });
                }
            );
        })
        return new Promise((resolve, reject) => {
            resolve();
        })
    };


    useEffect(() => {
        
        const urlLength = url.length;
        const selectedImagesLength = Object.keys(selectedImages).length;
        
        if (trySend === true && progress === 100 && Object.keys(value).length !== 0 && urlLength === selectedImagesLength) {
            let newValue = {...value};
            if(Object.keys(address).length > 0  && loading !== true){
                newValue.address = addressTool.createAddress(address);
            }
            newValue.image = url;
            //checkFormField(formField,newValue);
            setTrySend(false);
            placeService.createPlace(newValue,globalState.user.token).then(()=> {
                router.push("/profil");
            });
        }
    }, [progress, trySend, value, url, selectedImages]);
  
    const submit = () => {
        setTrySend(true);
        let newValue = {...value};
        return uploadFiles(selectedImages)
        .then((imageUrl)=>{
            newValue.image = imageUrl;
            //placeService.createPlace(newValue,token);
        }).catch((err)=> {
            console.log(err);
        });
    }
  

  return (
    <div>
        {loading === false?
        <>
            <div>
                <Input name="title" classes="form_input" type="text" label="titre" defaultValue={""}  handleChange={(e) => handleChangeInput(e)}/>
                <Input name="pricing" classes="form_input" type="number"  step="0.01"  label="prix par jour"  defaultValue={""}  handleChange={(e) => handleChangePrice(e)}/>                     
                <Input name="capacity" classes="form_input" type="number" label="capacité" defaultValue={""}  handleChange={(e) => handleChangeInput(e)}/>
                <Input name="description" type="textarea"  label="description"  defaultValue={""} handleChange={(e) => handleChangeInput(e)}/>      
                <UploadField handleChange={(e) => { setSelectedImages(e.target.files);}} />              
                <AutoComplete setAddress={setAddress}/>           
                <div>
                        <CustomSelect name="type" options={typePlaces} handleChange={(e)=>{handleChangeInput(e)}} classes={styles.select}/>
                </div>
            </div>
            <CustomButton type="submit" classes="btn btn_color_customRed btn_full" text="Ajouter" onClick={(e)=>{submit();}}/>
        </> : "loading"
        
        }
    </div>

  )
}

export default add
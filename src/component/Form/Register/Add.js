import {React, useState, useEffect, useContext} from 'react';
import CustomButton from "../../CustomButton/index";
import TitlePage from "../../TitlePage/index";
import Input from "../../Input/index";
import authService from '../../../service/auth.service';
import styles from "./index.module.scss";
import { useRouter } from 'next/router';
import { userContext } from '../../../context/UserContext';

const Register = (props) => {
    const {setOpenRegisterModal} = props;
    const {dispatch} = useContext(userContext);
    const [value, setValue] = useState({
      firstName:"",
      lastName:"",
      email:"",
      password:""
    });
    const [withRoleOwner, setwithRoleOwner] = useState(false);
    const router = useRouter();

    const handleChangeInput = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value })
    }
        
    useEffect(() => {
        setValue({...value, UserType: withRoleOwner});
    }, [withRoleOwner]);

    const submitRegister = (e) => {
        authService.register(value)
        .then((res) => {
          localStorage.setItem("token",res.data.token);
          dispatch({ type: "login", payload: res.data.user });
        })        
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        }).finally(()=>{
          if(setOpenRegisterModal !== undefined && setOpenRegisterModal !== null){
            setOpenRegisterModal(false);
          }
          router.push("/home");
        })
        e.preventDefault();
      }


      
    return (
        <form className='form_group' method='POST' onSubmit={(e) => submitRegister(e)}>
            <div className='center'>
                <TitlePage title="Register"/>
            </div>
            <div className={styles.selectRole}>
                <h1 onClick={()=>{setwithRoleOwner(false)}} className={withRoleOwner === false ? styles.selected : null}>Voyageur</h1>
                <h1 onClick={()=>{setwithRoleOwner(true)}} className={withRoleOwner === true ? styles.selected : null}>Propriétaire</h1>
            </div>
            <Input name="firstName" classes="form_input" type="text" placeHolder="doe" label="firstname" value={value.firstName} handleChange={(e) => handleChangeInput(e)}/> 
            <Input name="lastName" classes="form_input" type="text" placeHolder="johns" label="lastname" value={value.lastName} handleChange={(e) => handleChangeInput(e)}/>
            <Input name="email" classes="form_input" type="text" placeHolder="john.doe@test.com" label="email" value={value.email} handleChange={(e) => handleChangeInput(e)}/>
            <Input name="password" classes="form_input" type="password" placeHolder="******" label="password" value={value.password} handleChange={(e) => handleChangeInput(e)}/>
            <CustomButton type="submit" classes="btn btn_color_customRed" text="Register" />
        </form>
    );
}

export default Register;

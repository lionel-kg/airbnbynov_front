import {React, useState, useEffect, useContext} from 'react';
import CustomButton from "../../CustomButton/index";
import TitlePage from "../../TitlePage/index";
import Input from "../../Input/index";
import authService from '../../../service/auth.service';
import { useRouter } from 'next/router';
import Notification from "../../../component/Notification/Notification";
import {userContext} from "../../../context/UserContext";


const Index = (props) => {
    const {setOpenLoginModal} = props;
    const router = useRouter(); 
    const [value, setValue] = useState({
      email:"",
      password:""
    });
    const [type, setType] = useState(null);
    const [message, setMessage] = useState(null);
    const { dispatch } = useContext(userContext);



    const handleChangeInput = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value })
    }
        
    const submitLogin = (e) => {
        authService.login(value)
        .then((res) => {
          localStorage.setItem("token",res.data.token)
          dispatch({ type: "login", payload: res.data.user });
          setType("success");
          setMessage("login validé");
          if(setOpenLoginModal !== undefined && setOpenLoginModal !== null) {
            setOpenLoginModal(false);
          }
          setTimeout(()=>{
            router.push("/profil")
          },3000)
        })
        .catch(error => {
          // Handle error.
          console.log(error);
          setType("error");
          setMessage(error.response.data.message);
        });
        e.preventDefault();        
      }

    return (
        <form className='form_group' method='POST' onSubmit={(e) => submitLogin(e)}>
            <div className='center'>
                <TitlePage title="Se connecter"/>
            </div>
            <Input name="email" classes="form_input" type="text" placeHolder="john.doe@test.com" label="email" value={value.email} handleChange={(e) => handleChangeInput(e)}/>
            <Input name="password" classes="form_input" type="password" placeHolder="******" label="password" value={value.password} handleChange={(e) => handleChangeInput(e)}/>
            <CustomButton type="submit" classes="btn btn_color_customRed" text="Se connecter" />
            {type != null? <Notification type={type} message={message}/>:null}
        </form>
    );
}

export default Index;

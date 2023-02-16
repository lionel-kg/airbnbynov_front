import {React, use, useState} from 'react';
import CustomButton from "../../component/CustomButton";
import TitlePage from "../../component/TitlePage";
import Input from "../../component/Input";
import authService from '../../service/auth.service';

const Register = () => {
    const [value, setValue] = useState({
      firstName:"",
      lastName:"",
      email:"",
      password:""
    });

    const handleChangeInput = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value })
    }
        

    const submitRegister = (e) => {
        authService.register(value)
        .then((res) => console.log(res))        
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
        e.preventDefault();
      }
      
    return (
        <form className='form_group' method='POST' onSubmit={(e) => submitRegister(e)}>
            <div className='center'>
                <TitlePage title="Register"/>
            </div>
            <Input name="firstName" classes="form_input" type="text" placeHolder="doe" label="firstname" value={value.firstName} handleChange={(e) => handleChangeInput(e)}/> 
            <Input name="lastName" classes="form_input" type="text" placeHolder="johns" label="lastname" value={value.lastName} handleChange={(e) => handleChangeInput(e)}/>
            <Input name="email" classes="form_input" type="text" placeHolder="john.doe@test.com" label="email" value={value.email} handleChange={(e) => handleChangeInput(e)}/>
            <Input name="password" classes="form_input" type="password" placeHolder="******" label="password" value={value.password} handleChange={(e) => handleChangeInput(e)}/>
            <CustomButton type="submit" classes="btn btn_color-black" text="Register" />
        </form>
    );
}

export default Register;

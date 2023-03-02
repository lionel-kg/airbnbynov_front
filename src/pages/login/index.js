import {React, useState, useContext} from 'react';
import CustomButton from "../../component/CustomButton";
import TitlePage from "../../component/TitlePage";
import Input from "../../component/Input";
import authService from '../../service/auth.service';
import { useRouter } from 'next/router';
import Notification from "../../component/Notification/Notification"
import {userContext} from "../../context/UserContext";
import LoginForm from "../../component/Form/Login/index";

const Login = () => {
    return (
        <LoginForm />
    );
}

export default Login;

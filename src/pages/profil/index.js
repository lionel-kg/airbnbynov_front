import React, { useEffect,useState, useContext } from 'react';
import userService from '../../service/user.service';
import profilPicture from "../../../public/person.png";
import profilWaf from "../../../public/waf.png";
import TitlePage from "../../component/TitlePage/index";
import ProfilNavigator from "../../component/ProfilNavigator/index"
import CustomButton from "../../component/CustomButton/index";
import Modal from '../../component/Modal/Modal';
import Input from '../../component/Input';
import WithAuth from '../../HOC/withAuth';
import {userContext} from '../../context/UserContext';

const Index = () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState()
    const { state: globalState,dispatch } = useContext(userContext);
    const handleChangeInput = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
      }

    useEffect(() => {
        setValue({
            firstName: globalState.user?.firstname,
            lastName: globalState.user?.lastname,
            email: globalState.user?.email
        })
    }, [globalState])

    const update = () => {
        var token = localStorage.getItem("token");

        userService.UpdateMe(token,value)
        .then((res)=>{
            dispatch({ type: "updateUser", payload: res.data });
            setShow(false);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const openModal = () => {
        setShow(true);
    }

    return (
        <div className='page_wrapper'>
            <div className="profil_container">
                <ProfilNavigator />
                <div className='container_profil_info'>
                    { globalState.user ? 
                    <>
                        <img src={profilWaf.src}/>
                            <div className='box_info_update'>
                                <div>
                                    <div>
                                        nom:
                                        <span>{" "+globalState.user.firstname}</span>
                                    </div>
                                    <div>
                                        prenom:
                                        <span> {" "+globalState.user.lastname}</span>
                                    </div>
                                    <div>
                                        email: 
                                        <span> {" "+globalState.user.email}</span>
                                    </div>
                                </div>
                                <div>
                                    <CustomButton text="Modifier" classes="btn btn_color-black" onClick={()=>{openModal()}} />
                                </div>
                            </div>
                        </> : "loading"
                       
                    }
                    
                </div>
            </div>
            
            

                        { show === true ?
                            <Modal show={show} setShow={setShow} title="Modifier"> 
                                <Input name="firstName" classes="form_input" type="text" label="firstname" defaultValue={globalState.user.firstname} value={value.firstName} handleChange={(e) => handleChangeInput(e)}/>
                                <Input name="lastName" classes="form_input" type="text"  label="lastname"  defaultValue={globalState.user.lastname} value={value.lastName} handleChange={(e) => handleChangeInput(e)}/>
                                <Input name="email" classes="form_input" type="text"  label="email" defaultValue={globalState.user.email} value={value.email} handleChange={(e) => handleChangeInput(e)}/>
                                <CustomButton type="submit" classes="btn btn_color-black" text="update" onClick={()=>{update();}} />
                            </Modal>
                        
                             : <></>
                        }
        </div>
    );
}

export default WithAuth(Index);

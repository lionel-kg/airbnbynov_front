import React, { useEffect,useState, useContext } from 'react';
import userService from '../../service/user.service';
import profilPicture from "../../../public/person.png";
import profilWaf from "../../../public/waf.png";
import TitlePage from "../../component/TitlePage/index";
import ProfilNavigator from "../../component/ProfilNavigator/index"
import CustomButton from "../../component/CustomButton/index";
import Modal from '../../component/Modal/Modal';
import Input from '../../component/Input';
import UserContext from '../../context/UserContext';
import WithAuth from '../../HOC/withAuth';




const Index = () => {
    //const [user, setUser] = useState({});
    const {user} = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState()
    //const [token, setToken] = useState(null)
    const handleChangeInput = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
      }

    useEffect(() => {
        setValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })
       /* var token = localStorage.getItem("token");
        userService.getMe(token)
        .then((res) => setUser(res.data))
        .catch((err)=>{console.log(err)})
        */
    }, [user])

    const update = () => {
        var token = localStorage.getItem("token");

        userService.UpdateMe(token,value)
        .then((res)=>{
            setUser(res.data)
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
                    <img src={profilWaf.src}/>
                    <div className='box_info_update'>
                        <div>
                            <div>
                                nom:
                                <span>{" "+user?.firstName}</span>
                            </div>
                            <div>
                                prenom:
                                <span> {" "+user?.lastName}</span>
                            </div>
                            <div>
                                email: 
                                <span> {" "+user?.email}</span>
                            </div>
                        </div>
                        <div>
                            <CustomButton text="Modifier" classes="btn btn_color-black" onClick={()=>{openModal()}} />
                        </div>
                    </div>
                </div>
            </div>
            
            

                        { show === true ?
                            <Modal show={show} setShow={setShow} title="Modifier"> 
                                <Input name="firstName" classes="form_input" type="text" label="firstname" defaultValue={user.firstName} value={value.firstName} handleChange={(e) => handleChangeInput(e)}/>
                                <Input name="lastName" classes="form_input" type="text"  label="lastname"  defaultValue={user.lastName} value={value.lastName} handleChange={(e) => handleChangeInput(e)}/>
                                <Input name="email" classes="form_input" type="text"  label="email" defaultValue={user.email} value={value.email} handleChange={(e) => handleChangeInput(e)}/>
                                <CustomButton type="submit" classes="btn btn_color-black" text="update" onClick={()=>{update();}} />
                            </Modal>
                        
                             : <></>
                        }
        </div>
    );
}

export default WithAuth(Index);

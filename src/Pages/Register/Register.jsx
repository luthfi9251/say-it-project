import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from 'state-pool';
import logo from './2.png'


export default function Register({ url }){
    let navigate = useNavigate()

    const [info, setInfo] = useState("please fill credential above");
    const [username, setUsername] = useState();
    const [pass, setPass] = useState();
    const [cpas, setCpas] = useState();

    const [user, setUser, updateUser] = useGlobalState('user')

    let handleChangeCpas = (e)=>{
        setCpas(e.target.value)
    }
    let handleChangePass = (e)=>{
        setPass(e.target.value)
    }
    let handleChangeUsername = (e)=>{
        setUsername(e.target.value)
    }

    useEffect(()=>{
        if(pass !== cpas){
            setInfo("password didn't match!")
        }else{
            if(cpas){
                setInfo("Approved!")
            }
        }
    },[cpas])

    let handleClickRegister = () =>{
        let body = {
            username: username,
            password: pass
        }
        axios.post(`${url}/api/register`, body)
            .then((res)=>{
                if (res.status === 400) return setInfo(res.msg)
                window.localStorage.setItem('token', res.data.token)
                updateUser(user => {
                    user.username = res.data.username
                    user.auth = res.data.auth
                    user.token = res.data.token
                    user.id = res.data.id
                })
                navigate('/dashboard')
            }).catch(err=>alert("username already exist!"))
    }
    return(
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-evenly flex-wrap" style={{backgroundColor:'#40cbd3'}}>
            <div className="col-11 d-flex align-items-center justify-content-evenly flex-wrap">
                <img src={logo} alt="logo" className="col-10 col-md-4"/>
                <div className="p-4 col-12 col-md-5" style={{backgroundColor:"white", borderRadius:"30px"}}>           
                    <h2>Create an account and <br />then share link to your <br /> friends</h2>
                    <div className="d-flex flex-column my-4">
                        <label htmlFor="username" style={label}>username</label>
                        <input id="username" type="text" name="username" style={input} onChange={handleChangeUsername} required/>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <label htmlFor="pass" style={label}>password</label>
                        <input id="pass" type="password" name="pass" style={input} onChange={handleChangePass}/>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <label htmlFor="cpas" style={label}>confirm password</label>
                        <input id="cpas" type="password" name="cpas" style={input} onChange={handleChangeCpas}/>
                    </div>
                    <button style={button} className="col-5 col-md-3" onClick={handleClickRegister}>Register</button>
                    <p className='text-muted'>{info}</p>
                </div>
            </div>
        </div>
    )
}

const input = {
    borderRadius: '30px',
    border: "none",
    padding: "0 15px",
    height: "30px",
    backgroundColor:"#C4C4C4",
    color:"white"
}
const label = {
    marginLeft: "20px",
    fontSize: "20px"

}
const button = {
    backgroundColor: "#40bcd3",
    borderRadius: "40px",
    border: "none",
    color: "white",
    fontSize: "18px"
}

const buttonC = {
    borderRadius: "40px",
    border: "none",
    color: "white",
    fontSize: "18px"
}
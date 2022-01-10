import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'


export default function Register(){
    const [info, setInfo] = useState("please fill credential above");
    const [username, setUsername] = useState();
    const [pass, setPass] = useState();
    const [cpas, setCpas] = useState();
    const [auth, setAuth] = useState(false)

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
                setInfo("continue")
            }
        }
    },[cpas])

    let handleClickRegister = () =>{
        let body = {
            username: username,
            password: pass
        }
        axios.post('http://localhost:4000/api/register', body)
            .then((res)=>{
                alert(res.data)
            }).catch(err=>alert("username already exist!"))
    }

  return (
      <>
        <div class="modal fade" id="register" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content" style={{borderRadius:"20px"}}>
                    <div class="modal-body">
                        <div className="p-4">
                            
                            <h2>Create an account and <br />then share link to your <br /> friends</h2>
                            <div className="d-flex flex-column my-4">
                                <label htmlFor="username" style={label}>username</label>
                                <input id="username" type="text" name="username" style={input} onChange={handleChangeUsername}/>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <label htmlFor="pass" style={label}>password</label>
                                <input id="pass" type="password" name="pass" style={input} onChange={handleChangePass}/>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <label htmlFor="cpas" style={label}>confirm password</label>
                                <input id="cpas" type="password" name="cpas" style={input} onChange={handleChangeCpas}/>
                            </div>
                            <p>{info}</p>
                            <div className="row">
                                <button type="button" class="btn btn-secondary col-3 offset-5" style={buttonC} data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn col-3 mx-1" data-bs-dismiss="modal" style={button} onClick={handleClickRegister}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}


const input = {
    borderRadius: '30px',
    border: "none",
    padding: "0 15px",
    height: "30px",
    fontSize: "20px",
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
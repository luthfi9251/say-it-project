import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from 'state-pool'
import logo from './2.png'
import axios from 'axios'

export default function Others({url}){
    let [name, setName] = useState()
    let [email, setEmail] = useState()

    let navigate = useNavigate()
    const [user, setUser, updateUser] = useGlobalState('user')

    let handleClick = () => {
        let body = {
            name: name,
            email: email
        }
        axios.post(`${url}/api/registerOther`, body)
            .then((res)=> {
                updateUser(user => {
                    user.username = res.data.username
                    user.auth = res.data.authorize
                    user.token = res.data.accessToken
                    user.id = res.data.id
                })
                navigate(`/send/${res.data.short}`)
            }).catch(err=> alert(err))
    }

    return(
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-evenly flex-wrap" style={{backgroundColor:'#40cbd3'}}>
            <div className="col-11 d-flex align-items-center justify-content-evenly flex-wrap-reverse">
                <div className="p-4 col-12 col-md-5" style={{backgroundColor:"white", borderRadius:"30px"}}>
                <h2>Tell us their e-mail, and <br /> we'll send them your <br /> word</h2>
                    <div className="d-flex flex-column my-4">
                        <label htmlFor="username" style={label}>recipient name</label>
                        <input type="text" name="username" style={input} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <label htmlFor="pass" style={label}>recipient e-mail</label>
                        <input type="text" name="pass" style={input} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="row d-flex justify-content-end">
                        <button type="button" class="btn col-3 mx-1" style={button} onClick={handleClick}>Continue</button>
                    </div>
                </div>
                <img src={logo} alt="logo" className="col-10 col-md-5"/>
            </div>
        </div>
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
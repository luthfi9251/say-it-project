import logo from './2.png';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom' 

export default function Sender({ url }){
    let navigate = useNavigate()
    const { id } = useParams()
    let [username, setUsername] = useState()
    let [idUser, setId] = useState()
    let [email, setEmail] = useState()
    let [text, setText] = useState()

    useEffect(()=>{
        axios.get(`${url}/api/info/${id}`).then((res)=>{
            console.log(res.data)
            setUsername(res.data.username)
            setId(res.data.id)
        }).catch((err)=>alert(err))
    },[])

    let handleEmailChange = (e)=>{
        setEmail(e.target.value)
    }
    let handleTextChange = (e)=>{
        setText(e.target.value)
    }
    let handleSend = () => {
        let body = {
            to: idUser,
            email: email,
            text:text
        }
        axios.post(`${url}/api/message`, body).then(res=>navigate(`/overview/${res.data}`)).catch(err=>alert(err))
    }

    return(
        <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center" id="sender-c">
            <img src={logo} alt="say-it logo" className="col-12 col-md-4"/>
            <div className='d-flex flex-column align-items-center col-12 col-md-8'>
                <h6 style={{color:'white', fontWeight:"bold"}} className='align-self-start'>To : {username}</h6>
                <textarea name="msg" id="msg-s" rows="5" className="col-12" style={{borderRadius:"10px", padding:"10px", border:"none"}} placeholder='type a message' onChange={handleTextChange}></textarea>
                <button id="sender-btn" className='col-4 col-md-2 my-3 align-self-end' onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
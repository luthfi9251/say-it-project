import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from 'state-pool';
import Message from './Component/Message';
import { socket } from '../../service/socket';

export default function Dashboard({url}){
    const navigate = useNavigate()
    const [user, setUser, updateUser] = useGlobalState('user')
    const [isLoading, setLoading] = useState(false)
    const [link, setLink] = useState(`${window.location.origin}/send/${user.id}`)
    const [msg, setMsg] = useState([])
    const [status, setStatus] = useState()
    const [isCopied, setCopied] = useState(false)
    const [email, setEmail] = useState("")
    const [isEmailExist, setEmailExist] = useState(false)
    const [uname, setUname] = useState()

    let handleCopy = () =>{
        navigator.clipboard.writeText(link)
        setCopied(true)
        setTimeout(()=>setCopied(false), 2000)
    }

    let handleSaveEmail = () => {
        let body = {
            id: user.id,
            email: email
        }
        axios.post(`${url}/api/addEmail`, body).then((res)=> setEmailExist(true)).catch(err=> alert(err))
    }

    let handleLogOut = () => {
        updateUser(user=>{
            user.username = ""
            user.auth = false
            user.token = ""
            user.id = ""
        });
        navigate('/',{replace: true})
    }

    useEffect(()=>{
        socket.on("connect", () => {
        });
    },[])

    let handleRefresh = () => {
        let token = window.localStorage.getItem('token')
        let config = {
            headers : {"Authorization": `Bearer ${token}`}
        }
        setLoading(true)
        axios.get(`${url}/api/message`, config).then(res => {
            setUname(res.data.username)
            window.localStorage.setItem('username', res.data.username)
            if(res.data.data.length === 0){
                setLoading(false)
                return setStatus(res.data.msg)}
            setMsg(res.data.data)
            setStatus("you've got "+ res.data.data.length + " messages")
            setLoading(false)
        }).catch(err => navigate('/login', { replace:true }))
    }

    useEffect(()=>{
        let token = window.localStorage.getItem('token')
        let config = {
            headers : {"Authorization": `Bearer ${token}`}
        }
        axios.get(`${url}/api/message`, config).then(res => {
            setLink(`${window.location.origin}/send/${res.data.short}`)
            setUname(res.data.username)
            window.localStorage.setItem('username', res.data.username)
            if(res.data.email){
                setEmail(res.data.email)
                setEmailExist(true)
            }
            if(res.data.data.length === 0){
                 return setStatus(res.data.msg)}
            setMsg(res.data.data)
            setStatus("you've got "+ res.data.data.length + " messages")
        }).catch(err => {
            navigate('/login', { replace:true })
        })
    },[])

    
    return(
        <div className="container-fluid min-vh-100 py-4" style={{backgroundColor:'#40cbd3'}}>
            <div className="container white" style={{paddingTop: "5px"}}>
                <h1 style={h1}>Hello, {uname}</h1>
                <div className='d-flex justify-content-between flex-wrap'>
                    <p style={{color:'white', fontSize:'28px', fontFamily: '"Lobster", arial'}}>{status}</p>
                    <div>
                        <button className='btn btn-danger' id='logout' onClick={handleLogOut}><i className="bi bi-box-arrow-left"></i> LogOut</button>
                    </div>
                </div>
                <div className="col-12 col-md-10 offset-md-1 message">
                    <p>Share this link below to you friends and see what they want to say</p>
                    <input className="form-control" type="text" value={link} readOnly></input>
                    <br />
                    <button type='button' onClick={handleCopy} className='btn' style={{color:'white'}}>{!isCopied ? <i className="bi bi-clipboard"></i> : <i className="bi bi-check2"></i> }  Copy to Clipboard</button>
                </div>
                <div className="col-12 col-md-10 offset-md-1 message">
                    <p>Tell me your e-mail, if you want to get new message notification </p>
                    <input className="form-control" type="email" value={email} placeholder='your e-mail' onChange={(e)=>{setEmail(e.target.value)
                    setEmailExist(false)}}></input>
                    <br />
                    <button type='button' onClick={handleSaveEmail} className='btn' style={{color:'white'}}>{!isEmailExist ? <i className="bi bi-envelope-plus">  </i> : <i className="bi bi-check2"></i> }  Save</button>
                </div>
                <div>
                    {msg.map((obj, i)=>{
                        return(<Message key={i} text={obj.text} msgId={obj._id} date={obj.date} />)
                    })}
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center my-3">
                    <button className="col-5 col-md-3" id="refresh" onClick={handleRefresh}>
                        <span className={isLoading ? "spinner-border spinner-border-sm":"null"} role="status" aria-hidden="true"></span>
                        <span>   Refresh</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

let h1 = {
    fontFamily: '"Lobster", arial',
    fontSize: "60px",
    color: "white"
}
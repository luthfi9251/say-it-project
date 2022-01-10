import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalState } from "state-pool";
import axios from 'axios'
import ScrollableFeed from 'react-scrollable-feed'
import logo from "./3.png"
import MainMessage from './Main.jsx'
import SenderReply from "./Sender";
import ReceiveReply from "./Receiver";
import './ov.css'
import { socket } from "../../../service/socket";

export default function Overview({ url }){
    let input = useRef()
    let scroll = useRef()
    const navigate = useNavigate()
    const [user, setUser, updateUser] = useGlobalState('user')
    const { id } = useParams();
    const [text, setText] = useState()
    const [date, setDate] = useState()
    const [reply, setReply] = useState()
    const [data, setData] = useState([])
    const [username, setUsername] = useState(window.localStorage.getItem('username'))
    
    function tanggal(d){
        let result = new Date(d).toString()
        let date1 = result.split(" ").splice(0,5).join(" ")
        return date1
    }

    useEffect(()=>{
        let token = window.localStorage.getItem('token')
        let config = {
            headers : {"Authorization": `Bearer ${token}`}
        }
        socket.emit("join_room", id)
        axios.get(`${url}/api/infomsg/${id}`, config).then(res=>{
            setText(res.data.text)
            setDate(tanggal(res.data.time))
        }).catch(err=>navigate('/', {replace:true}))
        axios.get(`${url}/api/reply/${id}`).then(res=>{
            if(res.data === 0){
                return setData([])
            }
            setData(res.data)
        })
        return ()=>{
            socket.emit('leave_room',id)
        }
    },[])


    let handleReplyChange = (e) => {
        setReply(e.target.value)
    }

    let handleClick = () =>{
        let newRep = {
            text: reply,
            room: id,
            sender: username,
            date: tanggal(Date.now())
        }
        let body = {
            messageId: id,
            text: reply,
            sender: username
        }
        console.log(username)
        if(reply!==""){
            axios.post(`${url}/api/reply`, body).then(res=>{
                input.current.value = ''
                setData([...data, newRep])
                scroll.current.scrollIntoView()
                socket.emit('msg',newRep)
                setReply("")
            }).catch(err=>alert(err))
        }
    }

    useEffect(()=>{
        socket.off("private_message").on("private_message", dataS =>{
            setData([...data, dataS])
            setTimeout(()=>{
                scroll.current.scrollIntoView()
            }, 500)
        })
    },[socket, data])

    return(
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center flex-column" style={{backgroundColor:"#40cbd6"}}>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <img src={logo} alt="say-it logo" className="col-6 col-md-2"/>
                <div className="col-12 col-md-5 d-flex flex-column" style={{maxHeight: '80vh', overflow:"auto", borderRadius: '10px'}}>
                    <MainMessage text={text} date={date}/>
                    {data ? data.map((obj, i)=>{
                        if(obj.sender === "stranger"){
                            return (<ReceiveReply text={obj.text} key={i} date={tanggal(obj.date)} />)
                        }else{
                            return (<SenderReply text={obj.text} key={i} date={tanggal(obj.date)} send={obj.sender}/>)
                        }
                    }): "no Message Yet"}
                    <div ref={scroll}></div>
                    <div>
                        <input ref={input} type="text" name="msg" id="rpl" placeholder="reply here..." className="col-9 my-3 col-md-10" style={{borderRadius: '10px', border: 'none', padding:'0 20px', height:'30px'}} onChange={handleReplyChange} />
                        <button className="col-3 col-md-2" style={{background:'#2B8CAB', border:'none', color:'white', borderRadius:'10px', height:'30px'}} onClick={handleClick}><i className="bi bi-send"></i> Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
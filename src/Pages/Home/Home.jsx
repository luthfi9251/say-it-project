import React, { useState } from 'react'
import logo from './1.png';
import { useNavigate } from 'react-router-dom'


function Home(){
    let navigate = useNavigate();

    const handleNavigate = (link)=>{
        navigate(link, {replace: false})
    }

    return(
        <div className="vw-100 vh-100" style={{backgroundColor:'#40cbd3'}}>
            <div className="container d-flex align-items-center justify-content-center h-100">
                <div className="d-flex flex-column align-items-center">
                    <img src={logo} alt="logo" className="col-10 col-md-6"/>
                    <div className="my-5 col-6 d-flex flex-column align-items-center">
                        <h4 style={{color:'white', textAlign:'center'}}>who did you write for?</h4>
                        <div className="row col-12 d-flex align-items-center justify-content-between">
                            <button type="button" className="btn btn-light col-12 col-md-5" style={{color:"#40cbd3", fontSize:'1em'}} onClick={()=>handleNavigate("/register")}>Yourself</button>
                            <button type="button" className="btn btn-light col-12 col-md-5 my-2" style={{color:"#40cbd3", fontSize:'1em'}}onClick={()=>handleNavigate("/others")}>Someone else's</button>
                        </div>
                    </div>
                    <div>
                        <h6 style={{color:'white'}}>alredy have an a account? <button style={{background:'none', border:'none', padding:'none', textDecoration:'underline', color:'white'}} onClick={()=>handleNavigate("/login")}>login here</button></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
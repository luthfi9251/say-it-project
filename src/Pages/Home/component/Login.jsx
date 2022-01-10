import React, { useState, useEffect } from 'react'


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

export default function Login(){

  return (
    <div class="modal fade" id="login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content" style={{borderRadius:"20px"}}>
                <div class="modal-body">
                    <div className="p-4">
                        <h2>login to your account</h2>
                        <div className="d-flex flex-column my-4">
                            <label htmlFor="username" style={label}>username/e-mail</label>
                            <input type="text" name="username" style={input}/>
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label htmlFor="pass" style={label}>password</label>
                            <input type="password" name="pass" style={input}/>
                        </div>
                        <div className="row">
                            <button type="button" class="btn btn-secondary col-3 offset-5" style={buttonC} data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn col-3 mx-1" style={button}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

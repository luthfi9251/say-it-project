function ReceiveReply({text, date }){
    return(
        <div className="chat-body col-9 align-self-start">
             <div className="answer left">
                <div className="name">Stranger</div>
                <div className="text">
                  {text}
                  <br />
                  <span style={{fontSize:'10px'}}>{date}</span>
                </div>
              </div>
        </div>
    )
}

export default ReceiveReply 
function SenderReply({ text, date, send }){
  
    return(
        <div className="chat-body col-9 align-self-end">
             <div className="answer right">
                <div className="name">{send}</div>
                <div className="text">
                  {text}
                  <br />
                  <span style={{fontSize:'10px'}}>{date}</span>
                </div>
              </div>
        </div>
    )
}

export default SenderReply 
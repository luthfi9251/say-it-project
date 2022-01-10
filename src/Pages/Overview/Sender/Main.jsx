function MainMessage({ text, date }){
    return(
        <div className="chat-body col-11 align-self-end">
             <div className="answer right">
                <div className="name">You</div>
                <div className="text">
                  {text}
                  <br />
                  <span style={{fontSize:'10px'}}>{date}</span>
                </div>
              </div>
        </div>
    )
}

export default MainMessage 
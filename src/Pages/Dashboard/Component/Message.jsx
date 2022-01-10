import { useNavigate } from "react-router-dom"

export default function Message({ msgId, text, date }){
    let id = msgId
    let navigate = useNavigate()

    function tanggal(d){
        let result = new Date(d).toString()
        let date1 = result.split(" ").splice(0,5).join(" ")
        return date1
    }

    const handleClick = ()=>{
        navigate(`/read/${id}`)
    }

    return(
        <div>
            <div className="col-12 col-md-10 offset-md-1 message">
                <p>{text}</p>
                <p style={{textAlign:"end", fontSize:"12px"}}>{tanggal(date)}</p>
                <button className="btn col-6 col-md-3 offset-md-9 offset-6"style={{color:'white'}} onClick={handleClick}>View Reply</button>
            </div>
        </div>
    )
}

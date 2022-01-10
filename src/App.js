import { Routes, Route, Link } from "react-router-dom";
import { store } from "state-pool";
import './App.css';
import Home from './Pages/Home/Home';
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sender from "./Pages/Sender/Sender";
import Overview from "./Pages/Overview/Sender/Overview";
import ROverview from "./Pages/Overview/Receiver/Overview";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Others from "./Pages/Others/Other";

store.setState("user", { auth: false, id: '', username: '', token: '' })
let url = ""
//change url and socket url for production/develpment
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home url={url}/>} />
        <Route exact path="/dashboard" element={<Dashboard url={url}/>} />
        <Route exact path="/read/:id" element={<ROverview url={url}/>} />
        <Route exact path="/send/:id" element={<Sender url={url}/>} />
        <Route exact path="/overview/:messageId" element={<Overview url={url}/>}/>
        <Route exact path="/register" element={<Register url={url}/>} />
        <Route exact path="/login" element={<Login url={url}/>} />
        <Route exact path="/others" element={<Others url={url}/>} />
      </Routes>
    </div>
  );
}

export default App;

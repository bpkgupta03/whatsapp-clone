import { Avatar, IconButton } from '@material-ui/core';
import {React,useState} from 'react'
import './Chat.css';
import AttachmentRoundedIcon from '@material-ui/icons/AttachmentRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import instance from "./axios";

function Chat({ messages }) {
    const [input,setInput] = useState("");
    const sendMessage=(e)=>{
        e.preventDefault();
        instance.post("/messages/new",{
            "message":input,
            "name":"bhanuk",
            "timestamp":"just",
            "received":true
        });
        setInput("");
    }
    
        return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last Seen at....</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <AttachmentRoundedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>

                </div>

            </div>
            <div className="chat__body">


                {messages.map((message) => (

                    <p className={`chat__message ${message.received && "chat__receiver"}`} >
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp} </span>
                    </p>

                ))}

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                    type="text" 
                     placeholder="Type a message" 
                     value={input}
                     onChange={(e)=> setInput(e.target.value)}
                     />
                    <button type="submit" onClick={sendMessage} >Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat

import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js";
import instance from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    instance.get("/messages/sync")
      .then(response => {
        //console.log(response.data);
        setMessages(response.data);
      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('ad00c1f836649282d17c', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);


  console.log(messages);
  return (


    < div className="app" >
      <div className="app__body">

        <Sidebar />
        <Chat messages={messages} />
      </div>

    </div >
  );
}

export default App;

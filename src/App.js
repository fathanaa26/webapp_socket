import logo from './logo.svg';
import {Manager} from 'socket.io-client'
import './App.css';
import { useEffect, useState } from 'react';

const manager = new Manager("localhost:8880",{
    autoConnect:true,
    forceNew:true,
    transports:['websocket'],
    reconnection:true,
    reconnectionDelay:5000
})

const socket = manager.socket("/")

function App() {
  const [data,setData] = useState();
  const [connected,setConnected] = useState();

  useEffect(()=>{
    socket.on("connect",()=>{
      setConnected(`[${socket.id}] Connected `)
    })

    socket.on("ev",(arg)=>{
      setData(arg.random)
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{connected}</h1>
        <h2>{data}</h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

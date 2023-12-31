import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import history from './history'
import GameMenu from './Components/GameMenu';
import CreateGame from './Components/CreateGame'
import JoinGame from './Components/JoinGame';
import TypeRacer from './Components/TypeRacer';
import Navbar from './Components/Navbar'
import socket from './socketConfig';
import './App.css'

function App() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({_id : "", isOpen : false, players:[], words:[]})
  //gameState is a state and whenver it change , the whole page will re-render
  useEffect(()=>{
    socket.on('updateGame', (game)=>{
      console.log(game);
      setGameState(game);
    })
    return ()=>{
      socket.removeAllListeners();
    }
  }, [])

  useEffect(()=>{
    if(gameState._id !== "")
      navigate(`/game/${gameState._id}`);
  },[gameState._id, navigate]);
  return (  
    <>
      {/* Switch were intially used inplace of Routes */}
      <Navbar />
      <Routes>
        {/* component prop is deprecated in v6, we have to use element now! */}
        <Route path="/" element={<GameMenu/>}/>
        <Route path="/game/create" element={<CreateGame/>}/>
        <Route path="/game/join" element={<JoinGame/>}/>
        {/* <Route path="/game/:gameID" render={props => <TypeRacer {...props}
                                                              gameState={gameState}/>}/> */}
        <Route path="/game/:gameID" element={<TypeRacer gameState={gameState} />}/>
      </Routes>
    </>
  );
}

export default App;

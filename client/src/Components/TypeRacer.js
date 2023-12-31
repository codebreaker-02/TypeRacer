import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CountDown from './CountDown'
import StartBtn from './StartBtn';
import socket from '../socketConfig'
import DisplayWords from './DisplayWords'
import Form from './Form'
import ProgressBar from './ProgressBar'
import ScoreBoard from './ScoreBoard'

const findPlayer = players =>{
  return players.find(player => player.socketID === socket.id)
}

const TypeRacer = ({gameState}) => {
  const navigate = useNavigate();
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(_id);
      console.log('Text copied to clipboard:', _id);
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  };

  const handleReset = ()=>{
    console.log('reached handleReset')
    socket.emit('reset-game', _id);
  }

  const {_id, players, words, isOpen, isOver} = gameState;
  const player = findPlayer(players);
  useEffect(()=>{
    if(_id === "")
      navigate('/');
  },[_id]);
  return (
    <div className='heroSection p-4' style={{display:'block', position:'relative', border:'1px solid black', borderRadius:'15px'}}>
      <h4 style={{position:'absolute', bottom:'0', left:'50%', transform:'translate(-50%,0%)'}} className='m-0 d-flex justify-content-center align-items-center'>Game Id: {_id} <i onClick={handleCopyClick} className="fa-regular fa-copy btn p-0 mx-2"></i></h4>
      <div className='text-center'>
        <ProgressBar players={players} player={player} wordsLength={words.length}/>
        <br></br>
        <StartBtn player={player} gameID={_id} />
        <br></br>
        <br></br>
        <CountDown />
        <div className='typingSection' style={{border:'2px solid black', borderRadius:'15px', padding:'10px'}}>
          <DisplayWords words={words} player={player} />
          <Form isOpen={isOpen} isOver={isOver} gameID={_id}/>
        </div>
        <ScoreBoard players={players} player={player} isOver={isOver} onReset={()=>{handleReset(_id)}}/>
      </div>
    </div>
  )
}

export default TypeRacer
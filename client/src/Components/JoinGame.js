import React, { useState } from 'react'
import socket from '../socketConfig'

const JoinGame = props => {
  const [userInput, setuserInput] = useState({gameID: "", nickName: ""});

  const onChange = e =>{
    setuserInput({...userInput, [e.target.name] : e.target.value})
  }

  const onSubmit = e =>{
    e.preventDefault();
    if(userInput.gameID === "" || userInput.nickName === ""){
      window.alert('Empty fields not allowed!')
      return 0;
    }
    else{
      console.log(userInput);
      socket.emit('join-game',userInput);
    }
  } 
  
  return(
    <div className='heroSection'>
      <div className='row' style={{width: '50%'}}>
          <div className='col-sm'></div>
            <div className='col-sm-8'>
                <h1 className='text-center'>Join Game</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        {/* <label htmlFor="gameID">Enter Game ID</label> */}
                        <input type='text' name='gameID'
                                            value = {userInput.gameId}
                                            onChange={onChange}
                                            placeholder='Enter Game ID'
                                            className='form-control shadow p-3 mb-3 bg-body-tertiary rounded'
                                            style={{textAlign:'center'}}
                                            />
                        {/* <label htmlFor="nickName">Enter Nick Name</label> */}
                        <input type='text' name='nickName'
                                            value = {userInput.nickName}
                                            onChange={onChange}
                                            placeholder='Enter Nick Name'
                                            className='form-control shadow p-3 mb-3 bg-body-tertiary rounded'
                                            style={{textAlign:'center'}}
                                            />
                    </div>
                    <div className='d-flex justify-content-center'>
                      <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
          <div className='col-sm'></div>
      </div>
    </div>
  )
}

export default JoinGame
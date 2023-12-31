import React, { useState } from 'react'
import socket from '../socketConfig'

const CreateGame = props => {
  const [nickName, setNickName] = useState("");

  const onChange = e=>{
    setNickName(e.target.value);
  }

  const onSubmit = e =>{
    if(nickName === ""){
      window.alert('Empty fields not allowed!')
    }
    else{
      e.preventDefault();
      socket.emit('create-game', nickName);
    }
  } 
  
  return(
    <div className='heroSection'>
    <div className='row' style={{width: '50%'}}>
        <div className='col-sm'></div>
        <div className='col-sm-8'>
            <h1 className='text-center'>Create Game</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    {/* <label htmlFor="nickName" className='mb-2'>Enter NickName : </label> */}
                    <input type='text' name='nickName'
                                        size="4"
                                        value = {nickName}
                                        onChange={onChange}
                                        placeholder='Enter nick Name'
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

export default CreateGame
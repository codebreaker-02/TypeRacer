import React from 'react'
import { useNavigate } from 'react-router-dom'

const GameMenu = props => {
    let navigate = useNavigate();
    return (
    // ml & mr in bootstrap are not working idk why?
    <div className='heroSection'>
        <div className='text-center'>
            <h1>Welcome to TypeRacer</h1>
            {/* <button type='button' onClick={()=>history.push('/game/create')}
                className='btn btn-primary btn-lg'>Create Game</button>
            <button type='button' onClick={()=>history.push('/game/create')}
                className='btn btn-primary btn-lg m-2'>Join Game</button> */}
            
            {/* history is now navigate and so there is no need of push method like above so the changes code is  */}
            <button type='button' onClick={()=>navigate('/game/create')}
                className='btn btn-primary btn-lg'>Create Game</button>
            <button type='button' onClick={()=>navigate('/game/join')}
                className='btn btn-primary btn-lg m-2'>Join Game</button>
        </div>
    </div>
    )
}

export default GameMenu;
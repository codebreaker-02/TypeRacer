import React, { useState, useEffect } from 'react'
import socket from '../socketConfig'

//'timer' event gets emitted on the successful click of the start button in the <StartBtn />

//'server' listens to this event and runs a setInterval method containing the count logic and on every interation it just emits the 'timer' event and this component listens for those events and update the 'timer' data

//Whenever the timer event gets emitted the setTimer will update the timer data to the incoming 'data' variable coming from the server and after updating it gets reflected on our screen 

const CountDown = props => {
    const [timer, setTimer] = useState({countDown: "", msg : ""})
    const [showCountdown, setShowCountdown] = useState(false);
    //We want some listeners to get active on mount of this component
    useEffect(()=>{
        socket.on('timer', (data)=>{
            setTimer(data);
            setShowCountdown(true);
        })
        socket.on('done',()=>{
            // socket.removeListener('timer');
            // console.log('reached here in done')
            setShowCountdown(false)
        })
    }, []);

    const {countDown, msg} = timer;
    return (
        showCountdown ? <>  <h1>{countDown}</h1>
                            <h3>{msg}</h3> 
                        </> : null
    )
}

export default CountDown
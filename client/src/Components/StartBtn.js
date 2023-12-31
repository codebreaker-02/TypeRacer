    import React, { useState, useEffect } from "react";
    import socket from '../socketConfig'


    const StartBtn = ({player, gameID})=>{
        const [showBtn, setShowBtn] = useState(true);
        const {isPartyLeader} = player;

        useEffect(()=>{
            socket.on('updateGame', (game)=>{
                if(game.isOpen){
                    setShowBtn(true);
                }
            })
        }, [])
        const onClickHandler = e => {
            //player._id is being sent to check if the player is partyLeader or not 
            //I don't think its needed again but it must be adding more access control 
            //gameID is needed to emit this event again for all the members in the game
            socket.emit('timer', {playerID: player._id, gameID})
            setShowBtn(false)
        }
        return(
            isPartyLeader && showBtn ? <button type="button"
                                                onClick={onClickHandler}
                                                className="btn btn-primary">Start Game</button>
                                                :null
                                            
        )
    }

    export default StartBtn;
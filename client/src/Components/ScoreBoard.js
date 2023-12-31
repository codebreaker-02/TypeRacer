// import React from 'react'

// const getScoreBoard = (players)=>{
//     const scoreBoard = players.filter(player => player.WPM !== -1);
//     return scoreBoard.sort((a,b)=> a.WPM > b.WPM ? -1 : b.WPM>a.WPM ? 1:0)
// }
// const ScoreBoard = ({players}) => {
//     const scoreBoard = getScoreBoard(players);
//     if(scoreBoard.length===0)
//         return null;
//     return (
//         <table className='table table-striped my-3'>
//             <thead>
//                 <tr>
//                     <th scope='col'>#</th>
//                     <th scope='col'>User</th>
//                     <th scope='col'>WPM</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     scoreBoard.map((player, index)=>{
//                         return <tr>
//                             <th scope='row'>{index + 1}</th>
//                             <td>{player.nickName}</td>
//                             <td>{player.WPM}</td>
//                         </tr>
//                     })
//                 }
//             </tbody>
//         </table>
//     )
// }

// export default ScoreBoard


import React from 'react';

const getScoreBoard = (players) => {
  const scoreBoard = players.filter((player) => player.WPM !== -1);
  return scoreBoard.sort((a, b) => (a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0));
};

const ScoreBoard = ({ players, player, isOver, onReset }) => {
  const scoreBoard = getScoreBoard(players);
  const {isPartyLeader} = player;
  if (scoreBoard.length === 0) return null;

  return (
    player.isCompleted || isOver ? <>
                                <div className='scoreboard-overlay'>
                                    <div className='scoreboard-container'>
                                        <h2>Score Board</h2>
                                        <table className='table table-striped my-3'>
                                        <thead>
                                            <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>User</th>
                                            <th scope='col'>WPM</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scoreBoard.map((player, index) => (
                                            <tr key={index}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{player.nickName}</td>
                                                <td>{player.WPM}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                        {
                                            isPartyLeader && isOver ? <>
                                                                <button className='btn btn-primary' onClick={onReset}>
                                                                    Reset Game
                                                                </button>
                                                            </> : null
                                        }
                                    </div>
                                </div> 
                            </> : null
  );
};

export default ScoreBoard;

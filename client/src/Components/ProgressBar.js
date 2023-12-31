// import React from 'react'


// const  calculatePercentage = (player, wordsLength)=>{
//     if(player.currentWordIndex !== 0){
//         return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%"
//     }
//     return 0;
// }
// const ProgressBar = ({player, players, wordsLength}) => {
//     const percentage = calculatePercentage(player, wordsLength);
//     return (
//         <div>
//             {
//                 <>
//                     <h5 className='text-left'>{player.nickName}</h5>
//                     <div className='progress my-1' key={player._id}>
//                         <div className="progress-bar"
//                             role = "progressbar"
//                             style={{width:percentage}}>{percentage}</div>
//                     </div>
//                 </>
//             }
//             {
//                 players.map(playerObj =>{
//                     const percentage = calculatePercentage(playerObj, wordsLength);
//                     return playerObj._id !== player._id ?
//                         <>
//                             <h5 className='text-left'>{playerObj.nickName}</h5>
//                             <div className='progress my-1' key={playerObj._id}>
//                                 <div className="progress-bar"
//                                     role = "progressbar"
//                                     style={{width:percentage}}>{percentage}</div>
//                             </div>
//                         </> : null
//                 })
//             }
//         </div>
//     )
// }

// export default ProgressBar


import React from 'react';

const calculatePercentage = (player, wordsLength) => {
  if (player.currentWordIndex !== 0) {
    return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + '%';
  }
  return 0;
};

const ProgressBar = ({ player, players, wordsLength }) => {
  return (
    <div className="row">
      <div className="col-2">
        <h5 style={{padding:'1px', margin:'px'}}>{player.nickName} (You)</h5>
      </div>
      <div className="col-10">
        <div className="progress my-1" key={player._id}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: calculatePercentage(player, wordsLength) }}
          >
            {calculatePercentage(player, wordsLength)}
          </div>
        </div>
      </div>
      {players.map((playerObj) => (
        playerObj._id !== player._id && (
          <React.Fragment key={playerObj._id}>
            <div className="col-2">
              <h5 className="text-left">{playerObj.nickName}</h5>
            </div>
            <div className="col-10">
              <div className="progress my-1" key={playerObj._id}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: calculatePercentage(playerObj, wordsLength) }}
                >
                  {calculatePercentage(playerObj, wordsLength)}
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      ))}
    </div>
  );
};

export default ProgressBar;

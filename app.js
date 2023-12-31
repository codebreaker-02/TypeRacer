const express = require('express')
const app = express()
const socketio = require('socket.io')
const mongoose = require('mongoose')

const expressServer = app.listen(3001);
const io = socketio(expressServer);

const Game = require('./Models/Game')
const QuotableAPI = require('./QuotableAPI')

mongoose.connect('mongodb://127.0.0.1:27017/typeracerTutorial')
.then(()=> console.log('Successfully Connected!'))
.catch((err)=> {console.log(err)})

io.on('connection',(socket)=>{
    socket.on('userInput', async({userInput, gameID})=>{
        try{
            let game = await Game.findById(gameID);
            console.log('words length: ' + game.words.length);
            console.log(userInput)
            if(!game.isOpen && !game.isOver){
                let player = game.players.find(player => player.socketID === socket.id);
                let word = game.words[player.currentWordIndex];
                if(word === userInput){
                    player.currentWordIndex++;
                    if(player.currentWordIndex !== game.words.length){
                        game = await game.save();
                        io.to(gameID).emit('updateGame', game);
                    }
                    else{
                        let endTime = new Date().getTime();
                        let {startTime} = game;
                        player.WPM = calculateWPM(endTime, startTime, player);
                        player.isCompleted = true;
                        game = await game.save();
                        //
                        // socket.emit('done');
                        io.to(gameID).emit('updateGame', game)
                    }
                }
            }
        }
        catch(err){
            console.log(err)
        }
    })
    socket.on('timer', async({gameID, playerID})=>{
        let countDown = 3;
        let game = await Game.findById(gameID);
        let player = game.players.id(playerID);
        if(player.isPartyLeader){
            //setIterval returns an inteval id, So that we can clearInterval later
            let timerID = setInterval(async()=>{
                if(countDown >= 0){
                    io.to(gameID).emit('timer', {countDown,msg : "Starting Game"});
                    countDown--;
                }
                else{
                    game.isOpen = false;
                    game = await game.save();
                    io.to(gameID).emit('updateGame', game)
                    startGameClock(gameID);
                    clearInterval(timerID);
                }
            }, 1000)
        }
    })
    socket.on('join-game', async ({gameID: _id, nickName})=>{
        try{
            let game = await Game.findById(_id);
            if(game.isOpen){
                const gameID = game._id.toString();
                socket.join(gameID);
                let player = {
                    socketID : socket.id,
                    nickName
                }
                game.players.push(player);
                game = await game.save();
                io.to(gameID).emit('updateGame', game)
            }
        }catch(err){
            console.log(err);
        }
    })
    socket.on('create-game', async (nickName)=>{
        try{
            const quotableData = await QuotableAPI();
            let game = new Game();
            game.words = quotableData; 
            let player = {
                socketID: socket.id,
                isPartyLeader: true,
                nickName: nickName
            }
            game.players.push(player);
            game = await game.save();

            const gameID = game._id.toString();
            socket.join(gameID);
            io.to(gameID).emit('updateGame', game);
        }
        catch(err){
            console.log(err);
        }
    })
    socket.on('reset-game', async(_id)=>{
        try{
            let gameID = _id;
            console.log('reached here');
            let game = await Game.findById(_id);
            if(!game.isOpen && game.isOver){
                console.log('reached in if');
                game.isOpen = true;
                game.isOver = false;
                const quotableData = await QuotableAPI();
                game.words = quotableData; 
                game.players.forEach(player=>{
                    player.WPM = -1
                    player.currentWordIndex = 0
                })
                game = await game.save();
                const gameID = game._id.toString();
                io.to(gameID).emit('updateGame', game);
            }
        }
        catch(err){
            console.log(err);
        }
    })
})


const startGameClock = async (gameID) =>{
    let game = await Game.findById(gameID);
    // The getTime() method of Date instances returns the number of milliseconds for this date since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC. 
    game.startTime = new Date().getTime();
    game = await game.save();
    let time = 20;
    let timerID = setInterval(function gameIntervalFunc(){
        if(time >= 0){
            const formatTime = calculateTime(time);
            io.to(gameID).emit('timer', {countDown: formatTime, msg: "Time Remaining"})
            time--;
        }
        else{
            (async ()=>{
                let endTime = new Date().getTime();
                let game = await Game.findById(gameID);
                let {startTime} = game;
                game.isOver = true;
                console.log()
                game.players.forEach((player, index)=>{
                        if(player.WPM === -1){
                            console.log(endTime, startTime, player)
                            game.players[index].WPM = calculateWPM(endTime, startTime, player);
                        }

                })
                game = await game.save();
                io.to(gameID).emit('done');
                io.to(gameID).emit('updateGame',game);
                clearInterval(timerID);
            })()
        }
        return gameIntervalFunc;
    }(), 1000)
}

const calculateTime = (time)=>{
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    //Basically this return statement takes care of the logic that when seconds are less than 10 then it should display the single digit in form of '01', '02', '03', etc instead of '1', '2', etc
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

const calculateWPM = (endTime, startTime, player)=>{
    let numOfWords = player.currentWordIndex;
    const timeInSeconds = (endTime - startTime)/1000;
    const timeInMinutes = timeInSeconds/60;
    const WPM = Math.floor(numOfWords/timeInMinutes);
    return WPM;
}
const axios = require('axios')

const uri = "https://api.quotable.io/random?minLength=100"


//here we can just add the '/minLength:any-number' after random to filter the quotes and increase the length according to the duration of the game

//you can read its docs on github, search for 'quotable api'
module.exports = getData = ()=>{
    return axios.get(uri).then(response => response.data.content.split(" "));
}
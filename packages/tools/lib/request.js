const axios = require("axios");

const HTTPCODE = {
    success:"10200",
}


const request = axios.create({
    timeout:5000
})


module.exports = {request,HTTPCODE};

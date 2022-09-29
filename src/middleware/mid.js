const shortUrl = require('node-url-shortener');
const validUrl = require('valid-url');
const axios = require('axios');
const shortId = require('shortid')

const createMid = async function(req, res, next){
    try{
        let urlCreate = req.body
        var objUrl = {}
        let correctLink = false 
        await axios.get(urlCreate.longUrl)
         .then((res) => {  correctLink = true})   
         .catch((error) => {correctLink = false})

         if(correctLink == false){
          return  res.status(400).send({status : false, message : "Please Provide correct url!!"})
         } 
         let generateId = shortId.generate()
         req.generateId = generateId;

        let urlResult =  shortUrl.short(req.body.longUrl,  function(err, url){
          req.createUrl = url
          next();
         });
         
    }catch(err){
        res.status(500).send({status: false, msg: err.message})
    }

}
module.exports.createMid = createMid

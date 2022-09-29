const urlModel =  require('../models/urlModel')
const shortUrl = require('node-url-shortener');
const validUrl = require('valid-url');
const axios = require('axios');

const createUrl = async function(req, res){
    try{
        let urlCreate = req.body
        let correctLink = false 
        await axios.get(urlCreate.longUrl)
         .then((res) => {  correctLink = true})   
         .catch((error) => {correctLink = false})

         if(correctLink == false){
          return  res.status(400).send({status : false, message : "Please Provide correct url!!"})
         } 

        shortUrl.short(req.body.longUrl, function(err, url){
            console.log(url);
            return res.send({msg: "valid url", shortUrl: url})
        //     if(url){
        //     // return res.send({msg: "valid url"})
        // }
        //     else{
        //         return res.send({msg: "not a valid url"});
        //     }
         });
    // if (validUrl.isUri(url.longUrl)){
    //     console.log('Looks like an URI');
    //     return res.send({msg: "valid url"})
    // } else {
    //     console.log('Not a URI');
    //     return res.send({msg: "not a valid url"})
    // }
        //let saveUrl = await urlModel.create(url);
        //res.status(201).send({status: true, msg: "Success"})

    }catch(err){
        res.status(500).send({status: false, msg: err.message})
    }

}

module.exports.createUrl = createUrl
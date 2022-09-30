const urlModel =  require('../models/urlModel')
const shortUrl = require('node-url-shortener');
const axios = require('axios');
const shortId = require('shortid');
const { findOne } = require('../models/urlModel');

const createUrl = async function(req, res){
    try{
        let urlCreate = req.body
        if(Object.keys(urlCreate).length == 0){
            res.status(400).send({status: false, msg: 'Request body can not be empty'})
        }
        if(!urlCreate.longUrl){
            return res.status(400).send({status: false, msg: 'Please enter longUrl Key'});
        }
        let correctLink = false 
        await axios.get(urlCreate.longUrl)
         .then((res) => {  correctLink = true})   
         .catch((error) => {correctLink = false})

         if(correctLink == false){
          return  res.status(400).send({status : false, message : "Please Provide correct url!!"})
         } 
         let urlCheck = await urlModel.findOne({longUrl:urlCreate.longUrl})
    
         if(urlCheck){
            return res.status(400).send({status: false, msg: 'shortUrl for this longUrl has already been generated'});
         }
         let generateId = shortId.generate(urlCreate.longUrl)
         let shortUrl = `http://localhost:3000/${generateId}`
         
        let obj = {}
        obj.longUrl = req.body.longUrl
        obj.shortUrl = shortUrl
        obj.urlCode = generateId;
        let saveUrl = await urlModel.create(obj);
        let saveUrl2 = await urlModel.findOne({_id: saveUrl._id}).select({_id: 0,longUrl:1, shortUrl: 1, urlCode: 1});
        return res.status(201).send({status: true, data:saveUrl2});
        // return res.send({msg: "valid url", urlCode:"success"}); 

    }catch(err){
        res.status(500).send({status: false, msg: err.message})
    }

}

//second get api url 
const getUrl = async function(req, res){
    try {
     let shortId = req.params.urlCode
     let getData = await urlModel.findOne({urlCode : shortId}).select({longUrl : 1 , _id : 0})
     if(!shortId){
        return res.status(400).send({status: false, msg: 'Please enter valid urlCode'})
     }
     return res.status(302).redirect(getData.longUrl)
    
    }catch(err){
      return res.status(500).send({status : false , msg : err.message})
    }
    }

module.exports.createUrl = createUrl
module.exports.getUrl =getUrl
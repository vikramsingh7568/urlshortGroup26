const urlModel =  require('../models/urlModel')
const shortUrl = require('node-url-shortener');
const validUrl = require('valid-url');
const axios = require('axios');
const shortId = require('shortid')

const createUrl = async function(req, res){
    try{
        let obj = {}
        obj.longUrl = req.body.longUrl
        obj.shortUrl = req.createUrl
        obj.urlCode = req.generateId;
         console.log(req.createUrl);
        let saveUrl = await urlModel.create(obj);
        let saveUrl2 = await urlModel.findOne({_id: saveUrl._id}).select({_id: 0,longUrl:1, shortUrl: 1, urlCode: 1});
        return res.status(201).send({status: true, data:saveUrl2});
        // return res.send({msg: "valid url", urlCode:"success"}); 

    }catch(err){
        res.status(500).send({status: false, msg: err.message})
    }

}

module.exports.createUrl = createUrl
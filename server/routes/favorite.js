const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    
    // mongoDB에서 Favorite 숫자 조회
    Favorite.find({"movieId": req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err)
        // Favorite 숫자 정보 전송
        res.status(200).json({success:true, favoriteNumber: info.length})
    })
})

router.post('/favorited', (req, res) => {
    
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(info.length !== 0){
            result = true
        }

        res.status(200).json({success:true, favorited: result})
    })
})



module.exports = router;

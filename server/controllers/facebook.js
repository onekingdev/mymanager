
const express = require('express')
const axios = require('axios')
// const config = require('config');
require('dotenv').config()
var FormData = require('form-data');

 


exports.getpages =  async (req, res) => {

    let accessToken = req.params.access_token;

    try {

        const pagesApiUrl = 'https://graph.facebook.com/me/accounts';
        // Add the access token to the URL
        const pagesParams = {
            access_token: accessToken
        };
        axios.get(pagesApiUrl, { params: pagesParams })
            .then(function (response) {
                res.status(200).json(response.data)
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({
                    error
                })
            });

    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }

}



exports.getpagesPost = async (req, res) => {
    let access_token = req.params.access_token;
    let pageId = req.params.pageId;
    try {
        let data = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://graph.facebook.com/${pageId}/posts?access_token=${access_token}`
        };

        axios(data)
            .then(function (response) {
                res.status(200).json(response.data)
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({
                    error: error.message
                })
            });



    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }
}



exports.commentsByEachpost = async (req, res) => {
    let access_token = req.params.access_token;
    let postId = req.params.postId;
    try {
        let data = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://graph.facebook.com/${postId}/comments?access_token=${access_token}`
        };

        axios(data)
            .then(function (response) {
                const comments = response.data.data;
                // comments.forEach(comment => {
                //     console.log(`- Comment from ${comment.from.name} (${comment.from.id}): ${comment.message}`);
                // });
                res.status(200).json(comments)
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({
                    error: error.message
                })
            });



    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }
}


exports.createPost = async (req, res) => {


    let accessToken = req.body.access_token;
    let msg = req.body.message;
    let page_id = req.body.page_id;

    const postParams = {
        message: msg
    };

    try {
        const postApiUrl = `https://graph.facebook.com/${page_id}/feed?access_token=${accessToken}`;

        axios.post(postApiUrl, postParams).then(function (response) {
            console.log('post created');
            if (response?.data) {
                res.status(201).json({
                    postId: response.data.id
                })
            }
        })
            .catch(function (error) {
                res.status(500).json({
                    error: error
                });
                // console.log(error);
            });
    }
    catch (e) {
        console.log(e.message)
        console.log('error in main block');
        res.status(500).send(e);
    }

};

exports.commentOnPost = async (req, res) => {

    let accessToken = req.body.access_token;
    let msg = (req.body.message);
    let postId = req.body.postId;
    const commentData = {
        message: msg
    };
    try {
        const requestUrl = `https://graph.facebook.com/${postId}/comments?access_token=${accessToken}`;
        axios.post(requestUrl, commentData)
            .then(function (response) {
                console.log('Backend - Comment created')
                if (response?.data?.id) {
                    res.status(201).json(response?.data?.id)
                } else {
                    res.status(201).json({})
                }
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({
                    error
                })
            });
    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }
};


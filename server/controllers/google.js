
const express = require('express')
const axios = require('axios')



exports.googleDeviceConnecter = async (req, res) => {

    let deviceCodeConfig = {
        method: 'post',
        url: `https://oauth2.googleapis.com/device/code?client_id=${process.env.CLIENT_ID}&scope=email%20profile`,
        headers: {}
    };

    axios(deviceCodeConfig)
        .then(function (deviceCodeConfigResponse) {

            res.json({
                status: 200,
                message: true,
                redirectUrl: deviceCodeConfigResponse.data.verification_url,
                deviceCode: deviceCodeConfigResponse.data.user_code
            })
        })
        .catch(function (error) {
            console.log(error);
        });

}


exports.googleDeviceCallback = async (req, res) => {
    let deviceCode = req.params.user_code
    var config = {
        method: 'post',
        url: `https://oauth2.googleapis.com/token?client_id=860682267763-kg8p98nnnlq552s06mubgmiql304q39q.apps.googleusercontent.com&client_secret=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&device_code=${deviceCode}&grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            res.json({
                status: 200,
                message: true,
                data: response.data
            })
        })
        .catch(function (error) {
            res.send(error)
            console.log(error);
        });

};







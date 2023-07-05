const express = require("express");
const router = express.Router();
const axios = require('axios');
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");


const {
    getpages,
    getpagesPost,
    commentsByEachpost,
    createPost,
    commentOnPost



} = require("../controllers/facebook");



router.get("/facebook/get-pages/:access_token", getpages);
router.get("/facebook/get-page-posts/:access_token/:pageId", getpagesPost);
router.get("/facebook/get-page-posts/comments/:access_token/:postId", commentsByEachpost);
router.post("/facebook/create-page-posts", createPost);
router.post("/facebook/comment-on-post", commentOnPost);
//router.get("/facebook/comment-on-post", comment_on_post);


// router.post('/schedule-post', (req, res) => {
//     //const axios = require('axios');

//     const PAGE_ID = '113684288326422';
//     const ACCESS_TOKEN = 'EAABzV3iosiIBAPoZAz2PRZBa4pTDbZBf3HNwE3S85Lg8EsZATUY5NGva3MMJBk9Apa2celKRlnqzfj9QaaIZBWriwdNnjfuwBr9yCAe0GgwNNNweAPjZB6yePYTTheY7hbUV8fUgn9Rj6Qe1g0Yisr6yWByvxj6GPvz8wpFucpQrIdJqsrvS2EfHeVoErMi7ceIeNTkZA5EpgZDZD';

//     const { message, date, time } = req.body;
//     const dateString = `${date} ${time}`;
//     const scheduledTime = Math.floor(new Date(dateString).getTime() / 1000);

//     const postData = {
//         message: message,
//         published: false,
//         scheduled_publish_time: scheduledTime // Schedule post for the specified date and time
//     };

//     const url = `https://graph.facebook.com/v12.0/${PAGE_ID}/feed`;

//     axios.post(url, postData, {
//         params: {
//             access_token: ACCESS_TOKEN
//         }
//     })
//         .then(response => {
//             console.log('Post scheduled successfully!');
//             res.status(200).json({
//                 status: true,
//                 data: response.data,
//                 msg: "scheduled successfully!"
//             })
//         })
//         .catch(error => {
//             console.error('Error scheduling post:', error);
//         });
// })

// router.post('/schedule-post', (req, res) => {
//     const axios = require('axios');

//     const PAGE_ID = '113684288326422';
//     const ACCESS_TOKEN = 'EAABzV3iosiIBAPoZAz2PRZBa4pTDbZBf3HNwE3S85Lg8EsZATUY5NGva3MMJBk9Apa2celKRlnqzfj9QaaIZBWriwdNnjfuwBr9yCAe0GgwNNNweAPjZB6yePYTTheY7hbUV8fUgn9Rj6Qe1g0Yisr6yWByvxj6GPvz8wpFucpQrIdJqsrvS2EfHeVoErMi7ceIeNTkZA5EpgZDZD';

//     const { message, date, time, publish } = req.body;

//     if (publish && (!date || !time)) {
//         // Handle the case where date or time is missing for scheduled post
//         console.error('Error scheduling post: Date and time are required for scheduled posts.');
//         res.status(400).json({
//             status: false,
//             msg: 'Date and time are required for scheduled posts.'
//         });
//         return;
//     }

//     const scheduledTime = publish ? Math.floor(new Date(`${date} ${time}`).getTime() / 1000) : null;
//     const postData = {
//         message: message,
//         published: !publish, // If publish is true, post will be scheduled and not published immediately
//         scheduled_publish_time: scheduledTime // Schedule post for the specified date and time
//     };

//     // Make the API request to schedule the post
//     axios.post(`https://graph.facebook.com/v12.0/${PAGE_ID}/feed`, postData, {
//         params: {
//             access_token: ACCESS_TOKEN
//         }
//     }).then(response => {
//         console.log('Post scheduled:', response.data);
//         res.status(200).json({
//             status: true,
//             msg: 'Post scheduled successfully.'
//         });
//     }).catch(error => {
//         console.error('Error scheduling post:', error.response.data.error);
//         res.status(500).json({
//             status: false,
//             msg: 'Error scheduling post.'
//         });
//     });
// });




// router.post('/schedule-post', (req, res) => {
//     const axios = require('axios');

//     // const PAGE_ID = '113684288326422';
//     // const ACCESS_TOKEN =;

//     const { page_id, access_token, message, date, time, publish } = req.body;

//     if (publish && (!date || !time)) {
//         // Handle the case where date or time is missing for scheduled post
//         console.error('Error scheduling post: Date and time are required for scheduled posts.');
//         res.status(400).json({
//             status: false,
//             msg: 'Date and time are required for scheduled posts.'
//         });
//         return;
//     }

//     const scheduledTime = publish ? Math.floor(new Date(`${date} ${time}`).getTime() / 1000) : null;
//     const postData = {
//         message: message,
//         published: !publish, // If publish is true, post will be scheduled and not published immediately
//         scheduled_publish_time: scheduledTime // Schedule post for the specified date and time
//     };

//     // Make the API request to schedule the post
//     axios.post(`https://graph.facebook.com/v12.0/${page_id}/feed`, postData, {
//         params: {
//             access_token: access_token
//         }
//     }).then(response => {
//         console.log('Post scheduled:', response.data);
//         res.status(200).json({
//             status: true,
//             msg: 'Post scheduled successfully.'
//         });
//     }).catch(error => {
//         console.error('Error scheduling post:', error.response.data.error);
//         res.status(500).json({
//             status: false,
//             msg: 'Error scheduling post.'
//         });
//     });
// });
// router.post('/schedule-post', (req, res) => {
//     const axios = require('axios');

//     const { page_id, access_token, message, date, time, publish } = req.body;

//     if (publish && (!date || !time)) {
//         // Handle the case where date or time is missing for scheduled post
//         console.error('Error scheduling post: Date and time are required for scheduled posts.');
//         res.status(400).json({
//             status: false,
//             msg: 'Date and time are required for scheduled posts.'
//         });
//         return;
//     }

//     const scheduledTime = publish ? Math.floor(new Date(`${date} ${time}`).getTime() / 1000) : null;
//     const postData = {
//         message: message,
//         published: !publish, // If publish is true, post will be scheduled and not published immediately
//         scheduled_publish_time: scheduledTime // Schedule post for the specified date and time

//     };

//     // Make the API request to schedule the post
//     axios.post(`https://graph.facebook.com/v12.0/${page_id}/feed`, postData, {
//         params: {
//             access_token: access_token
//         }
//     }).then(response => {
//         console.log('Post scheduled:', response.data);
//         res.status(200).json({
//             status: true,
//             msg: 'Post scheduled successfully.'
//         });
//     }).catch(error => {
//         console.error('Error scheduling post:', error.response.data.error);
//         res.status(500).json({
//             status: false,
//             msg: 'Error scheduling post.'
//         });
//     });
// });
//###############
router.post('/schedule-post', (req, res) => {

    const { page_id, access_token, message, date, time, publish, image_url } = req.body;

    if (publish && (!date || !time)) {
        // Handle the case where date or time is missing for scheduled post
        console.error('Error scheduling post: Date and time are required for scheduled posts.');
        res.status(400).json({
            status: false,
            msg: 'Date and time are required for scheduled posts.'
        });
        return;
    }

    const scheduledTime = publish ? Math.floor(new Date(`${date} ${time}`).getTime() / 1000) : null;
    const postData = {
        message: message,
        published: !publish, // If publish is true, post will be scheduled and not published immediately
        scheduled_publish_time: scheduledTime // Schedule post for the specified date and time
    };

    // Add the image URL to the postData object
    if (image_url) {
        postData.url = image_url;
    }

    // Make the API request to schedule the post with the image URL
    axios.post(`https://graph.facebook.com/v12.0/${page_id}/photos`, postData, {
        params: {
            access_token: access_token
        }
    }).then(response => {
        console.log('Post scheduled with image URL:', response.data);
        res.status(200).json({
            status: true,
            msg: 'Post scheduled successfully with image URL.'
        });
    }).catch(error => {
        console.error('Error scheduling post with image URL:', error.response.data.error);
        res.status(500).json({
            status: false,
            msg: 'Error scheduling post with image URL.'
        });
    });
})
router.post('/text_schedule-post', (req, res) => {
    const { page_id, access_token, message, date, time, publish } = req.body;

    if (publish && (!date || !time)) {
        console.error('Error scheduling post: Date and time are required for scheduled posts.');
        res.status(400).json({
            status: false,
            msg: 'Date and time are required for scheduled posts.'
        });
        return;
    }

    const scheduledTime = publish ? Math.floor(new Date(`${date} ${time}`).getTime() / 1000) : null;
    const postData = {
        message: message,
        published: !publish,
        scheduled_publish_time: scheduledTime,
        posted_date: new Date().toISOString() // Add the posted date to the request body
    };
    //   console.log("postData", postData)
    axios.post(`https://graph.facebook.com/v12.0/${page_id}/feed`, postData, {
        params: {
            access_token: access_token
        }
    })
        .then(response => {
            const scheduledDate = new Date(scheduledTime * 1000);
            //   console.log('Post scheduled without image URL:', response.data);
            res.status(200).json({
                status: true,
                msg: 'Post scheduled successfully ',
                //  scheduled_date: scheduledDate.toISOString(),
                //data: response.data
            });
        })
        .catch(error => {
            //   console.error('Error scheduling post without image URL:', error.response.data.error);
            res.status(500).json({
                status: false,
                msg: 'Error scheduling post without image URL.'
            });
        });
});




router.post('/refresh-token', (req, res) => {
    const { page_id, access_token } = req.body;

    // const url = `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${access_token}`;

    const url = `https://graph.facebook.com/v13.0/${page_id}?fields=access_token&access_token=${access_token}`
    // https://graph.facebook.com/v13.0/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}

    axios.get(url)
        .then(response => {
            //  console.log('Token refreshed successfully!');
            const data = response.data;
            // const expires_in_seconds = data.expires_in;
            //  const expires_at = new Date(Date.now() + expires_in_seconds * 1000).toISOString();
            // const expires_at = new Date(Date.now() + expires_in_seconds * 1000).toLocaleString();
            // const expires_in_seconds = data.expires_in;

            // const expires_at = new Date(Date.now() + expires_in_seconds * 1000).toISOString();

            res.status(200).json({
                status: true,
                data: {
                    access_token: data.access_token,
                    // expires_in_seconds: expires_in_seconds,
                    // expires_at: expires_at
                }
            });
        })
        .catch(error => {
            console.error('Error refreshing token:', error);
            res.status(500).send('Error refreshing token');
        });
});


router.post('/facebook_short_token', (req, res) => {
    //   const { fb_exchange_token } = req.body

    const url = 'https://graph.facebook.com/v13.0/oauth/access_token';
    const params = {
        grant_type: 'fb_exchange_token',
        // client_id: '126819523670562',
        // client_secret: '9dd26614da6ebde546bea133eb864db7',
        client_id: '310109620967829',
        client_secret: 'fbbf4ef055a2b61e602fa5e8337d29a5',
        fb_exchange_token: req.body.fb_exchange_token


    };

    axios.get(url, { params })
        .then(response => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
            res.send(error);

        });

})

router.post('/facebook_long_token', isAuthenticated, (req, res) => {

    const url = 'https://graph.facebook.com/113684288326422';

    const params = {
        fields: 'access_token',
        access_token: req.body.access_token
    };

    axios.get(url, { params })
        .then(response => {
            console.log(response.data);
            res.send(response.data);

        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });

})

//const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

router.post('/image_upload', (req, res) => {
    const { page_id, access_token, message, image_path } = req.body;
    //console.log("image path", image_path)
    console.log(req.body);

    // Read the image file as binary data
    const imageData = fs.readFileSync(image_path);
    console.log("imageData", imageData)

    // Create a form data object with the image data and message
    const formData = new FormData();
    formData.append('access_token', access_token);
    formData.append('message', message);
    // formData.append('source', imageData);

    // Make the API request to upload the image
    axios.post(`https://graph.facebook.com/v12.0/${page_id}/photos`, formData, {
        headers: formData.getHeaders()
    }).then(response => {
        console.log('Image uploaded:', response.data);
        res.status(200).json({
            status: true,
            msg: 'Image uploaded successfully.'
        });
    }).catch(error => {
        console.error('Error uploading image:', error.response.data.error);
        res.status(500).json({
            status: false,
            msg: 'Error uploading image.'
        });
    });
});



module.exports = router;


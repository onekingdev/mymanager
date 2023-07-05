const config = require("../Utilities/voice/config");
const { voiceToken } = require("../Utilities/voice/voiceToken");
const { VoiceResponse } = require("twilio").twiml;
const VoiceRecord = require("../models/Voice");
const BillingHistory = require("../models/BillingHistory");
const Deposit = require("../models/Deposit");
const { twilioFormat } = require("../Utilities/voice/voiceToken");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};

exports.GetVoiceToken = async (req, res) => {
  const identity = req.query.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
};

exports.PostVoiceToken = (req, res) => {
  const identity = req.body.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
};

exports.Twiml = (req, res) => {
  let { recording, user_id, To, From } = req.body;
  // console.log("twiml", req.body);
  // console.log("twimlreq", req);
  let ToNumber = parseInt(To);
  // console.log("ToNumber", ToNumber);
  try {
    if (recording == "true") {
      response = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
          <Dial callerId=${From}  recordingStatusCallback='https://mymanager.com/api/voice/voice_recording?user_id=${
        user_id + "," + To
      }'  record='record-from-ringing' >${ToNumber}</Dial>
          <Say>Goodbye</Say>
      </Response>`;

      let data = {
        recording_url: "",
        user_id: "",
        num: req.body.To,
        duration: "",
      };
      // VoiceRecord(data).save()
      //   .then((item) => res.send({ success: true, data: item }))
      res.send(response);
    } else {
      //   response = `<?xml version="1.0" encoding="UTF-8"?>
      // <Response>
      //     <Dial callerId=${From}>${ToNumber}</Dial>
      //     <Say>bilal Goodbye</Say>
      // </Response>`;
      //   res.send(response);
      const response = new VoiceResponse();
      const dial = response.dial({
        callerId: From,
        answerOnBridge: true,
      });
      dial.client("phil");
      res.set("Content-Type", "text/xml");
      res.send(response.toString());
    }
  } catch (e) {
    res.json({ success: false, msg: "Server Error" });
  }
};

exports.VoiceRecording = async (req, res) => {
  try {
    // console.log("voicerecording", req.body, req.url);
    // let url = `/voice_recording?user_id=606aea95a145ea2d26e0f1ab,+18323041166b`;
    let data = {
      recording_url: req?.body?.RecordingUrl,
      user_id: req?.url?.split("?user_id=")[1].split(",")[0],
      num: req?.url?.split("?user_id=")[1].split(",")[1],
      duration: req?.body?.RecordingDuration,
    };
    await VoiceRecord(data)
      .save()
      .then((item) => {
        console.log("data", data);
      });

    // subtracts credits on call end
    let callDuration = +req?.body?.RecordingDuration / 60;

    let minSubstract =
      callDuration.toFixed(0) == 0
        ? 1
        : callDuration.toFixed(0) == 1
        ? 2
        : callDuration.toFixed(0) == 2
        ? 3
        : callDuration.toFixed(0);

    const doesUserExist = await Deposit.findOne({
      user_id: req?.url?.split("?user_id=")[1].split(",")[0],
    });

    if (doesUserExist) {
      let { purchased_Num, smsCredits, voiceMinutes } = await Deposit.findOne({
        user_id: req?.url?.split("?user_id=")[1].split(",")[0],
      });

      await BillingHistory.create({
        userId: req?.url?.split("?user_id=")[1].split(",")[0],
        callType: "VoiceCall",
        date: new Date(),
        phoneNumber: twilioFormat(req?.url?.split("?user_id=")[1].split(",")[1]),
        callPeriod: minSubstract,
        remainingSMSCredits: smsCredits,
        remainingVoiceMins: voiceMinutes - minSubstract,
      });

      let creditsInfo = await Deposit.findByIdAndUpdate(
        doesUserExist._id,
        { $inc: { voiceMinutes: -minSubstract } },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        data: creditsInfo,
      });
    } else {
      Deposit(req.body)
        .save()
        .then((item) => res.json({ success: true, data: item }));
    }
  } catch (e) {
    res.json({ success: false, data: "Something went wrong" });
  }
};

exports.ShowCallHistory = async (req, res) => {
  // console.log("show", req.body);
  let { user_id } = req.params;
  try {
    let record = await VoiceRecord.find({ user_id: user_id });
    if (record) {
      res.status(200).json({
        success: true,
        data: record,
      });
    } else {
      res.json({ success: false, data: "Something went wrong" });
    }
  } catch (e) {}
};

exports.Voice = async (req, res) => {
  // console.log("voice", req.body);
  const To = req.body.To;
  const response = new VoiceResponse();
  const dial = response.dial({ callerId: config.twilio.callerId });
  dial.number(To);
  res.set("Content-Type", "text/xml");
  res.send(response.toString());
};

exports.VoiceIncomming = async (req, res) => {
  // console.log("voiceIncoiming", req.body);
  const response = new VoiceResponse();
  const dial = response.dial({
    callerId: req.body.From,
    answerOnBridge: true,
  });
  dial.client("phil");
  res.set("Content-Type", "text/xml");
  res.send(response.toString());
};

exports.VoiceOutgoing = async (req, res) => {
  let to = req.body.selectedPhone,
    recording = req.body.recording;
  let { purchased_Num } = await Deposit.findOne({
    user_id: req.user._id,
  });
  if (recording) {
    client.calls
      .create({
        // record: true,
        twiml: `<Response><Say>Please leave your message after the beep.</Say>
      <Record maxLength="30" action="https://mymanager.com/api/voice/voice_recording?user_id=${
        req.user._id + "," + to
      }" /></Response>`,
        to: twilioFormat(to),
        from: twilioFormat(purchased_Num),
        // recordingStatusCallback: `https://mymanager.com/api/voice/voice_recording?user_id=${
        //   req.user._id + "," + to
        // }`,res.status(200).json
      })
      .then((call) => {
        res.status(200).json(call.sid);
      });
  } else {
    client.calls
      .create({
        twiml: "<Response><Say>Ahoy, World!</Say></Response>",
        to: twilioFormat(to),
        from: twilioFormat(purchased_Num),
      })
      .then((call) => res.status(200).json(call.sid));
  }
};

// exports.SendSMS = async (req, res) => {
//   const from = req.body.From;
//   const transcription = req.body.TranscriptionText;

//   twilio.messages
//     .create({
//       body: `Message from: ${from} - ${transcription}`,
//       from: process.env.FROM_NUMBER,
//       to: "<YOUR_PHONE_NUMBER>",
//     })
//     .then((message) => console.log(message.sid));
// };

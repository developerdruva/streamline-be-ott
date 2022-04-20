const fast2sms = require('fast-two-sms')
const dotenv = require("dotenv");

dotenv.config();

exports.sendOtp = async (req, res) => {
    const otp = genOtp();
    let options = {
        authorization : process.env.FAST2SMS_API,
        message : `OTP: ${otp}. for registration.`,
        numbers : [req.params.mobile]
    }
    const response = await fast2sms.sendMessage(options);
    console.log(response, '------------otp response');
    if(response.return){
        res.send({ status : true, otp : otp});
    }else{
        res.send({ status : false, otp : null});
    }
}

let genOtp = () => {
    let randomNum = ()=> Math.floor(Math.random()*10)
    let x = '';
    for(i=0;i<6;i++){
        x = x + randomNum();
    }
    return x
}

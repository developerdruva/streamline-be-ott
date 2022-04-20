const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.register = async (req, res) => {
    console.log("register api hitted.");
    let userdata = req.body;
    console.log(userdata, 'userdata');
    let emailCheck = await userModel.find({emailId: userdata.emailId});
    console.log(emailCheck, 'res');
    if(emailCheck.length>0){
        res.send({status : false, message : 'email already existed', token : null});
    }else{
        let newUser = new userModel(userdata);
        let addNew = await newUser.save();
        console.log(addNew, 'res addnew');
        if(addNew._id){
            let token = jwt.sign({subject: addNew._id}, process.env.SECRET_KEY);
            res.send({ status : true, message : 'user registered', token : token});
        }else{
            res.send({ status : false, message : 'something error', token : null});
        }
    }
}

exports.login = async (req, res) => {
    console.log('login api hitted.');
    let userdata = req.body;
    console.log(userdata, 'userdata');
    let emailCheck = await userModel.findOne({emailId: userdata.emailId});
    if(emailCheck.emailId === userdata.emailId){
        if(emailCheck.password === userdata.password){
            let token = jwt.sign({subject: emailCheck._id}, process.env.SECRET_KEY);
            res.send({ status : true, message : 'login success', token : token});
        }else{
            res.send({ status : false, message : 'password error', token : null});
        }
    }else{
        res.send({ status : false, message : 'emailid error', token : null});
    }
}

exports.emailcheck = async (req, res) => {
    let email = req.params.email;
    console.log(email, 'email from');
    let emailCheck = await userModel.findOne({emailId: email});
    console.log(emailCheck, 'res emailcheck');
    if(emailCheck === null){
        res.send({ status : false, message : 'email not existed'});
    }else{
        if(emailCheck._id){
            res.send({ status : true, message : 'email existed'});
        }else{
            res.send({ status : false, message : 'email not existed'});
        }
    }
}

exports.getUserbyId = async (req, res) => {
    let usr_id = req.params.id;
    console.log(usr_id, 'uesr id getuserbyid');
    try{
        let getUsr = await userModel.findOne({_id: usr_id});
        if(getUsr._id){
            res.send({ status : true, result : getUsr});
        }else{
            res.send(null);
        }
    }catch(error){
        res.send({ status : false, result : error.message});   
    }
}

exports.addPlansToUser = async (req, res) => {
    let email = req.body.emailId;
    let plan = req.body.subscription.plan;
    let price = req.body.subscription.price;
    let addPlan = await userModel.updateOne({emailId: email}, {$set: {subscription: {plan: plan, price: price}}});
    console.log(addPlan, 'response add plan');
    if(addPlan.acknowledged){
        if(addPlan.modifiedCount > 0){
            res.send({status: true, message : 'subscription added'})
        }else{
            res.send({status : false, message: 'subscription not added'})
        }
    }else{
        res.send({status : false, message: 'subscription not added'})
    }
}

exports.getUsers = async (req, res) => {
    const users = await userModel.find({});
    console.log(users);
    if(users.length>0){
        res.send({status : true, data: users});
    }else{
        res.send({status : false, data: null})
    }
}

exports.deleteUser = async (req, res)=>{
    const id = req.params.id;
    try{
        let response = await userModel.deleteOne({emailId : id});
        console.log(response);
        if(response.acknowledged){
            if(response.deletedCount > 0){
                res.send({status : true, message : 'user deleted successfully.'});
            }else{
                res.send({status : false, message : 'no changes found in user'});
            }
        }else{
            res.send({status : false, message : 'something went wrong'});
        }
    }catch(error){
        console.log(error);
        res.send({status : false, message : 'something went wrong'});
    }
}
const movieModel = require('../models/movies.model');
const dotenv = require('dotenv');
dotenv.config();

let s3mv_url = process.env.S3_BASEURL;

exports.addMovie = async(req, res) => {
    let mv_data = req.body;
    console.log(mv_data, 'mv daata');
    try {
        let addCheck = await movieModel.find({mv_id: mv_data.mv_id});
        if(addCheck.length > 0){
            res.send({status : false, message : 'movie already existed'});
        }else{
            let newMovie = new movieModel(mv_data);
            let addNew = await newMovie.save();
            console.log(addNew, 'res addnew');
            if(addNew._id){
                res.send({status : true, message : 'movie added successfully.'});
            }else{
                res.send({ status : false, message : 'something error'});
            }
        }   
    } catch (error) {
        res.send({status: false, message: error.message})
    }
}

exports.getMovies = async (req, res) => {
    let movies = await movieModel.find({});
    if(movies.length > 0){
        res.send({status : true, message : 'success', movies : movies, base_url: s3mv_url});
    }else{
        res.send({status : false, message : 'not found', movies : movies, base_url: s3mv_url});
    }
}

exports.getMoviebyId = async (req, res) => {
    let mvId = req.params.id;
    let mvIdRes = await movieModel.findOne({mv_id : mvId});
    if(mvIdRes._id){
        res.send({status : true, message : 'success', movies : mvIdRes, base_url: s3mv_url});
    }else{
        res.send({status : false, message : 'not found', movies : movies, base_url: s3mv_url});
    }
}

exports.updateMovie = async (req, res) => {
    let form = req.body;
    try {
        let update = await movieModel.updateOne({mv_id: form.mv_id}, {$set : form});
        console.log(update);
        if(update.acknowledged){
            if(update.modifiedCount > 0){
                res.send({status : true, message : 'movie updated successfully.'});
            }else{
                res.send({status : false, message : 'no changes found in movie'});
            }
        }else{
            res.send({status : false, message : 'something went wrong'});
        }
    } catch (error) {
        res.send({status: false, message: error.message})
    }
}

exports.deleteMovie = async (req, res) => {
    let id = req.params.id;
    try{
        let del = await movieModel.deleteOne({mv_id: id});
        console.log(del);
        if(del.acknowledged){
            if(del.deletedCount>0){
                res.send({status : true, message : 'movie deleted successfully.'});
            }else{
                res.send({status : false, message : 'no movie found'});
            }
        }else{
            res.send({status : false, message : 'something went wrong'});
        }
    }catch (error) {
        res.send({status: false, message: error.message})
    }
}

exports.setPromo = async (req,res)=>{
    let id = req.params.id;
    try{
        let response = await movieModel.updateOne({mv_id: id},{$set : {mv_tag : 'promo'}})
        console.log(response)
        if(response.acknowledged){
            if(response.modifiedCount > 0){
                res.send({status : true, message : 'movie updated successfully.'});
            }else{
                res.send({status : false, message : 'no changes found in movie'});
            }
        }else{
            res.send({status : false, message : 'something went wrong'});
        }
    }catch(error){
        console.log(error);
            res.send({status : false, message : 'something went wrong'});
    }
}
exports.unsetPromo = async (req,res)=>{
    let id = req.params.id;
    try{
        let response = await movieModel.updateOne({mv_id: id},{$set : {mv_tag : 'normal'}})
        console.log(response)
        if(response.acknowledged){
            if(response.modifiedCount > 0){
                res.send({status : true, message : 'movie updated successfully.'});
            }else{
                res.send({status : false, message : 'no changes found in movie'});
            }
        }else{
            res.send({status : false, message : 'something went wrong'});
        }
    }catch(error){
        console.log(error);
        res.send({status : false, message : 'something went wrong'});
    }
}
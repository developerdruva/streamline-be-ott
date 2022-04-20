const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var movieSchema = new Schema(
    {
        mv_name : {
            type: String,
            required: true
        },
        mv_id : {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        movie : {
            mv_vid: {
                type: String,
                required: true
            },
            mv_titlepic : {
                type: String,
                required: true
            },
            mv_poster: {
                type: String,
                required: true
            },
        },
        mv_genre: {
            type: String,
            required: true
        },
        votes:{
            likes:{
                type: Number,
                required: true
            },
            dislikes:{
                type: Number,
                required: true
            }
        },
        mv_year: {
            type: String,
            required: true
        },
        mv_tag : {
            type: String, 
            required: true
        },
        overview: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('movies', movieSchema);
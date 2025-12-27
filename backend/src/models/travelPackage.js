const mongoose = require("mongoose");

const travelPackageSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true 
        },

        description:{
            type:String,
            required:true 
        },

        price:{
            type:Number,
            required:true 
        },

        duration:{
            type:String,
            required:true 
        },

        location:{
            type:String,
            required:true 
        },

        availableSlots:{
            type:Number,
            required:true 
        },

        image:{
            type:String
        },

        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true 
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model("travelPackage", travelPackageSchema)
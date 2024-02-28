const mongoose = require("mongoose");

const CaptionSchema = new mongoose.Schema({
    CaptionID: { type: Number },
    UserAvatar: { type: String },
    UserID: { type: Number },
    UserName : {type : String},
    Captions : {type : String},
    Tags : {type : String }
},
);



module.exports = mongoose.model("cocs", CaptionSchema);
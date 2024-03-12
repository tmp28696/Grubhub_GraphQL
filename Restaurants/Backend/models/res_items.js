var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Items = mongoose.model('res_items',{
    res_email :{
        type : String,
    },
    cuisine:{
        type: String
    },
    res_name :{
        type : String,
        ref: 'Restaurant'
    },
    item_name:{
        type : String
    },
    item_desc:{
        type : String
    },
    item_price : {
        type : Number
    },
    menu_sec:{
        type : String
    },
});

module.exports = {Items};


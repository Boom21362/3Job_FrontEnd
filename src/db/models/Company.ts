import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,'Please add a name'],
        unique : true,
        trim : true,
        maxlength:[100,'Name can not be more than 100 characters']
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    website:{
        type:String,
        required:[true,'Please add a company\'s website']
    },
    description:{
        type:String,
        required:[true,'Please add description'],
    },
    tel:{
        type:String,
        required:[true,'Please add a telephone number']
    }, 
    specializations: [{
        type: String,
        default: []
    }],
    compimgsrc:{
        type:String,
        trim:true,
        default:"https://placehold.co/600x400?text=Picture"
    }
});

const Company = mongoose.models.Company || mongoose.model("Car",CompanySchema)
export default Company

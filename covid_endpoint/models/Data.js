const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    FIPS: String,
    Admin2: String,
    Province_State: String,
    Country_Region: String,
    Last_Update: String,
    Lat: String,
    Long_: String,
    Confirmed: String,
    Deaths: String,
    Recovered: String,
    Active: String,
    Combined_Key: String,
    Incidence_Rate: String,
    'Case-Fatality_Ratio': String
})

const DataModel = mongoose.model('case', DataSchema);

module.exports = DataModel;
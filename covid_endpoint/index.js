const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


const fs = require('fs');
const neatcsv = require('neat-csv');
const DataModel = require('./models/Data')


const port = 5500;
const app = express();


app.use(cors());

let db = async () => {
    const conn = await mongoose.connect('mongodb://localhost:27017/covid-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true


    }).then((con) => {
        return con;
    }).catch((err) => {
        console.log(err)
    })

    if(conn) {
        console.log('mongodb connection established...');
        let readFile = () => {
            return fs.promises.readFile('./data/covid_19 data.csv', {
                encoding: 'utf8'
            })
        }


        let csv = await readFile();
        let data = await neatcsv(csv);


        let cases = await DataModel.find()

        if(cases.length){
            console.log("cases has been imported...")
        } else {
            for (let datum of data) {
                let dataModel = new DataModel()
                dataModel.FIPS = datum.FIPS
                dataModel.Admin2 = datum.Admin2
                dataModel.Province_State = datum.Province_State
                dataModel.Country_Region = datum.Country_Region
                dataModel.Last_Update = datum.Last_Update
                dataModel.Lat = datum.Lat
                dataModel.Long_ = datum.Long_
                dataModel.Confirmed = datum.Confirmed
                dataModel.Deaths = datum.Deaths
                dataModel.Recovered = datum.Recovered
                dataModel.Active = datum.Active
                dataModel.Combined_Key = datum.Combined_Key
                dataModel.Incidence_Rate = datum.Incidence_Rate
                dataModel['Case-Fatality_Ratio'] = datum['Case-Fatality_Ratio']
                await dataModel.save()
                .then()
                .catch((err) => console.log(err.message));
            }
            console.log('Done with mongodb importation...')
        }
    }
}

// function call to import connect mongo instance and import db
db();

app.get('/', async (req,res) => {
  res.send('Welcome to my covid api...')  
})

app.get('/cases', async (req,res) => {
    const cases = await DataModel.find().then((cases) => {
        return cases;
    }).catch((err) => {
        res.send(err.message)
    });

    let allCases = []
    if(cases){
        for(let data of cases){
            allCases.push({
                Country_Region: data.Country_Region,
                Confirmed: data.Confirmed,
                Deaths: data.Deaths,
                Recovered: data.Recovered,
                Active: data.Active,
            })
        }
    }

    res.json(allCases)
});

app.get('/total-cases', async (req,res) => {
    let cases = await DataModel.find().then((cases) => {
        return cases;
    }).catch((err) => {
        res.send(err.message)
    });

    if(cases.length){
        let totalCases = cases.map((data) => {
            return parseInt(data.Confirmed)
        }).reduce((a,b) => {
            return a+b;
        },0)

        res.json(totalCases)
    }
})

app.get('/total-active', async (req, res) => {
    let cases = await DataModel.find().then((cases) => {
        return cases;
    }).catch((err) => {
        res.send(err.message)
    });

    if (cases.length) {
        let totalActive = cases.map((data) => {
            return parseInt(data.Active)
        }).filter((f) => {
            if(f !== null){
                return f;
            }
        }).reduce((a,b) => {
            return a+b;
        },0)
        res.json(totalActive)
    }
});

app.get('/total-recovered', async (req, res) => {
    let cases = await DataModel.find().then((cases) => {
        return cases;
    }).catch((err) => {
        res.send(err.message)
    });

    if (cases.length) {
        let totalRecovered = cases.map((data) => {
            return parseInt(data.Recovered)
        }).filter((f) => {
            if (f !== null) {
                return f;
            }
        }).reduce((a, b) => {
            return a + b;
        }, 0)
        res.json(totalRecovered)
    }
});

app.get('/total-deaths', async (req, res) => {
    let cases = await DataModel.find().then((cases) => {
        return cases;
    }).catch((err) => {
        res.send(err.message)
    });

    if (cases.length) {
        let totalDeaths = cases.map((data) => {
            return parseInt(data.Deaths)
        }).filter((f) => {
            if (f !== null) {
                return f;
            }
        }).reduce((a, b) => {
            return a + b;
        }, 0)
        res.json(totalDeaths)
    }
});


app.listen(port, () => {
    console.log(`running on port ${port}`)
})
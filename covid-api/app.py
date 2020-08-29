from flask import Flask , jsonify
from flask_cors import CORS
import requests



app = Flask(__name__)
CORS(app)

base_url = 'https://coronavirus-19-api.herokuapp.com'

@app.route('/get-all-cases')
def get_all_cases():
    all_cases = requests.get(base_url + '/countries').json()
    return jsonify(all_cases)

@app.route('/get-cases-by-country/<country>')
def get_cases_by_country(country):
    case = requests.get(base_url + '/countries/'+country).json()
    return case

@app.route('/<country>/active')
def get_active_cases(country):
    case = requests.get(base_url + '/countries/'+country).json()
    return jsonify(case['active'])

@app.route('/<country>/cases')
def get_cases(country):
    case = requests.get(base_url + '/countries/'+country).json()
    return jsonify(case['cases'])

@app.route('/<country>/recovered')
def get_recivered(country):
    case = requests.get(base_url + '/countries/'+country).json()
    return jsonify(case['recovered'])

@app.route('/<country>/deaths')
def get_death(country):
    case = requests.get(base_url + '/countries/'+country).json()
    return jsonify(case['deaths'])
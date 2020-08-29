let url = 'http://localhost:5000/';
let cases = [];
let totalCases = 0
let totalRecovered = 0
let totalActive = 0
let totalDeaths = 0
let country = 'world'


window.onload = async () => {
    await allCases()
    await getTotalCases(country)
    await getTotalRecovered(country)
    await getTotalActive(country)
    await getTotalDeaths(country)

    console.log(totalCases)
    document.querySelector('#total-cases').innerHTML = totalCases
    document.querySelector('#total-recovered').innerHTML = totalRecovered
    document.querySelector('#total-active').innerHTML = totalActive
    document.querySelector('#total-deaths').innerHTML = totalDeaths
    document.querySelector('.loader').style.display = 'none'
    
    let tbody = document.querySelector('#tbd');
    for(let elem of cases){
        if(elem.country !== 'World'){
            let tr = tbody.appendChild(document.createElement('tr'))
            tr.setAttribute('class', 'ntr');
            tr.appendChild(document.createElement('td')).innerHTML = elem.country
            tr.appendChild(document.createElement('td')).innerHTML = elem.active
            tr.appendChild(document.createElement('td')).innerHTML = elem.recovered
            tr.appendChild(document.createElement('td')).innerHTML = elem.deaths
            tr.appendChild(document.createElement('td')).innerHTML = elem.cases
        }
    }
}

let allCases = () => {
    return fetch(url + 'get-all-cases')
    .then((response) => {
        return response.json()
    }).then((res) => {
        cases = res
    }).catch((err) => {
        console.log(err)
    })
}

let getTotalCases = (country) => {
    return fetch(url + country + '/cases')
    .then((response) => {
        return response.json();
    }).then((res) => {
        totalCases = res
    }).catch((err) => {
        console.log(err)
    })
}

let getTotalRecovered = (country) => {
    return fetch(url + country + '/recovered')
        .then((response) => {
            return response.json();
        }).then((res) => {
            totalRecovered = res
        }).catch((err) => {
            console.log(err)
        })
}

let getTotalActive = (country) => {
    return fetch(url + country + '/active')
        .then((response) => {
            return response.json();
        }).then((res) => {
            totalActive = res
        }).catch((err) => {
            console.log(err)
        })
}

let getTotalDeaths = (country) => {
    return fetch(url + country + '/deaths')
        .then((response) => {
            return response.json();
        }).then((res) => {
            totalDeaths = res
        }).catch((err) => {
            console.log(err)
        })
}




const request = require('request-promise');

function getCovidData(country) {
    return new Promise((resolve, reject) => {
       let countryClean= country.charAt(0).toUpperCase() + country.slice(1);
       let index;
        let options = {
            json: true,
            method: 'GET',
            url: process.env.COVID_URL
        };

        request(options)
            .then((data)=> {
                for (i = 0; i < data.length; i++) {
                    if (data[i].country == countryClean) {
                       index = i;
                        break;
                    }
                }

                resolve({
                    "infected": data[index].infected,
                    "tested": data[index].tested,
                    "recovered": data[index].recovered,
                    "deceased": data[index].deceased,
                    "country": data[index].country,
                    "lastUpdated": data[index].lastUpdatedApify
                })

            })
            .catch((err)=>{
                console.log(err);
                reject();
            })
    })
}

module.exports = { getCovidData };
const mailService=require('../services/mail.service');
const covidDataService=require('../services/covidData.service')

const countryInQuery = async (req, res) => {
  try {
    let country = req.query.country;

    let covidData = await covidDataService.getCovidData(country);

    mailService.sentMail(res.locals.userData.mail+' has accessed covid route with query parameters for country ' + country);

    res.status(200).json(covidData);
  }
  catch (err) {
    res.status(404).json({
      message: 'Sorry,we currently dont have data for this country'
    })
  }
}

const countryInPath = async (req, res) => {
  try {
    let country = req.params.name;

    let covidData = await covidDataService.getCovidData(country);

    mailService.sentMail(res.locals.userData.mail+' has accessed covid route with path parameters for country ' + country);
    
    res.status(200).json(covidData);
  }
  catch (err) {
    res.status(404).json({
      message: 'Sorry,we currently dont have data for this country'
    })
  }
}

module.exports={countryInPath,countryInQuery}
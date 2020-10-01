const https = require("https");

function datosCovid(pais, callback) {

    // Casos confirmados por pais
    var url = "https://api.covid19api.com/total/dayone/country/" + pais + "/status/confirmed";

    https.get(url, (resp) => {

        let data = "";

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            callback(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}

datosCovid( "argentina" ,confirmados => {
    let casosConfirmadosHoy = confirmados[confirmados.length -1];
    console.log('Pais:' + casosConfirmadosHoy.Country);
    console.log('Total de casos confirmados: ' + casosConfirmadosHoy.Cases);
    console.log('Fecha: ' + casosConfirmadosHoy.Date);
});

/* ********************************************************************** */
/* ********************************************************************** */
/*              OTRA FORMA DE HACER LA PETICION USANDO PROMESAS           */
/* ********************************************************************** */
/* ********************************************************************** */

/* const rp = require('request-promise')
url = 'https://api.covid19api.com/total/dayone/country/argentina/status/confirmed'

rp(url).then( response => JSON.parse(response)).then(confirmados => {

    let casosConfirmadosHoy = confirmados[confirmados.length -1];
    console.log('Pais:' + casosConfirmadosHoy.Country);
    console.log('Total de casos confirmados: ' + casosConfirmadosHoy.Cases);
    console.log('Fecha: ' + casosConfirmadosHoy.Date);

}).catch( error => console.log(error)) */



/* ********************************************************************** */
/* ********************************************************************** */
/*          OTRA FORMA DE HACER LA PETICION Y OTRO RECUSO DE LA API       */
/* ********************************************************************** */
/* ********************************************************************** */


/* const request = require('request')

// Este recurso devuelve los datos a nivel mundial y de cada pais
let url = 'https://api.covid19api.com/summary' 

request(url, function(error, response, body1){

    let body = JSON.parse(body1)
    console.log("\t~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("\t Situación a nivel Mundial ")
    console.log("\t~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("\tCantidad de Confirmados: " + body.Global.NewConfirmed)
    console.log("\tTotal de Confirmados: " + body.Global.TotalConfirmed)
    console.log("\tCantidad de muertos: " + body.Global.NewDeaths)
    console.log("\tTotal de muertos: " + body.Global.TotalDeaths)
    console.log("\tCantidad de recuperados: " + body.Global.NewRecovered)
    console.log("\tTotal de recuperados: " + body.Global.TotalRecovered + "\n\n")

    let paises = body.Countries;

    paises.forEach( pais => {
        console.log("~~~~~~~~ " + pais.Country + " ~~~~~~~~")
        console.log("Cantidad de Confirmados: " + pais.NewConfirmed)
        console.log("Total de Confirmados: " + pais.TotalConfirmed)
        console.log("Cantidad de muertos: " + pais.NewDeaths)
        console.log("Total de muertos: " + pais.TotalDeaths)
        console.log("Cantidad de recuperados: " + pais.NewRecovered)
        console.log("Total de recuperados: " + pais.TotalRecovered + "\n")    
    });

}) */


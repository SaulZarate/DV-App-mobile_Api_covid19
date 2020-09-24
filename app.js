const https = require("https");

function datosCovid(pais, callback){
    
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

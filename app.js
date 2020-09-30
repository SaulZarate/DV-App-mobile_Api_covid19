const https = require("https");

/* ************************************************ */
/*                      OPCION 1                    */
/* ************************************************ */
// function datosCovid(pais, callback) {

/* ************************************************ */
/*                      OPCION 2                    */
/* ************************************************ */
function datosCovid( callback ) {

    /* ************************************************ */
    /*                      OPCION 1                    */
    /* ************************************************ */
    // Casos confirmados por pais
    // var url = "https://api.covid19api.com/total/dayone/country/" + pais + "/status/confirmed";


    /* ************************************************ */
    /*                      OPCION 2                    */
    /* ************************************************ */
    // Un resumen de la situacion por país actualizado diariamente.
    var url = "https://api.covid19api.com/summary";

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

/* ************************************************ */
/*                      OPCION 1                    */
/* ************************************************ */
/* datosCovid( "argentina" ,confirmados => {
    let casosConfirmadosHoy = confirmados[confirmados.length -1];
    console.log('Pais:' + casosConfirmadosHoy.Country);
    console.log('Total de casos confirmados: ' + casosConfirmadosHoy.Cases);
    console.log('Fecha: ' + casosConfirmadosHoy.Date);
}); */


/* ************************************************ */
/*                      OPCION 2                    */
/* ************************************************ */
datosCovid( datos => {

    console.log("\t~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("\t Situación a nivel Mundial ")
    console.log("\t~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("\tCantidad de Confirmados: " + datos.Global.NewConfirmed)
    console.log("\tTotal de Confirmados: " + datos.Global.TotalConfirmed)
    console.log("\tCantidad de muertos: " + datos.Global.NewDeaths)
    console.log("\tTotal de muertos: " + datos.Global.TotalDeaths)
    console.log("\tCantidad de recuperados: " + datos.Global.NewRecovered)
    console.log("\tTotal de recuperados: " + datos.Global.TotalRecovered + "\n\n")

    let paises = datos.Countries;

    paises.forEach( pais => {
        console.log("~~~~~~~~ " + pais.Country + " ~~~~~~~~")
        console.log("Cantidad de Confirmados: " + pais.NewConfirmed)
        console.log("Total de Confirmados: " + pais.TotalConfirmed)
        console.log("Cantidad de muertos: " + pais.NewDeaths)
        console.log("Total de muertos: " + pais.TotalDeaths)
        console.log("Cantidad de recuperados: " + pais.NewRecovered)
        console.log("Total de recuperados: " + pais.TotalRecovered + "\n")    
    });
    
});

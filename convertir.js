const fs = require("fs");
const { exec } = require("child_process");

let listaDeArchivos = fs.readdirSync(__dirname + "/Archivos_pdf");

let onlyPdf = listaDeArchivos.filter((item) => {
    return item.includes(".pdf") && !item.includes(".jpeg") && !item.includes('.jpg');
})



onlyPdf.forEach(archivo => {
    let nombreSalida;
    try {
        nombreSalida = archivo.replace('.pdf', '');
    } catch (error) {
        return console.error("Los nombres de archivos deben tener extensión .pdf" + error);
    }
    const comando = `pdftoppm -jpeg ./Archivos_pdf/${archivo} ${nombreSalida}`
    exec(comando, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`${archivo} listo!`);
    });

});



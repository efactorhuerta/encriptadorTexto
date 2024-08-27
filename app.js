
const soloMinuscula = /^[a-z\s]+$/;
let textoInput = document.querySelector('#textoArea');
let mensajeInical = document.querySelector(".mensaje-inicial");
let cajaTextoFinal = document.querySelector("#textoFinal");
let resultadoTexto = '';
const reglaEncriptacion = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};


async function copiarContenido() {
    try {
        await navigator.clipboard.writeText(cajaTextoFinal.innerHTML);
        alert("Texto encriptado ah sido copiado en el portapapeles");
    } catch (err) {
    }
}

function procesarTexto(cadena, tipoEvento){
    if (!soloMinuscula.test(cadena)) {
        alert("El texto no debe contener mayusculas ni caracteres especiales");
        resultadoTexto = '';
        return;
    }
    switch (tipoEvento){
        case 'ENCRIPTAR':
            console.log(reglaEncriptacion);
            const regexEncripta = new RegExp(Object.keys(reglaEncriptacion).join('|'), 'g');
            resultadoTexto=cadena.replace(regexEncripta, match => reglaEncriptacion[match]);
            break;
        case 'DESENCRIPTAR':
            const reglaDescencripta = Object.fromEntries(
                Object.entries(reglaEncriptacion).map(([key, value]) => [value, key])
            );
            const regexDesencripta = new RegExp(Object.keys(reglaDescencripta).join('|'), 'g');
            resultadoTexto = cadena.replace(regexDesencripta, match => reglaDescencripta[match]);

            break;
        default:
            console.log('EVENTO NO DEFINIDO');
            break;
    }
    document.querySelector(".boton-copiar").style.display = "block";
    mensajeInical.style.display = "none";
    cajaTextoFinal.innerHTML = resultadoTexto;

}
function encrypt(){
    document.querySelector(".boton-copiar").style.display = "none";
    mensajeInical.style.display = "block";
    cajaTextoFinal.innerHTML = '';
    procesarTexto(textoInput.value, 'ENCRIPTAR');
}
function desencrypt(){
    document.querySelector(".boton-copiar").style.display = "none";
    mensajeInical.style.display = "block";
    cajaTextoFinal.innerHTML = '';
    procesarTexto(textoInput.value,'DESENCRIPTAR');
}


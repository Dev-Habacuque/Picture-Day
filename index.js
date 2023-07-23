window.addEventListener('load', obterDados);

const button = document.querySelector('#button')
const tutle = document.querySelector('#title')
const nasaImg = document.querySelector('#nasaImg')
const paragrafo = document.querySelector('#paragrafo')

let toggleButton = true

const Nasa_api = 'MwUQB4OXcGlD70sfoyELB8JAZa88NlQVlB8XzlZR'
const rota = `https://api.nasa.gov/planetary/apod?api_key=${Nasa_api}`;



function obterDados() {
    fetch(rota)
        .then(resposta => resposta.json())
        .then(resultado => mostrarDados(resultado))

}




function mostrarDados({ date, explanation, title, url }) {

    const titulo = document.querySelector('#titulo');
    titulo.innerHTML = title;
    const fecha = document.querySelector('#fecha');
    fecha.innerHTML = date;
    const descripcion = document.querySelector('#descripcion');
    descripcion.innerHTML = explanation;
    const foto = document.querySelector('#foto');
    foto.innerHTML = `<img src="${url}" alt="${url}">`
}
const input = document.querySelector('#dataInput')
input.addEventListener("input", function () {
    let valor = input.value;
    let formattedValue = formattedData(valor);
    input.value = formattedValue;

    console.log(valor.length)

    if (valor.length >= 10) {
        toggleButton = false

        button.setAttribute('type', 'button')
        button.innerText = 'enviar'

    } else if (valor.length < 10 || valor == '') {
        toggleButton = true
        button.setAttribute('type', 'reset')
        button.innerText = 'reset'
    }

});

button.addEventListener('click', () => {

    if (toggleButton) {
        input.value = ''
        return
    }

    fetch(`${rota}&date=${input.value}`)
        .then(Response => Response.json())
        .then(dado => {
            console.log(dado)
            title.innerText = dado.title
            nasaImg.setAttribute('src', dado.hdurl)
            paragrafo.innerText = dado.explanation


        })

})


function formattedData(valor) {
    valor = valor.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    let dia = valor.substring(6, 8);
    let mes = valor.substring(4, 6);
    let ano = valor.substring(0, 4);

    if (valor.length > 7) {
        // Limita o comprimento do valor
        valor = valor.substring(0, 8);
    }
    if (valor.length > 4) {
        valor = [ano, mes, dia].join("-");
    } else if (valor.length > 0) {
        valor = [ano, mes].join("-");
    }

    return valor;
}















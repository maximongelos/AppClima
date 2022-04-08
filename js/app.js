const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
	formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
	e.preventDefault();

	//*Validar
	const ciudad = document.querySelector('#ciudad').value;
	const pais = document.querySelector('#pais').value;

	if (ciudad === '' || pais === '') {
		//!Hubo un error
		mostrarError('Ambos campos son obligatorios');

		return;
	}

	//*Consultamos la API
	consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
	const alerta = document.querySelector('.bg-red-100');

	if (!alerta) {
		//*Crear alerta
		const alerta = document.createElement('div');

		alerta.classList.add(
			'bg-red-100',
			'border-red-100',
			'text-red-400',
			'px-4',
			'py-3',
			'rounded',
			'max-w-md',
			'mx-auto',
			'mt-6',
			'text-centers'
		);

		alerta.innerHTML = `
		<strong class="font-bold">Error! </strong>
		<span class="block">${mensaje}</span>
		`;

		container.appendChild(alerta);

		setTimeout(() => {
			alerta.remove();
		}, 5000);
	}
}

function consultarAPI(ciudad, pais) {
	const appID = '1cee9ab8972f36fbb49841da40f48dad';

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

	Spinner();

	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((datos) => {
			limpiarHTML();

			if (datos.cod === '404') {
				mostrarError('Ciudad no encontrada');

				return;
			}

			//*Imprimir la respuesta en el HTML
			mostrarClima(datos);
		});
}

const cambiarGrados = (grados) => parseInt(grados - 273.15);

function mostrarClima(datos) {
	const {
		name,
		main: {temp, temp_max, temp_min},
	} = datos;

	const temperatura = cambiarGrados(temp);
	const temperaturaMaxima = cambiarGrados(temp_max);
	const temperaturaMinima = cambiarGrados(temp_min);

	const nombreCiudad = document.createElement('p');
	nombreCiudad.textContent = `Clima en ${name}`;
	nombreCiudad.classList.add('font-bold', 'text-2xl');

	const actual = document.createElement('p');
	actual.innerHTML = `${temperatura} &#8451; <hr>`;
	actual.classList.add('font-bold', 'text-6xl');

	const tempMax = document.createElement('p');
	tempMax.innerHTML = `Max : ${temperaturaMaxima} &#8451; <hr>`;
	tempMax.classList.add('text-6xl');

	const tempMin = document.createElement('p');
	tempMin.innerHTML = `Min : ${temperaturaMinima} &#8451; <hr>`;
	tempMin.classList.add('text-6xl');

	const resultadoDiv = document.createElement('div');
	resultadoDiv.classList.add('text-center', 'text-white');

	resultadoDiv.appendChild(nombreCiudad);
	resultadoDiv.appendChild(actual);
	resultadoDiv.appendChild(tempMax);
	resultadoDiv.appendChild(tempMin);

	resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

function Spinner() {
	limpiarHTML();

	const divSpinner = document.createElement('div');
	divSpinner.classList.add('sk-fading-circle');

	divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
	resultado.appendChild(divSpinner);
}

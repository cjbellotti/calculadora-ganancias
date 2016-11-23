$(document).ready(function() {
	
	$('#calcular').on('click', function() {
		calcular();
	})

	$(document).keypress(function(e) {
	  if (e.keyCode == 13) {
		e.preventDefault();
		calcular();
	  }
	});

});


var topesEscalas = [61000, 91000, 122000, 182000, 243000, 426000,99999999];
var porcentajesEscalas = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35];
var fijosEscalas = [3050, 6050, 10700, 22700, 37950, 92850];

var MINIMO_NO_IMPONIBLE = 48666;
var ADICIONAL_4TA_CATEGORIA = 223596.80;
var HIJO = 22872;

function calcular() {
			
	var hijosComponent = document.getElementById("hijos");
	var cantHijos = hijosComponent.options[hijosComponent.selectedIndex].value;
	
	
	var sueldoNeto = sueldoBruto * 0.83;
	var sueldoNetoAnual = sueldoNeto * 13;
	
	//var MNI_anual = 42318+203126+39778*cantFamiliares+19889*cantHijos;
	var MNI_anual = MINIMO_NO_IMPONIBLE+ADICIONAL_4TA_CATEGORIA+HIJO*cantHijos;
	var MNI_mensual = MNI_anual / 13;
	
	var MontoImponibleAnual =  0;
	if(MNI_anual < sueldoNetoAnual)
	{
		MontoImponibleAnual = sueldoNetoAnual - MNI_anual;
	}
	
	var MontoImponibleMensual = MontoImponibleAnual / 13;
	
	var totalEscalas = [0, 0, 0, 0, 0, 0,0];

	//Calculo Escalas
	for (var i=0; i<totalEscalas.length; i++) 
	{
	 	totalEscalas[i] = calcularValorEscala(i,MontoImponibleAnual);
	 	if(totalEscalas[i] != fijosEscalas[i])
	 	{
	 		break;
	 	}
	}

	//Calculo Resultados
	var impuestoAnual = 0;
	
	for (var i=0; i<totalEscalas.length; i++) 
	{
	  impuestoAnual =  impuestoAnual + totalEscalas[i];
	}

	$("#impuestoAnual").text("$" + Math.ceil(impuestoAnual) + ".00");
	

	var impuestoMensual = impuestoAnual / 13;
	$("#impuestoMensual").text("$" + Math.ceil(impuestoMensual) + ".00");
	var alicuota = (impuestoMensual / sueldoNeto)*100;
	
	$("#alicuota").text(alicuota.toFixed(2) + "%");
	
	var sueldoEnMano = sueldoNeto - impuestoMensual;
	$("#sueldoEnMano").text("$" + Math.ceil(sueldoEnMano) + ".00");
	
	
}


function calcularValorEscala(numeroEscala,montoImponibleAnual) 
{
	var resultado = 0;
	var montoEscala = 0;
	if(numeroEscala > 0)
	{
		montoEscala = topesEscalas[numeroEscala - 1];
	}

	if(montoImponibleAnual < topesEscalas[numeroEscala])
	{
			resultado = (montoImponibleAnual - montoEscala) * porcentajesEscalas[numeroEscala];
	}
	else
	{
			resultado = fijosEscalas[numeroEscala];
	}

	return resultado;
}

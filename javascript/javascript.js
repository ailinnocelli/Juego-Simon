$(document).on ("ready", function (){
	//Esta es la velocidad con la que se muestra la animacion
	//de prender cada boton cuando se muestra la secuencia
	var secuenceSpeed = 1000;
	var resultado =true;
	var contador = 0;
	var	index = 0;
	secuenciaDelJuego = new Array();
	secuenciaDelUsuario = new Array();
	var mensaje="Bien ! Sigamos jugando!";
	var sonido = true;

	$("#comenzar").on ("click", function(){
		reproducirAudio (sonido);
		cambioDeBotones();
		secuenciaDelJuego = sumarUnMovimiento(secuenciaDelJuego, index);
		index ++		
		mostrarSecuenciaDelJuego(secuenciaDelJuego,aJugar);
	});
	
	$(".boton").on ("click", function(){
		reproducirAudio (sonido);
		var self = this;
		var numeroQueClickeoElUsuario = clickUsuario(self);
		guardarNumeroQueClickeoElUsusarioEnArray(secuenciaDelUsuario,contador,numeroQueClickeoElUsuario);
		var resultadoParcial = compararPosicionActualEnSecuencia(secuenciaDelJuego,secuenciaDelUsuario, contador);
		contador ++
		perdiste(resultadoParcial, mensaje, secuenciaDelUsuario, secuenciaDelJuego);
	});
	$("#ok").on("click", function(){
		reproducirAudio (sonido);
		resultadoTotalDeSecuencias = compararSecuenciasCompletas(secuenciaDelJuego, secuenciaDelUsuario);
		contador = 0;
		if(resultadoTotalDeSecuencias == true){
			mostrarMensaje(mensaje);
		}else {
			perdiste(resultadoTotalDeSecuencias, mensaje, secuenciaDelUsuario, secuenciaDelJuego);
		};
		
		secuenciaDelJuego = sumarUnMovimiento(secuenciaDelJuego, index);
		index ++
		mostrarSecuenciaDelJuego(secuenciaDelJuego,aJugar);
	});
	$(".stop").on("click", function(){
		sonido=false;
	});
	$(".play").on ("click", function(){
		sonido=true;
	});

	function reproducirAudio(sonido){
		try{
			if(sonido==true){
				document.getElementById("audio").play("button_tiny");
			}
			
		}catch(e){
		}
	}

	function cambioDeBotones (){
		$("#comenzar").addClass("oculto");
		$("#ok").removeClass("chiquito");
		$("#ok").addClass("boton-rojo");
	};
	function sumarUnMovimiento(secuenciaDelJuego, index){
		var numeroRandom = Math.floor((Math.random() * 4)+1);
		secuenciaDelJuego [index] = numeroRandom;
		return secuenciaDelJuego;
	};
	function mostrarSecuenciaDelJuego (secuenciaDelJuego,callBackFunction){
 		//MODIFICAR ESTA FUNCION
 		var ul = $("#secuenciaDeJuego");
 		var cantidadDeVueltas = secuenciaDelJuego.length;
 		var contador = 0;
 		var intervalID =
 		setInterval(function(){
 			if (contador == cantidadDeVueltas){
 				clearInterval(intervalID);
 				callBackFunction();
 			}else{
 				var valorDeCasilleroSecuenciaDelJuego = secuenciaDelJuego[contador]
 				if(valorDeCasilleroSecuenciaDelJuego==1){
 					mostrarSecuenciaEnCasillero("1", "uno-secuencia");
 				}if(valorDeCasilleroSecuenciaDelJuego==2){
 					mostrarSecuenciaEnCasillero ("2", "dos-secuencia");
 				}if(valorDeCasilleroSecuenciaDelJuego==3){
 					mostrarSecuenciaEnCasillero ("3", "tres-secuencia");
 				}if(valorDeCasilleroSecuenciaDelJuego==4){
 					mostrarSecuenciaEnCasillero ("4", "cuatro-secuencia");
 				}
 				var li = document.createElement("li");
 				li.innerHTML = valorDeCasilleroSecuenciaDelJuego;
 				$(ul).append(li);
 				++contador;
 			}
 		}, secuenceSpeed)
 	};
 	function mostrarSecuenciaEnCasillero (idDelCasilleroQueSeVaAMostrar, claseDelCasilleroQueSeVaAMostrar){
 		$("#"+idDelCasilleroQueSeVaAMostrar).addClass(claseDelCasilleroQueSeVaAMostrar).delay(secuenceSpeed / 2).queue(function(){
 			$(this).removeClass(claseDelCasilleroQueSeVaAMostrar).dequeue();
 		});
 	};
 	function aJugar (){
 		alert ("A jugar !");
 	};

 	function clickUsuario(self){
 		numeroQueClickeoElUsuario = $(self).attr("id");
 		return numeroQueClickeoElUsuario;
 	};
 	function guardarNumeroQueClickeoElUsusarioEnArray(secuenciaDelUsuario,contador,numeroQueClickeoElUsuario){
 		secuenciaDelUsuario[contador] = numeroQueClickeoElUsuario;
 		return secuenciaDelUsuario;
 	};

 	function compararPosicionActualEnSecuencia(secuenciaDelJuego,secuenciaDelUsuario, contador){
 		var posicionDeSecuenciaUsuario = secuenciaDelUsuario[contador];
 		var posicionDeSecuenciaJuego = secuenciaDelJuego [contador];
 		if(posicionDeSecuenciaUsuario == posicionDeSecuenciaJuego){
 			return true;
 		}else {
 			return false;
 		};
 	};

 	function mostrarMensaje (mensaje){
 		alert (mensaje);
 	};

 	function perdiste(resultadoParcial, mensaje, secuenciaDelUsuario, secuenciaDelJuego){
 		if (resultadoParcial == false){
 			mensaje="Perdiste!";
 			mostrarMensaje(mensaje);
 			reiniciar(secuenciaDelUsuario, secuenciaDelJuego);
 		};
 	};

 	function compararSecuenciasCompletas(secuenciaDelUsuario, secuenciaDelJuego){
 		for(i=0; i<= secuenciaDelUsuario.length; i++){
 			if(secuenciaDelJuego[i]==secuenciaDelUsuario[i]){
 				return true;
 			}else{
 				return false;
 			};	
 		};
 	};

 	function reiniciar(secuenciaDelUsuario, secuenciaDelJuego){
 		contador = 0;
 		index = 0;
 		secuenciaDelUsuario = new Array();
 		secuenciaDelJuego = new Array();
 	};



 })
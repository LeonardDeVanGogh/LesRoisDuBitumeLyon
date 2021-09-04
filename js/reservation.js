// Objet réservation
// Récupère les infos du localStorage
// Gère le volet de reservation
// Display la signature

let Reservation = {

	prenom:localStorage.getItem("forname"),
	nom:localStorage.getItem("name"),
	signature:document.getElementById("signature"),
	station:document.getElementById("station"),
    reservation:document.getElementById("reservation"),
	buttonSignature:document.getElementById("buttonSignature"),
	resume:document.getElementById("resume"),
	timerElt:document.getElementById("chrono"),
	fornameError:document.getElementById("prenom"),
	nameError:document.getElementById("nom"),
	confirmationReservation:document.getElementById("confirmationReservation"),
	canvas:document.getElementById('canvas'),
	ctx:canvas.getContext('2d'),
	reservation:document.getElementById("reservation"),
	init(){
		initCanvas();
		this.getUserInfos();
		this.buttonSignatureClick();
		this.buttonCancelBookingClick();

	    if(sessionStorage.getItem('id')===null){
	        confirmationReservation.style.display = 'none';
	    }
	    else{
	        resume.textContent = "Vélo réservé à la station " + sessionStorage.getItem("nameStation") + " ,par " + localStorage.getItem("forname") + " " + localStorage.getItem("name");
	        timerElt = document.getElementById("chrono");
	        timer = setInterval (function(){
	            timerElt.innerText = "La réservation expire dans " + Math.trunc(sessionStorage.getItem('timer')/60) + "mins et " + sessionStorage.getItem('timer') % 60 + "sec.";
	            let counter = sessionStorage.getItem('timer');
	            counter -- ;
	            sessionStorage.setItem('timer',counter);
	            if(sessionStorage.getItem('timer')!==null && sessionStorage.getItem('timer')<= 0){
	                setTimeout(function(){
	                    timerElt.innerText = "Réservation perdue";
	                    sessionStorage.clear();
	                    signatureCanvas=[];
	                    document.getElementById('signature').style.display = 'none';
	                    clearInterval(timer);
	                },1000);
	            }
	        },1000);
	        document.getElementById('buttonCancelBooking').scrollIntoView();
	    };		
	},

	getUserInfos(){
		document.getElementById("prenom").value = this.prenom;
		document.getElementById("nom").value = this.nom;		
	},

	buttonSignatureClick(){
		this.buttonSignature.addEventListener('click',function(){
			Reservation.fornameError.style.backgroundColor = "white";
			Reservation.nameError.style.backgroundColor = "white";
			Reservation.prenom = document.getElementById("prenom").value;
			Reservation.nom = document.getElementById("nom").value;
			localStorage.setItem("forname",Reservation.prenom);
			localStorage.setItem("name",Reservation.nom);

			if(sessionStorage.getItem("nameStation") !== "" && localStorage.getItem("name") !== "" && localStorage.getItem("forname") !== "" && sessionStorage.getItem("velosStation")>0){
				Reservation.signature.style.display = 'block';
				Reservation.signature.style.display = '-webkit-block';
				Reservation.signature.style.display = '-moz-block';
				Reservation.station.style.display = "none";
				Reservation.reservation.style.display = "none";
				Reservation.fornameError.style.backgroundColor = "white";
				Reservation.nameError.style.backgroundColor = "white";

			    Reservation.ctx.clearRect(0, 0, canvas.width, canvas.height);
		    	signatureCanvas=[];	
		    	document.querySelector("#canvas").scrollIntoView();
			}
			else
			{
				if(Reservation.prenom===""){
					
					Reservation.fornameError.style.backgroundColor = "red";
				}
				if(Reservation.nom===""){

					Reservation.nameError.style.backgroundColor = "red";
				}
			}				
		});
	},

	buttonCancelBookingClick(){
		buttonCancelBooking.addEventListener('click',function(){
			sessionStorage.clear();
			Reservation.confirmationReservation.style.display = "none";
	    	Reservation.station.style.display = "none";
	    	Reservation.reservation.style.display = "none";
	    	Reservation.signature.style.display = "none";
		});
	}	
		
}
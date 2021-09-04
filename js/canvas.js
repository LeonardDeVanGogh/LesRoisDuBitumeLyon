//permet de signer dans la balise canvas
//génère un tableau contenant tous les points xy de la signature

function initCanvas(){

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let signatureCanvas = [];
    canvas.width = 200;
    canvas.height = 200;

    function getPosition(e) {
        let x = "";
        let y = "";

        if (e.changedTouches && e.changedTouches[0]) {
            let offsetY = canvas.offsetTop;
            let offsetX = canvas.offsetLeft;
            x = e.changedTouches[0].pageX - offsetX;
            y = e.changedTouches[0].pageY - offsetY;
        } 
        else if (e.offsetX || e.offsetX === 0)
        {
            x = e.offsetX;
            y = e.offsetY;
        }    
        return {
            x, y
        };
    };

    function mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        
        canvas.addEventListener("mousemove", mouseMove);
        canvas.addEventListener("mouseup", mouseUp);
        canvas.addEventListener("touchmove", mouseMove);
        canvas.addEventListener("touchend", mouseUp);
        canvas.addEventListener("mouseup", mouseUp);
        canvas.addEventListener("touchend", mouseUp);
        
        canvas.style.backgroundColor = "white";
        let position = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        signatureCanvas.push(position.x, position.y);
        xyLast = position;
    };

    function mouseMove(e) {
        e.preventDefault();
        e.stopPropagation();       
        let position = getPosition(e);       
        ctx.quadraticCurveTo(xyLast.x, xyLast.y, position.x, position.y);
        signatureCanvas.push(position.x, position.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        xyLast = position;
    };

    function mouseUp() {
        canvas.removeEventListener('mousemove', mouseMove);
        canvas.removeEventListener('touchmove', mouseMove);
    };

    canvas.addEventListener("touchstart", mouseDown);
    canvas.addEventListener("mousedown", mouseDown);
          
    let cancelButton = document.getElementById("buttonCanacelSignature");
    let signatureButton = document.getElementById("buttonReservation");
    let counter;
    let timer;
    let timerElt = document.getElementById("chrono");
    let infos = document.getElementById("infos");

    let buttonCancelBooking = document.getElementById("buttonCancelBooking");

     cancelButton.onclick = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        signatureCanvas=[];
     } ;  


    signatureButton.onclick = function(){

        if(signatureCanvas.length>0){        
            signature.style.display = "none";
            infos.style.display = "none";
            confirmationReservation.style.display = "block";


            if(timer !== undefined){
                clearInterval(timer);
            }
            
            counter = 1200;
            timer = setInterval (function(){
                timerElt.innerText = "La réservation expire dans " + Math.trunc(counter/60) + "mins et " + counter % 60 + "sec.";
                sessionStorage.setItem('timer',counter);
                counter -- ;
                if(counter <= 0){
                    setTimeout(function(){
                        timerElt.innerText = "Réservation perdue";
                        sessionStorage.clear();
                        signatureCanvas=[];
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        document.getElementById('signature').style.display = 'none';
                        clearInterval(timer);
                    },1000);
                }
            },1000);

            buttonCancelBooking.scrollIntoView();

            let exportSignature = [];
            let signatureX;
            let signatureY;
            for(i=0;i<signatureCanvas.length;i++){
                signatureX = signatureCanvas[i];
                i++;
                signatureY = signatureCanvas[i];
                let pointI = {
                    x:signatureX,
                    y:signatureY
                }
                exportSignature.push(pointI);
            };

            let finalBooking = {
                idStation:sessionStorage.getItem("id"),
                forname:localStorage.getItem("forname"),
                name:localStorage.getItem("name"),
                signature: JSON.stringify(exportSignature)
            };
            resume.textContent = "Vélo réservé à la station " + sessionStorage.getItem("nameStation") + " ,par " + localStorage.getItem("forname") + " " + localStorage.getItem("name");
            sessionStorage.setItem("finalBooking", JSON.stringify(finalBooking));
        }
        else{
            canvas.style.backgroundColor = "red";
        }   
    }

}




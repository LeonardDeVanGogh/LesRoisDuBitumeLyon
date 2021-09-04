//slider
class Diaporama {
	constructor(slides,previousButton,pauseButton,nextButton,closeButton,playing,currentSlide,slideInterval){
		this.slides = document.querySelectorAll('#slides .slide');
		this.previousButton = document.getElementById('previous');
		this.pauseButton = document.getElementById('pause');
		this.nextButton = document.getElementById('next');
		this.closeButton = document.getElementById('close');
		this.playing = true;
		this.currentSlide = 0;
		this.slideInterval = 0;
		this.playSLideshow();

	}
	playSLideshow(){
		this.pauseButton.className = 'controls fas fa-pause fa-lg';
		this.playing = true;
		this.slideInterval = setInterval(this.nextSlide.bind(this),5000);
		return false;
	}
	pauseSlideshow(){
		this.pauseButton.className = 'controls fas fa-play fa-lg';
		this.playing = false;
		clearInterval(this.slideInterval);
		return false;
	}
	nextSlide(){
		this.slides[this.currentSlide].className = 'slide';
		this.currentSlide = (this.currentSlide+1)%this.slides.length;
		this.slides[this.currentSlide].className = 'slide showing';
		return false;
	}
	

	//getters setters




}
/*let Diaporama = {

	slides:document.querySelectorAll('#slides .slide'),
	previousButton:document.getElementById('previous'),
	pauseButton:document.getElementById('pause'),
	nextButton:document.getElementById('next'),
	closeButton:document.getElementById('close'),
	playing:true,
	currentSlide:0,
	slideInterval:0,
	init(){
		this.addEvents();
		this.playSlideshow();
	},         

	playSlideshow(){
		this.pauseButton.className = 'controls fas fa-pause fa-lg';
		this.playing = true;
		this.slideInterval = setInterval(this.nextSlide.bind(this),5000);
	},

	pauseSlideshow(){
		this.pauseButton.className = 'controls fas fa-play fa-lg';
		this.playing = false;
		clearInterval(this.slideInterval);
	},

	previousSlide(){
		Diaporama.slides[Diaporama.currentSlide].className = 'slide';
		if(Diaporama.currentSlide===0){
			Diaporama.currentSlide=Diaporama.slides.length-1;
		}
		else{
			Diaporama.currentSlide = (Diaporama.currentSlide-1)%Diaporama.slides.length;
		}
		Diaporama.slides[Diaporama.currentSlide].className = 'slide showing';
	},

	nextSlide(){
		Diaporama.slides[Diaporama.currentSlide].className = 'slide';
		this.currentSlide = (this.currentSlide+1)%this.slides.length;
		this.slides[this.currentSlide].className = 'slide showing';
	},

	addEvents(){
		this.pauseButton.addEventListener('click',function(){
			if(Diaporama.playing){
				Diaporama.pauseSlideshow();
			}
			else{
				Diaporama.playSlideshow();
			}
		});
		this.nextButton.addEventListener('click',function(){
			Diaporama.nextSlide();
		});		
		this.closeButton.addEventListener('click',function(){
			document.getElementById('slider').style.display = 'none';
		});
		this.previousButton.addEventListener('click',function(){
			Diaporama.previousSlide();
		});
		document.addEventListener('keydown',function(){
			switch(event.keyCode){
				case 37:
				Diaporama.previousSlide();
				break;
				case 39:
				Diaporama.nextSlide();
				break;
			}
		});		
	}         

}*/

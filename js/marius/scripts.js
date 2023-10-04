jQuery(function ($) {

	$(document).ready(function() {
		
		"use strict";
		
		PageLoad(); 
		ScrollEffects();
		Sliders();	 
		FirstLoad(); 
		PageLoadActions(); 
		FitThumbScreenGSAP();
		ShowcaseCarousel();
		ShowcasePortfolio();	
		ShowcaseLists();
		ShowcaseReverse();
		ShowcaseGallery();
		FitThumbScreenWEBGL();
		Shortcodes();		
		Core();
		JustifiedGrid();
		Lightbox();
		PlayVideo();
		CustomFunction();
	});
	
	
/*--------------------------------------------------
Function CustomFunction
---------------------------------------------------*/

	function CustomFunction() {
		
		//Add here your custom js code
		
	}// End CustomFunction
	
/*--------------------------------------------------
	Function Cleanup Before Ajax
---------------------------------------------------*/	
	
	function CleanupBeforeAjax(){		
		// reset all scroll triggers
		let triggers = ScrollTrigger.getAll();
		triggers.forEach( trigger => {			
		  	trigger.kill();
		});
		
		ClapatSlider.instances.forEach(slider => slider.off());
		ClapatSlider.instances = [];
	}			

/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {
		
		gsap.set($(".menu-timeline .before-span"), {y: 120, opacity:0});
		
		// Page Navigation Events
		$(".preloader-wrap").on('mouseenter', function() {	
			var $this = $(this);			
			gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$("#ball").addClass("with-blur");
			$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );				
		});
							
		$(".preloader-wrap").on('mouseleave', function() {					
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-blur");
			$('#ball p').remove();					
		});
		
		$('body').removeClass('hidden').removeClass('hidden-ball');
		
		gsap.to($("#header-container"), {duration: 0.5, opacity:1, delay:0.2, ease:Power2.easeOut}); 
		
		
		function initOnFirstLoad() {
		
			imagesLoaded('body', function() {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$('#ball p').remove();
				gsap.to($(".percentage-wrapper"), {duration: 0.7, x:$(".trackbar").width()*0.5 - $(".percentage-wrapper").width() * 0.5, delay:0.3, ease:Power4.easeOut});
				gsap.to($(".percentage"), {duration: 0.7, opacity:0, y:-100, delay:1, ease:Power4.easeInOut});
				gsap.to($(".percentage-intro"), {duration: 0.5, opacity:0, delay:0.6, ease:Power4.easeInOut});
				gsap.to($(".preloader-intro span"), {duration: 0.7, opacity:0, xPercent: -101, delay:0.3, ease:Power4.easeOut});						
				gsap.to($(".preloader-wrap"), {duration: 0.7, opacity:0, delay:1.6, ease:Power2.easeOut});
				gsap.set($(".preloader-wrap"), {visibility:'hidden', delay:2, yPercent: -101});										
				
				setTimeout(function(){
					
					gsap.to($(".header-middle, #footer-container, .showcase-counter, .swiper-pagination-bullet-active .counter"), {duration: 1, opacity:1, delay:0, ease:Power2.easeOut});
					
					if( $('.hero-video-wrapper').length > 0 ){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0, ease:Power2.easeOut}); 
					}
					
					gsap.to($("#main"), {duration: 0, opacity:1, delay:0, ease:Power2.easeOut});
					if( $('#hero').hasClass("has-image")) {								
						gsap.set($("#hero-bg-image"), {scale:1.1 , opacity:0});
						gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});					
						gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});
						
						gsap.to($("#hero-bg-image"), {duration: 1, scale:1 , opacity:1, delay:0.2, ease:Power2.easeOut});
						gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.7, ease:Power3.easeOut, onComplete: function() {
							gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 1, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
							gsap.to($("#main-page-content, #page-nav"), {duration: 0.4, opacity:1, delay:0, ease:Power2.easeOut});
						}});
						
					} else {													
						gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});					
						gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});
						
						gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.4, ease:Power3.easeOut, onComplete: function() {
							gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
							gsap.to($("#main-page-content, #page-nav"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
							gsap.to($(".error-button"), {duration: 0.3, y: 0, opacity:1, rotation:0, delay:0, ease:Power2.easeOut});
						}});
										
					}	
					
					
					// Fading In Showcase Carousel elements on Finised
					gsap.set($(".showcase-carousel .clapat-slider .slide-inner"), {opacity:0});
					gsap.to($(".showcase-carousel .clapat-slider .clapat-slide .slide-inner"), {duration: 2, opacity:1, delay:0.75, ease:Power4.easeOut});
					
					
					
					gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-prev-two .slide-inner"), {yPercent:260});
					gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-prev-two .slide-inner"), {duration: 1.8, yPercent:0, delay:0.6, ease:Power4.easeOut});
					
					
					gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-prev .slide-inner"), {yPercent:-210});
					gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-prev .slide-inner"), {duration: 1.8, yPercent:0, delay:0.65, ease:Power4.easeOut});
					
					
					gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-active .slide-inner"), {yPercent:160});
					gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-active .slide-inner"), {duration: 1.8, yPercent:0, delay:0.7,  ease:Power4.easeOut, onComplete: function() {
							$('body').removeClass(" disable-scroll");
						}
					});
					
					
					gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-next .slide-inner"), {yPercent:-210});
					gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-next .slide-inner"), {duration: 1.8, yPercent:0, delay:0.65, ease:Power4.easeOut});
					
					
					gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-next-two .slide-inner"), {yPercent:260});
					gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-next-two .slide-inner"), {duration: 1.8, yPercent:0, delay:0.6, ease:Power4.easeOut});
					
					
					
					
					
					
					
					
					
					
					
					//Fading In Showcase Slider elements on Finished
					gsap.set($(".showcase-slider .clapat-slider .clapat-slide .slide-inner"), {opacity:0});
					gsap.set($(".showcase-slider .slide-title span"), {y: 100, opacity:0});
					gsap.set($(".showcase-slider .slide-subtitle span"), {y: 30, opacity:0});
					gsap.set($(".showcase-slider .clapat-slider .clapat-slide-active .slide-inner"), {scale:1.1, opacity:0});
					gsap.to($(".showcase-slider .clapat-slider .clapat-slide-active .slide-inner"), {duration: 1.5, scale:1, opacity:1, delay:0.5, ease:Power4.easeOut});
					gsap.to($(".showcase-slider .clapat-slider .clapat-slide:not(.clapat-slide-active) .slide-inner"), {duration: 1.5, xPercent: 0, opacity:1, delay:0, ease:Power4.easeOut});
					gsap.to($(".showcase-slider .slide-title span"), {duration: 0.7, y: 0, opacity:1, delay:0.55, ease:Power4.easeOut});
					gsap.to($(".showcase-slider .slide-subtitle span"), {duration: 0.7, y: 0, opacity:1, delay:0.65, ease:Power4.easeOut});						
					
					// Fading In Showcase Portfolio elements on Finised
					gsap.set($(".slide-hero-title span"), {y: 120, opacity:0});
					gsap.set($(".slide-hero-subtitle span"), {y: 20, opacity:0});					
					gsap.to($(".slide-hero-title span"), {duration: 0.7, y: 0, opacity:1, stagger:0.05, delay:0.7, ease:Power3.easeOut});
					gsap.to($(".slide-hero-subtitle span"), {duration: 0.4, y: 0, opacity:1, stagger:0.05, delay:0.9, ease:Power3.easeOut});
					
					// Fading In Showcase Gallery elements on Finised
					if (isMobile()) {
						gsap.set($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {yPercent: -30, opacity:0});
						gsap.set($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {yPercent: 100, opacity:0});
						gsap.to($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {duration: 2, yPercent: 70, stagger:0, delay:0.3, ease:Power4.easeOut});
						gsap.to($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {duration: 1.8, opacity:1, stagger:0.02, delay:0.5, ease:Power4.easeOut});						
						gsap.to($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {duration: 2, yPercent: 0, stagger:0, delay:0.3, ease:Power4.easeOut});
						gsap.to($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {duration: 1.8, opacity:1, stagger:0.02, delay:0.5, ease:Power4.easeOut});
					} else {
						gsap.set($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {yPercent: 70, opacity:0});
						gsap.set($(".showcase-gallery .clapat-sync-slider.sync-two .clapat-sync-slide"), {yPercent: 70, opacity:0});
						gsap.set($(".showcase-gallery .clapat-sync-slider.sync-three .clapat-sync-slide"), {yPercent: -182, opacity:0});
						gsap.set($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {yPercent: -100, opacity:0});
						gsap.to($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {duration: 2, yPercent: -30, stagger:0.02, delay:0.3, ease:Power4.easeOut});
						gsap.to($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {duration: 1.8, opacity:1, stagger:0, delay:0.5, ease:Power4.easeOut});						
						gsap.to($(".showcase-gallery .clapat-sync-slider.sync-two .clapat-sync-slide"), {duration: 2, yPercent: -30, stagger:0.02, delay:0.3, ease:Power4.easeOut});
						gsap.to($(".showcase-gallery .clapat-sync-slider.sync-two .clapat-sync-slide"), {duration: 1.8, opacity:1, stagger:0, delay:0.5, ease:Power4.easeOut});						
						gsap.to($(".showcase-gallery .clapat-sync-slider.sync-three .clapat-sync-slide"), {duration: 2, yPercent: -82, stagger:-0.02, delay:0.3, ease:Power4.easeOut});
						gsap.to($(".showcase-gallery .clapat-sync-slider.sync-three .clapat-sync-slide"), {duration: 1.8, opacity:1, stagger:0, delay:0.5, ease:Power4.easeOut});						
						gsap.to($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {duration: 2, yPercent: 0, stagger:-0.02, delay:0.3, ease:Power4.easeOut});
						gsap.to($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {duration: 1.8, opacity:1, stagger:0, delay:0.5, ease:Power4.easeOut});
					}
					
					// Fading In Showcase Lists elements on Finised
					gsap.set($(".showcase-lists .slide-title span"), {y: 100, opacity:0});
					gsap.to($(".showcase-lists .slide-title span"), {duration: 0.4, y: 0, opacity:1, stagger:0.05, delay:0.5, ease:Power3.easeOut});
					
					
					// Fading In Showcase Footer Elements
					gsap.set($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info, footer .link-text"), {opacity:0});
					gsap.to($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info, footer .link-text"), {duration: 0.4, opacity:1, delay:0.8, ease:Power3.easeOut});
					
					var bullets = document.querySelectorAll(".showcase-carousel .clapat-pagination-bullet");
					var initialHeights = Array.from(bullets).map(function(bullet) {
					  	return bullet.clientHeight + "px";
					});
					gsap.set(bullets, { height: 0 });
					gsap.to(bullets, {
					  	duration: 0.3,
						delay:1, 
					  	height: function(index, target) {
							return initialHeights[index];
					  	},
					  	ease:Power3.easeOut,
					  	stagger: 0.05,
						onComplete: function() {
							gsap.set(bullets, { height: "" });;
						  }
					});

					
					
					$('body').addClass("header-visible");
					
				} , 800 );
			});
				
		}
		
		
		if (!$('body').hasClass("disable-ajaxload")) {
			
			
			var width = 0,
				perfData = window.performance.timing, 
				EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
				time = ((EstimatedTime/100)%500) * 10
				
			// Loadbar Animation
			$(".loadbar").animate({
				width: width + "%"
			}, time  );	
			
			// Percentage Increment Animation
			var PercentageID = $("#precent"),
					start = 0,
					end = 100,
					durataion = time + 0;
					animateValue(PercentageID, start, end, durataion);
					
			function animateValue(id, start, end, duration) {
			  
				var range = end - start,
				  current = start,
				  increment = end > start? 1 : -1,
				  stepTime = Math.abs(Math.floor(duration / range)),
				  obj = $(id);
				
				var timer = setInterval(function() {
					current += increment;
					$(obj).text(current);
				  //obj.innerHTML = current;
					if (current == end) {
						clearInterval(timer);
					}
				}, stepTime);
			}
			
			// Fading Out Loadbar on Finised
			setTimeout(function(){				
				initOnFirstLoad();						  
			}, time);
		
		} else {			
			initOnFirstLoad();
		}
		
		
	}// End Page Load

	
	
/*--------------------------------------------------
Page Load Actions
---------------------------------------------------*/	
	
	function PageLoadActions() {
		
		
		// Default Page Navigation Load Events
		
		if (!isMobile()) {			
			$("#page-nav .page-title").on('mouseenter', function() {	
				var $this = $(this);			
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
			});								
			$("#page-nav .page-title").on('mouseleave', function() {					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$('#ball p').remove();				
			});		
		}		
		
		if (!$("body").hasClass("disable-ajaxload")) {
			$('#page-nav .page-title').on('click', function() {	
				$("body").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$(".big-title-caption").remove();	
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to('.hero-arrow i', {duration: 0.3, y:-40, opacity:0, delay:0, ease:Power2.easeInOut});				
				gsap.to('.next-hero-subtitle span', {duration: 0.3, y:-40, opacity:0, delay:0.05, stagger:0.03, ease:Power2.easeInOut});				
				gsap.to('.page-nav-caption:not(.marquee-title) .next-hero-title span', {duration: 0.5, y:-140, opacity:0, delay:0.1, stagger:0.03, ease:Power2.easeInOut});
				gsap.to('.page-nav-caption.marquee-title .next-hero-title span', {duration: 0.5, y:-300, opacity:0, delay:0.1, stagger:0, ease:Power2.easeInOut});					
				
				gsap.to($("#main-page-content, #hero, footer"), {duration: 0.3, opacity:0});
			});
		} else if ($("body").hasClass("disable-ajaxload")) {
			$('#page-nav .page-title').on('click', function() {					
				$("body").addClass("load-next-page");
				$("body").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$(".big-title-caption").remove();	
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to($("#main-page-content, #hero, #page-nav"), {duration: 0.3, opacity:0});
				gsap.to($("footer"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeInOut});
			});
		}
		
		
		// Project Page Navigation Load Events
		if (!isMobile()) {
			
			$("#project-nav .next-ajax-link-project").mouseenter(function(e) {	
				var $this = $(this);		
				$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$("#ball").addClass("with-blur");
				$("#project-nav .next-hero-title").addClass('hover-title');				
			});
							
			$("#project-nav .next-ajax-link-project").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
				$("#project-nav .next-hero-title").removeClass('hover-title');
			});
		}
		
		if (!$("body").hasClass("disable-ajaxload")) {
			
			
			
			if ($(".next-ajax-link-project").hasClass("auto-trigger")) {
				
				if ( !(typeof window.ReachBottomArr === 'undefined' || window.ReachBottomArr === null) && Array.isArray( window.ReachBottomArr ) ) {
					
					window.ReachBottomArr.forEach( element => {						
						element.kill();
					});
				}
				
				window.ReachBottomArr = new Array();
				
				setTimeout(function() {	
					$('#project-nav').each(function(){
						var $this = $(this);
						const ReachBottom = ScrollTrigger.create({
							id: Math.floor(Math.random() * 100),
							trigger: $("#project-nav"),
							
							start: () => `top+=${window.innerHeight - 10}px`,
							onEnter: function( st ) { 
								$("body").addClass("show-loader");						
								$this.delay(500).queue(function() {
									
									gsap.set($("#project-nav.change-header, .next-hero-progress"), {backgroundColor:"transparent"});
									gsap.to($(".next-hero-progress"), {duration: 0.4, width:"0%", ease:Power4.easeOut,onComplete: function() {
										gsap.set($(".next-hero-progress"), {opacity:0});
									}});
									
									var link = $this.find('.next-ajax-link-project');
									link.trigger('click');
								});												
							},
							onLeaveBack: function() { 
								$("body").removeClass("show-loader");						
								$this.clearQueue();											
							}
						});				
						window.ReachBottomArr.push(ReachBottom);				
						imagesLoaded('body', function() {
							setTimeout( function(){
								ReachBottom.refresh()	
							} , 1200 );
						});						
					});
				}, 100);			
			}
			
			if( $('#hero-image-wrapper').hasClass("change-header-color")) {
				$('#hero-footer').addClass("white-header");	
			}	
			
			$('.next-ajax-link-project').on('click', function() {					
				$("body").addClass("load-project-thumb");
				$('header').removeClass('white-header');
				$("#app").remove();
				$('.next-project-image-wrapper').addClass("temporary").appendTo('body');
				
				if (!$(".next-ajax-link-project").hasClass("auto-trigger")) {
					$("body").addClass("show-loader");
				}				
				
				gsap.to($(".next-hero-counter span"), {duration: 0.3, y:-20, opacity:0, delay:0, ease:Power2.easeInOut});
				gsap.to($(".next-hero-title span"), {duration: 0.3, y:-80, opacity:0, stagger:0.05, delay:0, ease:Power2.easeInOut});
				gsap.to($(".next-hero-subtitle span"), {duration: 0.3, y:-40, opacity:0, stagger:0.05, delay:0.1, ease:Power2.easeInOut});
				
				gsap.set($("#project-nav.change-header, .next-hero-progress"), {backgroundColor:"transparent"});
				gsap.to($(".next-hero-progress span"), {duration: 0.4, width:"100%", ease:Power2.easeInOut,onComplete: function() {
					gsap.to($(".next-hero-progress"), {duration: 0.4, width:"0%", ease:Power2.easeInOut});
				}});
					
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.3, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper"), {duration: 0.3, opacity:0});			
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1.02, clipPath: 'inset(0 0%)', opacity:1, ease:Power2.easeInOut,onComplete: function() {
				  $('.temporary .next-project-image').addClass("visible")
				}});
				gsap.to($("footer, .all-works"), {duration: 0.3, opacity:0, ease:Power2.easeInOut});
			});
		} else if ($("body").hasClass("disable-ajaxload")) {
			$('.next-ajax-link-project').on('click', function() {					
				$("body").addClass("load-project-thumb-with-title").addClass("show-loader");							
				$('header').removeClass('white-header');
				$("#app").remove();									
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon with-blur");
				$('#ball p').remove();
				$('#ball i').remove();				
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper, #project-nav"), {duration: 0.3, opacity:0});			
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1, opacity: 0, ease:Power2.easeOut});
				gsap.to($("footer, .all-works"), {duration: 0.3, opacity:0, ease:Power2.easeInOut});							
			});
		}
		
		
	}// Page Load Actions
	
	

	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {	
		
		
		imagesLoaded('body', function() {
			$('body').removeClass('loading hidden scale-up scale-none');
			gsap.to($("#header-container, .header-middle"), {duration: 1, opacity:1, ease:Power2.easeOut});
		});
		
		gsap.to($("#main"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
		gsap.to($("#footer-container"), {duration: 1, opacity:1, delay:0.2, ease:Power2.easeOut});
				
		
		if( $('#hero').hasClass("has-image")) {	
			if( $('body').hasClass("load-project-thumb")) {
				gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});
				gsap.set($("#hero-caption .hero-subtitle span"), {y: 100, opacity:0});
				
				gsap.to($("#hero-bg-image"), {duration: 0, scale:1.02, opacity:1, delay:0, ease:Power2.easeOut});				
				gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.2, delay:0.6, ease:Power3.easeOut, onComplete: function() {										
					gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
					gsap.to($("#main-page-content"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
				}});
				
			} else if( $('body').hasClass("load-project-thumb-with-title")) {
				gsap.set($("#hero-caption .hero-title span"), {y: 0, opacity:1});
				gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});
								
				gsap.to($("#hero-bg-image"), {duration: 0, scale:1.02, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.2, delay:0.3, ease:Power3.easeOut, onComplete: function() {									
					gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
					gsap.to($("#main-page-content"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
				}});
			} else {
				gsap.set($("#hero-bg-image"), {scale:1.1 , opacity:0});
				gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});
				gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});
				
				imagesLoaded('#hero-bg-image', function() {
					gsap.to($("#hero-bg-image"), {duration: 0.7, scale:1 , opacity:1, delay:0, ease:Power2.easeOut});
				});								
				gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.2, delay:0.3, ease:Power3.easeOut, onComplete: function() {
					gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
					gsap.to($("#main-page-content, #page-nav"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
				}});
			}

		} else {						
			gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});
			gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});	
			
			gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.3, ease:Power3.easeOut, onComplete: function() {
				gsap.to($(".hero-footer-left, .hero-footer-right"), {duration:0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
				gsap.to($("#main-page-content, #page-nav"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".post-article-wrap"), {duration: 0.3, y: 0, opacity:1, ease:Power2.easeOut});
				gsap.to($(".error-button"), {duration: 0.3, y: 0, opacity:1, rotation:0, delay:0, ease:Power2.easeOut});
			}});			
		}
		
		
		// Fading In Showcase Carousel elements on Finised
		
		
		
		
		
		
		
		
		
		// Fading In Showcase Gallery elements on Finised
		if (isMobile()) {
			gsap.set($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {yPercent: -30, opacity:0});
			gsap.set($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {yPercent: 100, opacity:0});
			gsap.to($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {duration: 2, yPercent: 70, stagger:0, delay:0, ease:Power4.easeOut});
			gsap.to($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {duration: 1.8, opacity:1, stagger:0.02, delay:0.2, ease:Power4.easeOut});			
			gsap.to($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {duration: 2, yPercent: 0, stagger:0, delay:0, ease:Power4.easeOut});
			gsap.to($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {duration: 1.8, opacity:1, stagger:0.02, delay:0.2, ease:Power4.easeOut});
		} else {
			gsap.set($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {yPercent: 70, opacity:0});		
			gsap.set($(".showcase-gallery .clapat-sync-slider.sync-two .clapat-sync-slide"), {yPercent: 70, opacity:0});			
			gsap.set($(".showcase-gallery .clapat-sync-slider.sync-three .clapat-sync-slide"), {yPercent: -182, opacity:0});
			gsap.set($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {yPercent: -100, opacity:0});			
			gsap.to($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {duration: 2, yPercent: -30, stagger:0.02, delay:0, ease:Power4.easeOut});
			gsap.to($(".showcase-gallery .clapat-sync-slider.sync-one .clapat-sync-slide"), {duration: 1.8, opacity:1, stagger:0, delay:0.2, ease:Power4.easeOut});			
			gsap.to($(".showcase-gallery .clapat-sync-slider.sync-two .clapat-sync-slide"), {duration: 2, yPercent: -30, stagger:0.02, delay:0, ease:Power4.easeOut});
			gsap.to($(".showcase-gallery .clapat-sync-slider.sync-two .clapat-sync-slide"), {duration: 1.8, opacity:1, stagger:0, delay:0.2, ease:Power4.easeOut});			
			gsap.to($(".showcase-gallery .clapat-sync-slider.sync-three .clapat-sync-slide"), {duration: 2, yPercent: -82, stagger:-0.02, delay:0, ease:Power4.easeOut});
			gsap.to($(".showcase-gallery .clapat-sync-slider.sync-three .clapat-sync-slide"), {duration: 1.8, opacity:1, stagger:0, delay:0.2, ease:Power4.easeOut});			
			gsap.to($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {duration: 2, yPercent: 0, stagger:-0.02, delay:0, ease:Power4.easeOut});
			gsap.to($(".showcase-gallery .clapat-slider-viewport .clapat-slide .slide-inner"), {duration: 1.8, opacity:1, stagger:0, delay:0.2, ease:Power4.easeOut});
		}
		
		
		
		// Fading In Showcase Lists elements on Finised
		gsap.set($(".showcase-lists .slide-title span"), {y: 100, opacity:0});
		gsap.to($(".showcase-lists .slide-title span"), {duration: 0.7, y: 0, opacity:1, stagger:0.05, delay:0.1, ease:Power3.easeOut});
		
		
		if( $('.load-project-thumb').length > 0 ){
			imagesLoaded('#hero-image-wrapper', function() {
				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});											
				}					
				setTimeout( function(){					
					$("#app.active").remove();
					$(".big-title-caption").remove();
					$('.thumb-wrapper').remove();
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
						$(".temporary-hero").remove();
					}});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});	
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.1, ease:Power2.easeOut});										
					} else if (isMobile()) {				
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.5, ease:Power2.easeOut});					
					}
				} , 450 );
			});
		} else if( $('.load-project-thumb-with-title').length > 0 ){
			imagesLoaded('#hero-image-wrapper', function() {
				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});											
				}				
				setTimeout( function(){					
					$("#app.active").remove();
					$('.thumb-wrapper').remove();
					$("#canvas-slider.active").remove();					
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
						$(".temporary-hero").remove();
					}});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});	
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.1, ease:Power2.easeOut});										
					} else if (isMobile()) {				
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.5, ease:Power2.easeOut});					
					}
					$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");	
				} , 200 );
			});			
		} else {
			imagesLoaded('#hero-image-wrapper', function() {
				$('#hero-image-wrapper').find('video').each(function() {
					$(this).get(0).play();
				});
				setTimeout( function(){					
					$("#app.active").remove();	
					$("#canvas-slider.active").remove();					
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
						$(".temporary-hero").remove();
					}});
				} , 500 );
			});
		}
		
		setTimeout( function(){	
			$('header').removeClass('white-header');
			$('body').removeClass("load-project-thumb load-project-thumb-with-title load-next-page grid-open disable-scroll")
			setTimeout( function(){	
				$('body').removeClass("show-loader");
			} , 300 );			
		} , 800 );
		
	
	}// End Lazy Load
	

	
	
/*--------------------------------------------------
Function Showcase Carousel
---------------------------------------------------*/
	
	function ShowcaseCarousel() {
	
		if( $('.showcase-carousel').length > 0 ){
			
			$('body').addClass("disable-scroll");
			$("footer").addClass("showcase-footer");		
								
			gsap.set($(".showcase-carousel .clapat-slider .slide-inner"), {opacity:0});
			gsap.set($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info, footer .link-text"), {opacity:0});
		
			
			
			slider = new ClapatSlider('.showcase-carousel', { 
				direction: 'vertical', 
				snap: false,
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				parallax : [{
					element: '.section-image',
					margin:-20
				}],				
				on: {
					init : function() {
						
						if ($('body').hasClass("show-loader")) {
													
							gsap.to($(".showcase-carousel .clapat-slider .clapat-slide .slide-inner"), {duration: 1.2, opacity:1, delay:0.2, ease:Power4.easeOut});					
							
							
							gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-prev-two .slide-inner"), {yPercent:70});
							gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-prev-two .slide-inner"), {duration: 1.2, yPercent:0, delay:0.1, ease:Power4.easeOut});
							
							
							gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-prev .slide-inner"), {yPercent:-70});
							gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-prev .slide-inner"), {duration: 1.2, yPercent:0, delay:0.15, ease:Power4.easeOut});
							
							
							gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-active .slide-inner"), {yPercent:70});
							gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-active .slide-inner"), {duration: 1.2, yPercent:0, delay:0.2,  ease:Power4.easeOut, onComplete: function() {
									$('body').removeClass(" disable-scroll");
								}
							});
							
							
							gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-next .slide-inner"), {yPercent:-70});
							gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-next .slide-inner"), {duration: 1.2, yPercent:0, delay:0.15, ease:Power4.easeOut});
							
							
							gsap.set($(".showcase-carousel .clapat-slider .clapat-slide-next-two .slide-inner"), {yPercent:70});
							gsap.to($(".showcase-carousel .clapat-slider .clapat-slide-next-two .slide-inner"), {duration: 1.2, yPercent:0, delay:0.1, ease:Power4.easeOut});
							
							gsap.to($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info, footer .link-text"), {duration: 0.5, opacity:1, delay:0.4, ease:Power3.easeOut});
							
							var bullets = document.querySelectorAll(".showcase-carousel .clapat-pagination-bullet");
							var initialHeights = Array.from(bullets).map(function(bullet) {
								return bullet.clientHeight + "px";
							});
							gsap.set(bullets, { height: 0 });
							gsap.to(bullets, {
								duration: 0.3,
								delay:0.3, 
								height: function(index, target) {
									return initialHeights[index];
								},
								ease:Power3.easeOut,
								stagger: 0.05,
								onComplete: function() {
									gsap.set(bullets, { height: "" });
								  }
							});
						
						}
					}
				}
			});		
			
			
			slider.tl
				.fromTo('.progress-info-fill', {backgroundSize:"0% 100%" }, {backgroundSize:"100% 100%" }, 0)
				.fromTo('.progress-info-fill-2', {backgroundSize:"100% 100%" }, {backgroundSize:"0% 100%", duration: 0.3, ease: 'power3' }, 0);
				
			
			$('.carousel-prev').on( 'click', function() {				
				if( window.rotateElement && window.rotateElement.isActive() ){  
					return; 
				} else {
					window.rotateElement = gsap.to($(this).find('i'), {duration: 0.3, rotate:"-= 180"}); 
				}
			});
			
			$('.carousel-next').on( 'click', function() {				
				if( window.rotateElement && window.rotateElement.isActive() ){  
					return; 
				} else {
					 window.rotateElement = gsap.to($(this).find('i'), {duration: 0.3, rotate:"+= 90"}); 
				}
			});
			
			
			
			
			
			class Item {
				// DOM elements
				DOM = {
					// main element (.item)
					el: null,
					// imageWrap (.item__image-wrap)
					imageWrap: null,
					// imageCaption
					imageCaption: null,
					// image (.item__image)
					image: null,
					// imageInner (.item__image > .item__image-inner)
					imageInner: null,
				};
				
				constructor(DOM_el) {
					this.DOM.el = DOM_el;
					this.DOM.imageWrap = this.DOM.el.querySelector('.slide-moving');
					if( this.DOM.imageWrap != null ){						
						this.DOM.imageCaption = this.DOM.imageWrap.querySelector('.slide-caption');
					}
					this.DOM.image = this.DOM.el.querySelector('.trigger-item');
					if( this.DOM.image != null ){						
						this.DOM.imageInner = this.DOM.image.querySelector('.section-image');
					}
				}
			}
			
			
			// Placeholder for the grid items (.item__image). We'll use the gsap FLIP plugin to move the "".item .item__image" inside the grid element
			const grid = document.querySelector('.carousel-thumbs-wrapper');
			const triggeredImage = document.querySelector('.carousel-zoom-wrapper');
			
			let animateTitle = gsap.timeline();
			
			
			const showGrid = () => {
				
				document.body.classList.add('grid-open', 'disable-scroll');
				
				slider.enabled = false;
				
				gsap.to($("footer .link-text, .clapat-pagination, .progress-info"), {duration: 0.3, opacity:0, y:30, stagger:-0.05, ease:Power2.easeInOut});
				
				// get the DOM elements that we'll work with
				const DOM = getDOMElements();
				const allImages = DOM.grid.map(element => {
					
					element.item.DOM.image.setAttribute('data-slide-index', element.item_index);
					return element.item.DOM.image;
				});
				const allImagesInner = DOM.grid.map(element => element.item.DOM.imageInner);
				const currentImage = DOM.currentItem.DOM.image;
				const currentImageInner = DOM.currentItem.DOM.imageInner;
				const currentImageCaption = DOM.currentItem.DOM.imageCaption;
							
				// Use gsap flip for the animation
				// save the current state of the images
				const flipstate = Flip.getState([allImages]);
				
				const flipstate1 = Flip.getState([currentImage]);
								
				gsap.set(currentImage.closest(".clapat-slide"), {zIndex: 0});
				
				// put them inside the .grid element
				grid.append(...allImages);
				
				currentImage.setAttribute('data-slide-index', DOM.currentIndex);
				triggeredImage.append(currentImage);
				triggeredImage.append(currentImageCaption);
			
				// Flip it
				Flip.from(flipstate, {
					duration: 0.7,
					stagger:0.05,
					ease: 'power3.inOut',
					absolute: true,					 
				})
				.to(currentImageInner, {
					duration: 0.7,
					ease: 'power3.inOut',
					x: 0,
					onComplete: () => {
						gsap.set(currentImageInner, {
						  clearProps: "rotation, x, y"
						});
						document.body.classList.add('enable-trigger');
				  	}
				}, 0)
				
				Flip.from(flipstate1, {
					duration: 0.7 ,
					ease: 'power3.inOut',
					absolute: true       
				});
				
				animateTitle.set(".showcase-carousel .slide-caption span", { y: 120, opacity:0});				
				animateTitle.to(".showcase-carousel .carousel-zoom-wrapper .slide-caption span", { duration: 0.5, y: 0, opacity:1, delay:0.4, stagger:0.03,  ease:Power2.easeOut });
				
			};
			
			const hideGrid = () => {
				
				gsap.to($(".showcase-carousel .carousel-zoom-wrapper .slide-caption"), {duration: 0.5, opacity:0, delay:0.1, ease:Power2.easeOut});
				animateTitle.to(".showcase-carousel .carousel-zoom-wrapper .slide-caption span", { duration: 0.5, y: -100, opacity:0, ease:Power2.easeInOut});
				
				document.body.classList.remove('grid-open');
				
				slider.enabled = true;
				
				// get the DOM elements that we'll work with
				const DOM = getDOMElements();
				const allImages = document.querySelectorAll('.carousel-thumbs-wrapper .trigger-item');
				const currentImage = document.querySelector('.carousel-zoom-wrapper .trigger-item');
				const currentImageCaption = document.querySelector('.carousel-zoom-wrapper .slide-caption');
				const currentImageInner = document.querySelector('.carousel-zoom-wrapper .trigger-item .section-image');
			
				const flipstate = Flip.getState([allImages, /*allImagesInner*/, currentImage, /*currentImageInner*/]);
							
				allImages.forEach((image) => {
					
					let index = image.getAttribute('data-slide-index');
					let element = DOM.items[index];
					image.removeAttribute('data-slide-index');
					element.DOM.imageWrap.appendChild( image );
				});
				
				currentImageInner.classList.add('ease-transform');
				
				currentImage.removeAttribute('data-slide-index');
				DOM.currentItem.DOM.imageWrap.appendChild(currentImage);				
								
				// Remove all the elements from the grid and current triggered image divs
				const liveGrid = document.querySelector('.carousel-thumbs-wrapper');
				const liveTriggeredImage = document.querySelector('.carousel-zoom-wrapper');
				
				while (liveGrid.firstChild) {
					liveGrid.removeChild(liveGrid.firstChild);
				}
				
				Flip.from(flipstate, {
					duration: 0.7,
					stagger:0.02,
					ease: 'power3.inOut',					
					onComplete: function() {
												
						document.body.classList.remove('disable-scroll','enable-trigger');
						
						const triggeredItem = document.querySelector('.clapat-slide.triggered-item');
						if( triggeredItem != null ){							
							triggeredItem.classList.remove('triggered-item');
						}
						
						const clapatSlides = document.querySelectorAll('.clapat-slide');
						clapatSlides.forEach(slide => {
						  	slide.style.zIndex = '';
						});
						
						currentImageInner.classList.remove('ease-transform');
						
						DOM.currentItem.DOM.imageWrap.appendChild(currentImageCaption);
						gsap.set($(".showcase-carousel .slide-caption"), {clearProps: "opacity"});
						
					}
				});
				
				gsap.to($("footer .link-text, .clapat-pagination, .progress-info"), {duration: 0.3, opacity:1, y:0, stagger:0.05, delay:0.4, ease:Power2.easeInOut});
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
				
			
			}
			
			// Returns some DOM elements that are needed for showing/hiding the grid
			const getDOMElements = () => {
			
				// Item instances (slides)
				const items = [];
				[...document.querySelectorAll('.clapat-slide')].forEach(item => {
					items.push(new Item(item));
				});
						
				// Cloned items
				const itemsCloned = [];
				[...document.querySelectorAll('.clapat-slide-clone')].forEach(item => {
					itemsCloned.push(new Item(item));
				});
			
				let firstVisibleIndex = -1;
				for( let i = 0; i < items.length; i++ ){
					
					let item = items[i];
					let bounding = item.DOM.el.getBoundingClientRect();
					if( (bounding.left <= 0) && (bounding.right > 0) ){
							
						firstVisibleIndex = i;
						console.log( 'First visible index: ' + i );
						break;
					}					
					
				}
				
				const gridItems = [];
				let iterator = 0;
				let currentIndex = -1;
				while ( iterator < itemsCloned.length ){
					
					let index = gsap.utils.wrap( 0, items.length, firstVisibleIndex + iterator);
					let item = items[index];
					if( !item.DOM.el.classList.contains('triggered-item') ){
						
						gridItems.push( {item_index: index, item: item  } );
					}
					else{
						
						currentIndex = index;
					}
					iterator++;
				}
				
				return {					
					items: items,					
					grid: gridItems,					
					currentItem: new Item( document.querySelector('.clapat-slide.triggered-item') ),
					currentIndex: currentIndex
				};
				
				
				
			}
			
			let bGridSwiped = false;
			// Initialize the events
			const initEvents = () => {
				
				const items = document.querySelectorAll('.slide-inner');
				items.forEach((triggerItem) => {
					
					triggerItem.addEventListener('click', (event) => {
						
						event.currentTarget.closest('.clapat-slide').classList.add('triggered-item');
						showGrid();
					});
					
				});
				
				window.addEventListener("wheel", event => {
					
					if(document.body.classList.contains("grid-open")) {
						hideGrid();
					}
				});
				
				window.addEventListener("touchmove", event => {
					
					if(document.body.classList.contains("grid-open")) {
						bGridSwiped = true;
					}
				});
				window.addEventListener("touchcancel", event => {
					
					if(document.body.classList.contains("grid-open") ) {
						bGridSwiped = false;
					}
				});
				window.addEventListener("touchend", event => {
					
					if(document.body.classList.contains("grid-open") && bGridSwiped ) {
						bGridSwiped = false;
						hideGrid();
					}
				});
				
				const closeGrid = document.querySelector('.carousel-close-thumbs');
				
				if( closeGrid != null ){
					
					closeGrid.addEventListener("click", event => {
						
						if(document.body.classList.contains("grid-open")) {
							hideGrid();
						}
					});
				}
				
				function moveThumbGrid( direction = "next" ){
					
					if(document.body.classList.contains("grid-open")) {
							
						const allImages = document.querySelectorAll('.carousel-thumbs-wrapper .trigger-item');
						if( allImages.length <= 0 ){
							
							return;
						}
						const currentImage = document.querySelector('.carousel-zoom-wrapper .trigger-item');
						const currentImageCaption = document.querySelector('.carousel-zoom-wrapper .slide-caption');
						const currentImageInner = document.querySelector('.carousel-zoom-wrapper .trigger-item .section-image');
						const liveGrid = document.querySelector('.carousel-thumbs-wrapper');
						const liveTriggeredImage = document.querySelector('.carousel-zoom-wrapper');
							
						let currentIndex = Number( currentImage.getAttribute('data-slide-index') );
						let nextImage = null;
						
						if( direction == "next" ){
						
							for( let i=0; i<allImages.length; i++ )
							{
								let image = allImages[i];
								let index = Number( image.getAttribute('data-slide-index') );
								if( nextImage == null ){
									
									if( index > currentIndex ){
											
										nextImage = image;
										break
									}
								}
							}
						}
						else {
						
							for( let i=allImages.length-1; i>=0; i-- )
							{
								let image = allImages[i];
								let index = Number( image.getAttribute('data-slide-index') );
								if( nextImage == null ){
									
									if( index < currentIndex ){
											
										nextImage = image;
										break
									}
								}
							}
						}
						
						const flipstate = Flip.getState([allImages, /*allImagesInner*/, currentImage, /*currentImageInner*/]);
							
						if( nextImage != null ){
							
							liveGrid.replaceChild( currentImage, nextImage );
						}
						else{
							
							if( direction == "next" ){
								
								nextImage = allImages[0];
								liveGrid.appendChild( currentImage );
							}
							else{
								
								nextImage = allImages[allImages.length-1];
								liveGrid.insertBefore( currentImage, liveGrid.firstChild );
							}
							
						}
						
						liveTriggeredImage.appendChild( nextImage );
						
						// Get all the slides
						let slides = document.querySelectorAll('.clapat-slide');
						
						// Remove the caption in the image preview in order to replace it with the next
						let currentSlide = slides[currentIndex];
						let elWrap = currentSlide.querySelector('.slide-moving');
						if( elWrap != null ){
							
							elWrap.appendChild(currentImageCaption);
						}
						
						// Update the triggered item flag in slider as it marks the current image
						$('.clapat-slide').removeClass('triggered-item');
						let indexSlide = Number( nextImage.getAttribute('data-slide-index') );
						let nextSlide = slides[indexSlide];
						if( nextSlide ){
							
							nextSlide.classList.add('triggered-item');
							let elNextWrap = nextSlide.querySelector('.slide-moving');
							if( elNextWrap != null ){
								
								let nextCaption = elNextWrap.querySelector('.slide-caption');
								liveTriggeredImage.appendChild( nextCaption );
							}
						}
						
						// Move the slider to the next or prev slide
						slider.goTo(indexSlide);
															
						Flip.from(flipstate, {
							duration: 0.7,
							stagger:0.05,
							ease: 'power3.inOut',
							absolute: true,					 
						})
						
						animateTitle.set(".showcase-carousel .slide-caption span", { y: 120, opacity:0});				
						animateTitle.to(".showcase-carousel .carousel-zoom-wrapper .slide-caption span", { duration: 0.5, y: 0, opacity:1, delay:0.4, stagger:0.03,  ease:Power2.easeOut });
					}
				}
				
				function throttle(calback, delay = 250) {

					let shouldWait = false;

					return (...args) => {
						
						if (shouldWait) return;

						calback(...args);
						shouldWait = true;
						setTimeout(() => {
							
							shouldWait = false;
						}, delay)
					}
				}
				
				const nextBtn = document.querySelector('.cp-button-next');
				
				if( nextBtn != null ){
					
					nextBtn.addEventListener("click", throttle( (event) => {
						console.log("Click event " + performance.now());
						moveThumbGrid("next");
					}, 500));
				}
				
				const prevBtn = document.querySelector('.cp-button-prev');
				
				if( prevBtn != null ){
					
					prevBtn.addEventListener("click", throttle( (event) => {
						
						moveThumbGrid("prev");
					}, 500));
				}
			
			};
			
			
			initEvents();
			
			
			
							
			
			if (!isMobile()) {				
				
				var dragWrapper = $('.clapat-slider');
				dragWrapper.on('mousedown', function (evt) {
					dragWrapper.on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {					  
							// click
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999'});
							$("body").removeClass("scale-drag-x");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();	
							
						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff', backgroundColor:'transparent'});
							} else {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000', backgroundColor:'transparent'});
							}
							$("body" ).addClass("scale-drag-x");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();	
						  
						}
						dragWrapper.off('mouseup mousemove', handler);
					});
				});
				
					
				$('.clapat-slider').on('mouseup touchend', function() {
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999',ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-x");
				});
				
				$("body").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999',ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-x");					
				});
					
				
				$(".showcase-carousel .clapat-slide .slide-inner").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-x')) {
						$('#ball p').remove();
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
					}
				});
				
				$(".trigger-item").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-x')) {
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
					}
				});
				
				$(".showcase-carousel .clapat-slide .slide-inner").on('mouseenter', function() {					
					gsap.to($(this).find('.slide-caption'), {duration: 0.2, opacity:1, ease:Power2.easeOut});
					gsap.set($(this).find('.slide-title span'), {y:40, opacity:0, });
					gsap.to($(this).find('.slide-title span'), {duration: 0.5, y:0, opacity:1, ease:Power2.easeOut});
				});
									
				$(".showcase-carousel .clapat-slide .slide-inner").on('mouseleave', function() {
					gsap.to($(this).find('.slide-caption'), {duration: 0.5, opacity:0, delay:0.1, ease:Power2.easeOut});					
					gsap.to($(this).find('.slide-title span'), {duration: 0.5, y:-60, opacity:0, ease:Power2.easeOut});
				});
			
			}
			
			
			
			$('.trigger-item').on( 'click', function() {
				
				let trigger_item = $(this)
				
				$("body").addClass("load-project-thumb-with-title");
				
				
				gsap.to($(".carousel-thumbs-wrapper .trigger-item"), {duration: 0.3, y: 160, x:0,  opacity:1, stagger:0.05,  delay:0, ease:Power2.easeIn});
				
				$("body").append('<div class="temporary-hero light-content"><div class="outer content-full-width"><div class="inner"></div></div></div>');
				
				
				if ($(this).hasClass("change-header")) {	
					gsap.to($(".slide-title"), {duration: 1.5, color: '#000', delay:0.3, ease:Power4.easeInOut});
				} 
				
				
				gsap.to($(".showcase-carousel .carousel-zoom-wrapper .slide-caption .slide-subtitle span"), {duration: 0.3, y: 30, opacity:0, stagger:-0.03, ease:Power2.easeInOut});
				
				setTimeout( function(){	
					$('.carousel-zoom-wrapper').find('.slide-title').appendTo('.temporary-hero .inner');
					var moveTitle = $('.temporary-hero .inner').outerHeight() - $('.temporary-hero .slide-title').outerHeight();
					gsap.to($(".temporary-hero .slide-title"), {duration: 1.5, y: moveTitle, opacity:1, delay:0.3, ease:Power4.easeInOut});
					
					if (trigger_item.hasClass("change-header")) {	
						gsap.to($(".slide-title"), {duration: 1.5, color: '#000', ease:Power4.easeInOut});
					}
					
					$("body").addClass("show-loader");
					
				} , 300 );
					
				gsap.to('footer, .carousel-nav-wrapper', {duration: 0.5, opacity:0, ease:Power4.easeInOut});
				
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.3, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
					
							
			});
			
			
		}	
		
			
	}//End Showcase Carousel
	

/*--------------------------------------------------
Function Showcase Portfolio
---------------------------------------------------*/	
		
	function ShowcasePortfolio() {
		
		
		if( $('.showcase-portfolio').length > 0 ){
			
			/*if (isMobile()) {
				var winHeight = $(window).height();
							
				$('.showcase-portfolio .clapat-slide').css({'height': winHeight})
				
				var resizeTime;
				$(window).resize(function() {
					clearTimeout(resizeTime);
					resizeTime = setTimeout(doneResizing, 100);
				});
				
				function doneResizing(){
					var winHeight = $(window).height();					
					$('.showcase-portfolio .clapat-slide').css({'height': winHeight});		
				}
			}*/
			
			$("footer").addClass("showcase-footer vertical-arrows");
			
			gsap.set("#slide-inner-temporary", {backgroundColor: document.querySelector("#page-content").getAttribute("data-bgcolor"), delay:0.5});
			gsap.set($(".slide-hero-title span:not(.year)"), {y: 100, opacity:0});
			gsap.set($(".slide-hero-title span.year"), {y: 20, opacity:0});
			gsap.set($(".slide-hero-subtitle span"), {y: 20, opacity:0});
			
		
			slider = new ClapatSlider('.showcase-portfolio', { 
				direction: 'vertical', 
				snap: false,
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				parallax : [{
					element: '#slide-inner-caption',
					margin: 25
				}],
				on: {
					init : function() {
						gsap.to($(".slide-hero-title span:not(.year)"), {duration: 0.7, y: 0, opacity:1, stagger:0.05, delay:0, ease:Power3.easeOut});
						gsap.to($(".slide-hero-title span.year"), {duration: 0.4, y: 0, opacity:0.4, stagger:0.05, delay:0.1, ease:Power3.easeOut});						
						gsap.to($(".slide-hero-subtitle span"), {duration: 0.4, y: 0, opacity:1, stagger:0.05, delay:0.3, ease:Power3.easeOut});
						gsap.to($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info"), {duration: 0.4, opacity:1, delay:0.3, ease:Power3.easeOut});
					},
					activeSlideChanged : function( activeSlide, prevSlide, nextSlide ) {},
					slideLeaveViewport : function( slide ) {						
					   
					   if(slide.classList.contains("hidden-element")) {
							gsap.to($('#slide-inner-temporary'), {duration: 0.3, opacity: 0, delay:0.1, ease: "power3.out", 
							onComplete: function() {
									$('#slide-inner-temporary').remove();
									
								}
							});
							gsap.to($('.hidden-element:not(.clapat-slide-visible)'), {duration: 0.3, opacity: 1, delay:0.1, ease: "power3.out", 
								onComplete: function() {
									$(".clapat-slider div:not(.clapat-slide-visible)").removeClass("hidden-element");
									
								}
							});
						}
					},

				},
 
			});
				
						
			const arrSlides = gsap.utils.toArray('.showcase-portfolio .clapat-slide');
			const slideduration = 1/arrSlides.length;
			
			 slider.tl					
			 	.fromTo('.progress-info-fill', {backgroundSize:"0% 100%" }, {backgroundSize:"100% 100%" }, 0)
				.fromTo('.progress-info-fill-2', {backgroundSize:"100% 100%" }, {backgroundSize:"0% 100%", duration: 0.3, ease: 'power3' }, 0)
				.fromTo('#slide-inner-temporary', {opacity:1, yPercent:0}, {opacity:0, yPercent:-25, duration: slideduration}, 0)
				.fromTo('#slide-inner-temporary', {opacity:0, yPercent:25}, {opacity:1, yPercent:0, duration: slideduration}, "-="+slideduration);
				
				gsap.set("#slide-inner-temporary", {opacity:1, yPercent:0});
				
					
			
			
			$('li.filters-timeline a').on('click', function(e){			
				e.preventDefault();				
				$('.slide-inner').removeClass('disabled');
				gsap.to( $('.slide-inner'), {duration: 0.2, opacity: 1, ease: "power1.in" });
								
				let filterClass = $(this).attr('data-filter');
				if( filterClass == '*' ){
					return;
				}
				
				$( '.slide-inner' ).not(filterClass).addClass('disabled');				
				gsap.to( $('.slide-inner').not(filterClass), {duration: 0.2, opacity: 0.2, ease: "power1.out" });				
			});
			
			
			if (!isMobile()) {				
				
				var dragWrapper = $('.clapat-slider');
				dragWrapper.on('mousedown', function (evt) {
					dragWrapper.on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {					  
							// click
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999'});
							$("body").removeClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							
						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff', backgroundColor:'transparent'});
							} else {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000', backgroundColor:'transparent'});
							}
							$("body" ).addClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
						  
						}
						dragWrapper.off('mouseup mousemove', handler);
					});
				});
				
					
				$('.clapat-slider').on('mouseup touchend', function() {
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");
				});
				
				$("body").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");					
				});
							
				$(".showcase-portfolio .clapat-slide .slide-inner").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-x')) {
						$('#ball p').remove();
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
					}
				});
				
				$(".showcase-portfolio .clapat-slide .slide-inner").on('mouseenter', function() {
					gsap.set($(this).find('.slide-title span'), {y:30, opacity:0, });
					gsap.set($(this).find('.slide-cat span'), {y:30, opacity:0, });
					gsap.to($(this).find('.slide-caption'), {duration: 0.2, opacity:1, ease:Power2.easeOut});
					gsap.to($(this).find('.slide-title span'), {duration: 0.3, y:0, opacity:1, ease:Power2.easeOut});										
					gsap.to($(this).find('.slide-cat span'), {duration: 0.3, y:0, opacity:1, ease:Power2.easeOut});
				});
									
				$(".showcase-portfolio .clapat-slide .slide-inner").on('mouseleave', function() {
					gsap.to($(this).find('.slide-caption'), {duration: 0.3, opacity:0, delay:0.1, ease:Power2.easeOut});					
					gsap.to($(this).find('.slide-title span'), {duration: 0.3, y:-30, opacity:0, ease:Power2.easeOut});					
					gsap.to($(this).find('.slide-cat span'), {duration: 0.5, y:-30, delay:0.05, opacity:0, ease:Power2.easeOut});
				});
			
			}
			
			$('.slide-hero-title span, .slide-hero-subtitle span').wrap('<div></div>');
			
			$('#footer-container').on('click', '.toggle-filters, #close-filters', function() {
				var closeFiltersDiv = document.getElementById("close-filters");
				
				if (!closeFiltersDiv) {
					closeFiltersDiv = document.createElement("div");
					closeFiltersDiv.id = "close-filters";
					document.getElementById("footer-container").appendChild(closeFiltersDiv);
				} else {
					closeFiltersDiv.parentNode.removeChild(closeFiltersDiv);
				}
				
				var filtersWrapper = $("#filters-wrapper");
				filtersWrapper.toggleClass("on open active");
				$(".toggle-filters").text(filtersWrapper.hasClass("on") ? "Close" : "Filters");
				
				var filters = $('#filters');
				var filtersLi = filters.find('li');
				var filtersHeight = 4 + filtersLi.toArray().reduce((acc, li) => acc + $(li).outerHeight(true), 0);
				
				gsap.to(filters, { duration: 0.3, opacity: filtersWrapper.hasClass("on") ? 1 : 0, height: filtersWrapper.hasClass("on") ? filtersHeight : 0, delay: 0 });
				gsap.to('.active-filter-bg', { duration: 0.3, opacity: filtersWrapper.hasClass("on") ? 1 : 0, delay: 0.1 });
			});
			
			
			$("#filters-wrapper").on('click', function () {
				if ($(window).width() > 1024) {
					var filtersWrapper = $(this);
					filtersWrapper.addClass("open");
					setTimeout(() => filtersWrapper.addClass("active"), 200);
				}
			});
			
			$("#filters").on('mouseleave', function() {
				if ($(window).width() > 1024) {
					var filtersWrapper = $("#filters-wrapper");
					filtersWrapper.removeClass("open active on");
					gsap.to('#filters', { duration: 0.3, opacity: 0, height: 0, delay: 0.1 });
				}
			});
			
			
			var filtersTimeline = $(".filters-timeline");
			var firstChild = filtersTimeline.find(":first-child");
			var firstOffsetLeft = firstChild.position().left;
			var firstOffsetTop = firstChild.position().top;
			
			filtersTimeline.on('mouseenter', function() {
				var $this = $(this);
				var offsetLeft = $this.position().left;
				var offsetTop = $this.position().top;								
				gsap.to('.active-filter-bg', { duration: 0.3, width: $this.outerWidth(), x: offsetLeft, y: offsetTop });
				
			}).on('mouseleave', function() {
				gsap.to('.active-filter-bg', { duration: 0.3, width: firstChild.outerWidth(), x: firstOffsetLeft, y: firstOffsetTop });
				
			});

			
			$('.trigger-item').on('click', function() {
				
				$("body").addClass("load-project-thumb");
			
				setTimeout(function() {
					$("body").addClass("show-loader");
				}, 300);
			
				gsap.to('footer, .carousel-nav-wrapper', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
			
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
			});

			
			
			
		}
	
	}//End Showcase Portfolio
	
	

	
	
/*--------------------------------------------------
Function Showcase Lists
---------------------------------------------------*/
	
	function ShowcaseLists() {
	
		if( $('.showcase-lists').length > 0 ){
			
			$("footer").addClass("showcase-footer vertical-arrows");
			
			// timeline slide list total height sum < window height,  then duplicate until they pass the window height
			const slidesRoot = document.querySelector('.clapat-sync-slider .clapat-sync-slider-wrapper .clapat-sync-slider-viewport');
			const slidesList = slidesRoot.querySelectorAll('.clapat-sync-slider .clapat-sync-slide');
			
			let slidesHeight = 0;
			for (const clapatSyncSlide of slidesList) {
				
				slidesHeight += clapatSyncSlide.offsetHeight;
			}
			let iterCloning = Math.floor(window.innerHeight/slidesHeight);
			if( iterCloning >= 1 ){
				
				iterCloning--;
				if( (window.innerHeight % slidesHeight) > 0 ){
					
					iterCloning++;
				}
				
				for( let i=0; i<iterCloning; i++ ){
				
					for (const clapatSyncSlide of slidesList) {
				
						let cloneSlide = clapatSyncSlide.cloneNode(true);
						slidesRoot.appendChild(cloneSlide);
					}
				}
			}
			
			const clapatSyncSlider = document.querySelector('.clapat-slider-wrapper.showcase-lists .clapat-sync-slider-viewport');
			const syncSliderClone = clapatSyncSlider.cloneNode(true);
			document.querySelector(".clapat-slider-wrapper.showcase-lists .clapat-sync-slider-wrapper").appendChild(syncSliderClone); 
			
			slider = new ClapatSlider('.showcase-lists', { 
				direction: 'vertical', 
				snap: false,
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				on: {
					init : function() {
						gsap.to($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info"), {duration: 0.4, opacity:1, delay:0.3, ease:Power3.easeOut});
					}
				} 
			});
				 
			
			const syncSliderCloneTranslate = document.querySelectorAll('.clapat-slider-wrapper.showcase-lists .clapat-sync-slider-wrapper > .clapat-sync-slider-viewport');
			const titleWrapper = document.querySelector('.clapat-sync-slider-wrapper')
			
			slider.tl
				.fromTo('.clapat-slider-wrapper.showcase-lists .clapat-sync-slider-wrapper', {yPercent: 0 },{ yPercent: -(100 - (100 / syncSliderCloneTranslate.length))},0)
				.fromTo('.hover-reveal', {y: 0}, {y: + (titleWrapper.offsetHeight/2)}, 0)
				.fromTo('.progress-info-fill', {backgroundSize:"0% 100%" }, {backgroundSize:"100% 100%" }, 0)
				.fromTo('.progress-info-fill-2', {backgroundSize:"100% 100%" }, {backgroundSize:"0% 100%", duration: 0.3, ease: 'power3' }, 0);
				
			$('.carousel-prev').on( 'click', function() {				
				if( window.rotateElement && window.rotateElement.isActive() ){  
					return; 
				} else {
					window.rotateElement = gsap.to($(this).find('i'), {duration: 0.3, rotate:"-= 180"}); 
				}
			});
			
			$('.carousel-next').on( 'click', function() {				
				if( window.rotateElement && window.rotateElement.isActive() ){  
					return; 
				} else {
					 window.rotateElement = gsap.to($(this).find('i'), {duration: 0.3, rotate:"+= 90"}); 
				}
			});
			
			
			if (!isMobile()) {				
				
				var dragWrapper = $('.clapat-slider');
				dragWrapper.on('mousedown', function (evt) {
					dragWrapper.on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {					  
							// click
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
							$("body").removeClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							
							$(".showcase-lists .clapat-sync-slide .slide-inner").on('click', function() {	
								if (!$('body').hasClass('scale-drag-y')) {
									gsap.to($(".showcase-lists .slide-title span"), {duration: 0.4, y: -70, opacity:0, delay:0.1, ease:Power2.easeInOut});
									gsap.to($(".showcase-lists .slide-title i"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeInOut});
								}			
							})
							
							
						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff', backgroundColor:'transparent'});
							} else {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000', backgroundColor:'transparent'});
							}
							$("body" ).addClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
						  
						}
						dragWrapper.off('mouseup mousemove', handler);
					});
				});
				
					
				$('.clapat-slider').on('mouseup touchend', function() {
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");
				});
				
				$("body").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");					
				});
					
				
				/*$(".showcase-lists .clapat-sync-slide .slide-inner").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-y')) {
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$this.data('color'), backgroundColor:$this.data('color')});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$( "#ball" ).addClass("with-icon").append( '<i class="arrow-icon"></i>' );	
						$(".showcase-carousel .clapat-slide").addClass('hover-slide');
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-y')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-icon");
						$('#ball i').remove();
						$(".showcase-carousel .clapat-slide").removeClass('hover-slide');
					}
				});*/
				
				$(".showcase-lists .clapat-sync-slide .slide-inner").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-x')) {
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.2)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + 'OPEN' + '</p>' );
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();	
					}
				});
				
				$('.clapat-sync-slide').on('mouseenter', function() {
					$('.clapat-sync-slide').addClass('disable');
					$(this).removeClass('disable');
					$(this).find('video').each(function() {
						$(this).get(0).play();
					});
				}).on('mouseleave', function() {
					$('.clapat-sync-slide').removeClass('disable');
					$(this).find('video').each(function() {
						$(this).get(0).pause();
					});
				});
			
			}
			
			const getMousePos = (e) => {
				let posx = 0;
				let posy = 0;
				if (!e) e = window.event;
				if (e.pageX || e.pageY) {
					posx = e.pageX;
					posy = e.pageY;
				}
				else if (e.clientX || e.clientY) 	{
					posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				return { x : posx, y : posy }
			}
			
			// Effect 1
			class HoverImgFx1 {
				constructor(el) {
					this.DOM = {el: el};
					this.DOM.reveal = this.DOM.el.querySelector('.hover-reveal');				
					this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
					this.DOM.revealInner.style.overflow = 'hidden';
					this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
					this.initEvents();
				}
				initEvents() {	
					this.positionElement = (ev) => {
						const mousePos = getMousePos(ev);		
						gsap.to($('.hover-reveal'), { 
							duration: 0.7, 
							top: `${mousePos.y-(this.DOM.el.querySelector('.hover-reveal').offsetHeight*0.5)}px`, 
							left: `${mousePos.x-(this.DOM.el.querySelector('.hover-reveal').offsetWidth*0.5)}px`, 
							ease:Power4.easeOut 
						});
					};
					this.mouseenterFn = (ev) => {
						this.positionElement(ev);
						this.showImage();
					};
					this.mousemoveFn = ev => requestAnimationFrame(() => {
						this.positionElement(ev);
					});
					this.mouseleaveFn = () => {
						this.hideImage();
					};
					
					this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
					this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
					this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
				}
				showImage() {
					gsap.killTweensOf(this.DOM.revealInner);
					gsap.killTweensOf(this.DOM.revealImg);
			
					this.tl = gsap.timeline({
						onStart: () => {
							this.DOM.reveal.style.opacity = 1;
							gsap.set(this.DOM.el, {zIndex: 1000});
						}
					})
					.add('begin')
					.add(gsap.to(this.DOM.revealInner, {
						duration: 0.4,
						ease: Sine.easeOut,
						startAt: {x: '-100%'},
						x: '0%'
					}), 'begin')
					.add(gsap.to(this.DOM.revealImg, {
						duration: 0.4,
						ease: Sine.easeOut,
						startAt: {x: '100%'},
						x: '0%'
					}), 'begin');
				}
				hideImage() {
					gsap.killTweensOf(this.DOM.revealInner);
					gsap.killTweensOf(this.DOM.revealImg);
			
					this.tl = gsap.timeline({
						onStart: () => {
							gsap.set(this.DOM.el, {zIndex: 999});
						},
						onComplete: () => {
							gsap.set(this.DOM.el, {zIndex: ''});
							gsap.set(this.DOM.reveal, {opacity: 0});
						}
					})
					.add('begin')
					.add(gsap.to(this.DOM.revealInner, {
						duration: 0.4,
						ease: Sine.easeOut,
						x: '100%'
					}), 'begin')
					
					.add(gsap.to(this.DOM.revealImg, {
						duration: 0.4,
						ease: Sine.easeOut,
						x: '-100%'
					}), 'begin');
				}
			}
			
			Array.from(document.querySelectorAll('.clapat-sync-slide')).forEach(link => new HoverImgFx1(link));
			
		}	
		
			
	}//End Showcase Lists	
	
	
/*--------------------------------------------------
Function Showcase Reverse
---------------------------------------------------*/	
		
	function ShowcaseReverse() {
		
		
		if( $('.showcase-reverse').length > 0 ){
			
			$("footer").addClass("showcase-footer vertical-arrows");			
			
			
			
			
			//gsap.set("#slide-inner-temporary", {backgroundColor: document.querySelector("#page-content").getAttribute("data-bgcolor"), delay:0.5});
			gsap.set($(".slide-hero-title span:not(.year)"), {y: 100, opacity:0});
			gsap.set($(".slide-hero-title span.year"), {y: 20, opacity:0});
			gsap.set($(".slide-hero-subtitle span"), {y: 20, opacity:0});
			gsap.set($('.showcase-reverse'), {delay:0.5, opacity: 1});
			
			slider = new ClapatSlider('.showcase-reverse', { 
				direction: 'vertical', 
				snap: false,
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				parallax : [{
					element: '.speed-50',
					margin: -100					
				}],
				on: {	
					init : function() {
						gsap.to($(".slide-hero-title span:not(.year)"), {duration: 0.7, y: 0, opacity:1, stagger:0.05, delay:0, ease:Power3.easeOut});
						gsap.to($(".slide-hero-title span.year"), {duration: 0.4, y: 0, opacity:0.4, stagger:0.05, delay:0.1, ease:Power3.easeOut});						
						gsap.to($(".slide-hero-subtitle span"), {duration: 0.4, y: 0, opacity:1, stagger:0.05, delay:0.3, ease:Power3.easeOut});
						gsap.to($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info"), {duration: 0.4, opacity:1, delay:0.3, ease:Power3.easeOut});
					},
					slideLeaveViewport : function( slide ) {
					   if(slide.classList.contains("hidden-element")) {
						    if (isMobile()) {
												
							}
							gsap.to($('.hidden-element:not(.clapat-slide-visible)'), {duration: 0.3, opacity: 1, delay:0.2, ease: "power3.out", 
								onComplete: function() {
									$(".clapat-slider div:not(.clapat-slide-visible)").removeClass("hidden-element");
								}
							});
						}
						
						gsap.set($('.clapat-slider div:not(.clapat-slide-visible) .slide-parallax'), { y: "" });						
					},

				},
			});
			
			 slider.tl					
			 	.fromTo('.progress-info-fill', {backgroundSize:"0% 100%" }, {backgroundSize:"100% 100%" }, 0)
				.fromTo('.progress-info-fill-2', {backgroundSize:"100% 100%" }, {backgroundSize:"0% 100%", duration: 0.3, ease: 'power3' }, 0);
			
			
			
			if (!isMobile()) {				
				
				var dragWrapper = $('.clapat-slider');
				dragWrapper.on('mousedown', function (evt) {
					dragWrapper.on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {					  
							// click
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							$("body").removeClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							
						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff', backgroundColor:'transparent'});
							} else {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000', backgroundColor:'transparent'});
							}
							$("body" ).addClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
						  
						}
						dragWrapper.off('mouseup mousemove', handler);
					});
				});
				
					
				$('.clapat-slider').on('mouseup touchend', function() {
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");
				});
				
				$("body").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");					
				});
					
				
				$(".showcase-reverse .clapat-slide .slide-inner").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-x')) {
						$('#ball p').remove();
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
						//gsap.set($this.find('.img-mask'), {opacity:1});
						//gsap.set($(".showcase-reverse .clapat-slide .slide-inner").not($this), {backgroundColor: document.querySelector("#page-content").getAttribute("data-bgcolor")});
						//gsap.to($(".showcase-reverse .clapat-slide .slide-inner").not($this).find('.img-mask'), { duration: 0.2, opacity: 0.4 });
						gsap.to($(".slider-fixed-content"), { duration: 0.2, opacity: 0.4 });
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
						//gsap.to('.showcase-reverse .clapat-slide .slide-inner .img-mask', {duration: 0.2, opacity:1});
						gsap.to($(".slider-fixed-content"), { duration: 0.2, opacity: 1 });
					}
				});
			
			}
			
			$('.slide-hero-title span, .slide-hero-subtitle span').wrap('<div></div>');
			
			$('.trigger-item').on('click', function() {
				
				$("body").addClass("load-project-thumb");
			
				setTimeout(function() {
					$("body").addClass("show-loader");
				}, 300);
			
				gsap.to('footer, .carousel-nav-wrapper', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
			
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
			});
			
			
		}
	
	}//End Showcase Gallery
	
	
	
/*--------------------------------------------------
Function Showcase Gallery
---------------------------------------------------*/	
		
	function ShowcaseGallery() {
		
		
		if( $('.showcase-gallery').length > 0 ){
			
			$("footer").addClass("showcase-footer vertical-arrows");
						
			if (!isMobile()) {		
			
				const clapatSyncSlider = document.querySelector('.clapat-slider-wrapper.showcase-gallery .sync-one .clapat-sync-slider-viewport');
				const syncSliderClone = clapatSyncSlider.cloneNode(true);
				document.querySelector(".clapat-slider-wrapper.showcase-gallery .sync-one .clapat-sync-slider-wrapper").appendChild(syncSliderClone);
				
				const clapatSyncSliderTwo = document.querySelector('.clapat-slider-wrapper.showcase-gallery .sync-two .clapat-sync-slider-viewport');
				const syncSliderCloneTwo = clapatSyncSliderTwo.cloneNode(true);
				document.querySelector(".clapat-slider-wrapper.showcase-gallery .sync-two .clapat-sync-slider-wrapper").appendChild(syncSliderCloneTwo);
				
				const clapatSyncSliderThree = document.querySelector('.clapat-slider-wrapper.showcase-gallery .sync-three .clapat-sync-slider-viewport');
				const syncSliderCloneThree = clapatSyncSliderThree.cloneNode(true);
				document.querySelector(".clapat-slider-wrapper.showcase-gallery .sync-three .clapat-sync-slider-wrapper").appendChild(syncSliderCloneThree);
			
			} else {
				
				const clapatSyncSliderTwoSlides = document.querySelectorAll('.clapat-slider-wrapper.showcase-gallery .sync-two .clapat-sync-slider-viewport .clapat-sync-slide.flip-slide');
				const clapatSyncSliderOne = document.querySelector(".clapat-slider-wrapper.showcase-gallery .sync-one .clapat-sync-slider-viewport");
				for (const clapatSyncSlideTwo of clapatSyncSliderTwoSlides) {
					
					clapatSyncSliderOne.appendChild(clapatSyncSlideTwo);
				}
								
				const clapatSyncSliderThreeSlides = document.querySelectorAll('.clapat-slider-wrapper.showcase-gallery .sync-three .clapat-sync-slider-viewport .clapat-sync-slide.flip-slide');
				const clapatMainSlider = document.querySelector(".clapat-slider-wrapper.showcase-gallery .clapat-slider-viewport");
				for (const clapatSyncSlideThree of clapatSyncSliderThreeSlides) {
					
					clapatSyncSlideThree.classList.replace("clapat-sync-slide", "clapat-slide");
					clapatMainSlider.appendChild(clapatSyncSlideThree);
				}
				
				const clapatSyncSlider = document.querySelector('.clapat-slider-wrapper.showcase-gallery .sync-one .clapat-sync-slider-viewport');
				const syncSliderClone = clapatSyncSlider.cloneNode(true);
				document.querySelector(".clapat-slider-wrapper.showcase-gallery .sync-one .clapat-sync-slider-wrapper").appendChild(syncSliderClone);
				
				document.querySelector(".clapat-sync-slider.sync-two").remove();
				document.querySelector(".clapat-sync-slider.sync-three").remove();
			}
			
			slider = new ClapatSlider('.showcase-gallery', { 
				direction: 'vertical', 
				snap: false,
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				on: {
					init : function() {
						gsap.to($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info"), {duration: 0.4, opacity:1, delay:0.3, ease:Power3.easeOut});
					}
				} 
			});
			
			const syncSliderCloneTranslate = document.querySelectorAll('.clapat-slider-wrapper.showcase-gallery .sync-one .clapat-sync-slider-wrapper > .clapat-sync-slider-viewport');
			const syncSliderCloneTranslateTwo = document.querySelectorAll('.clapat-slider-wrapper.showcase-gallery .sync-two .clapat-sync-slider-wrapper > .clapat-sync-slider-viewport');
			const syncSliderCloneTranslateThree = document.querySelectorAll('.clapat-slider-wrapper.showcase-gallery .sync-three .clapat-sync-slider-wrapper > .clapat-sync-slider-viewport');
			
			if (!isMobile()) {	
					
				slider.tl
				.fromTo('.clapat-slider-wrapper.showcase-gallery .sync-one .clapat-sync-slider-wrapper', {yPercent:  -(100 - (100 / syncSliderCloneTranslate.length)) },{ yPercent:0},0)
				.fromTo('.clapat-slider-wrapper.showcase-gallery .sync-two .clapat-sync-slider-wrapper', {yPercent:  -(100 - (100 / syncSliderCloneTranslateTwo.length)) },{ yPercent:0},0)
				.fromTo('.clapat-slider-wrapper.showcase-gallery .sync-three .clapat-sync-slider-wrapper', {yPercent:0},{ yPercent:  -(100 - (100 / syncSliderCloneTranslate.length)) },0);
				
			} else {	
						
				slider.tl
				.fromTo('.clapat-slider-wrapper.showcase-gallery .sync-one .clapat-sync-slider-wrapper', {yPercent:  -(100 - (100 / syncSliderCloneTranslate.length)) },{ yPercent:0},0);
				
			}
			
			
			$('li.filters-timeline a').on('click', function(e){			
				e.preventDefault();				
				$('.slide-inner').parent().removeClass('disabled');
				gsap.to( $('.slide-inner'), {duration: 0.2, opacity: 1, ease: "power1.in" });
								
				let filterClass = $(this).attr('data-filter');
				if( filterClass == '*' ){
					return;
				}
				
				$( '.slide-inner' ).not(filterClass).parent().addClass('disabled');				
				gsap.to( $('.slide-inner').not(filterClass), {duration: 0.2, opacity: 0.3, ease: "power1.out" });				
			});
			
			
			if (!isMobile()) {				
				
				var dragWrapper = $('.clapat-slider');
				dragWrapper.on('mousedown', function (evt) {
					dragWrapper.on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {					  
							// click
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							$("body").removeClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							
						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff', backgroundColor:'transparent'});
							} else {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000', backgroundColor:'transparent'});
							}
							$("body" ).addClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
						  
						}
						dragWrapper.off('mouseup mousemove', handler);
					});
				});
				
					
				$('.clapat-slider').on('mouseup touchend', function() {
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");
				});
				
				$("body").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");					
				});
					
				
				$(".showcase-gallery .slide-inner").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-y')) {
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$this.data('color'), backgroundColor:$this.data('color')});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$( "#ball" ).addClass("with-icon").append( '<i class="arrow-icon"></i>' );							
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-y')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-icon");
						$('#ball i').remove();
					}
				});
				
				$(".showcase-gallery .clapat-slider .slide-inner").on('mouseenter', function() {						
					$(this).find('video').each(function() {
						$(this).get(0).play();
					});	
				}).on('mouseleave', function() {
					$(this).find('video').each(function() {
						$(this).get(0).pause();
					});
				});
				
				$('.clapat-sync-slider-viewport .clapat-sync-slide').on('mouseenter', function() {	
					$(this).find('video').each(function() {
						$(this).get(0).play();
					});
					var index = $(this).index();
					$(this).parent().siblings().each( function () {
						
						let clone = $(this).children().eq( index );
						clone.find('video').each(function() {
							$(this).get(0).play();
						});
					});
				}).on('mouseleave', function() {		
					$(this).find('video').each(function() {
						$(this).get(0).pause();
					});
					var index = $(this).index();
					$(this).parent().siblings().each( function () {
						
						let clone = $(this).children().eq( index );
						clone.find('video').each(function() {
							$(this).get(0).pause();
						});
					});
				});
				
				
				$(".close-thumbnail").on('mouseenter', function() {	
					$( "#ball" ).addClass("close-icon").append( '<i class="fa-solid fa-xmark"></i>' );
					if ($('#page-content').hasClass("light-content")) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
						gsap.to('#ball i', {duration: 0.2, css:{color:"#fff"}});
					} else {
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000',});
						gsap.to('#ball i', {duration: 0.2, css:{color:"#000"}});
					}
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				}).on('mouseleave', function() {	
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					gsap.to('#ball-loader', {duration: 0.2,borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("close-icon");
					$('#ball i').remove();
				});
			
			}
			
			$(".toggle-filters, #close-filters").on('click', function () {
				var filtersWrapper = $("#filters-wrapper");
				filtersWrapper.toggleClass("on");				
				if (filtersWrapper.hasClass("on")) {
					$(".toggle-filters").text("Close");
					var filters = $('#filters');
					var filtersLi = filters.find('li');
					var filtersHeight = 0;					
					filtersLi.each(function() {filtersHeight += $(this).outerHeight(true);});					
					gsap.to(filters, {duration: 0.3, opacity: 1, height: filtersHeight, delay: 0});				
					gsap.to('.active-filter-bg', {duration: 0.3, opacity: 1, delay: 0.1});
				
				} else {				
					$(".toggle-filters").text("Filters");
					gsap.to('#filters', {duration: 0.3, opacity: 0, height: 0, delay: 0.1});				
					gsap.to('.active-filter-bg', {duration: 0.3, opacity: 0, delay: 0});					
				}
			});
			
			$(".filters-timeline").on('mouseenter', function() {
				var $this = $(this);
				var offsetLeft = $(this).position().left;
				var offsetTop = $(this).position().top;		
				gsap.to('.active-filter-bg', {duration: 0.3, width: $this.width(), x:offsetLeft, y:offsetTop });
			});
			
			
			let thumbnailCards = gsap.utils.toArray(".flip-slide"),
				hero = document.querySelector(".open-thumbnail"),
				currentCard;
				
			let closeCards = document.querySelector(".close-thumbnail");
				closeCards.addEventListener("click", closeCard);
			
			thumbnailCards.forEach((thumbnailCard) =>
			  	thumbnailCard.addEventListener("click", onClickThumbnail)
			);
			
			hero.addEventListener("click", closeHero);
			
			function closeHero() {
				let triggerItem = hero.querySelector('.trigger-item');
				if( triggerItem != null ) return;
				closeCard();
			}
			
			
			function closeCard() {
				if (currentCard) {
					let img = hero.querySelector(".slide-inner"),
						state = Flip.getState(img);
						
					currentCard.appendChild(img);
					gsap.to('.slide-caption.active .slide-title span', {duration: 0.35, opacity:0, y: 50, delay:0, ease:Power3.easeOut});
					gsap.to('.slide-caption.active .slide-cat span', {duration: 0.35, opacity:0, y: 30, delay:0, ease:Power3.easeOut});
					
					let video = currentCard.querySelector('video');
					if (video !== null) {
						video.pause();
					}
					
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					$("body").removeClass("scale-drag-y");
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();
										
					currentCard.querySelector('.section-image').classList.remove("active");
					currentCard.querySelector('.slide-caption').classList.remove("active");	
							
					Flip.from(state, {
						duration: 0.4,
						delay:0.15,
						absolute: true,
						ease: "power1.inOut",
						onComplete: function() {
							$('.slider-fixed-content').removeClass('enable');
							$('.showcase-gallery').removeClass('disable');
							$('.flip-slide').removeClass('above');	  	
						}
					});					
					currentCard = null;
					gsap.to('.section-image, #filters-wrapper', {duration: 0.3, opacity:1, scale: 1, delay:0.3, ease:Power3.easeOut});
				}
			}
			
			function onClickThumbnail(e) {
			  	let thumbnailCard = e.currentTarget,
					image = thumbnailCard.querySelector(".slide-inner");
			  	if (thumbnailCard !== currentCard) {
					closeHero();
					currentCard = thumbnailCard;
				
					thumbnailCard.classList.add("above");
					let child_item_image = thumbnailCard.querySelector('.section-image');
					child_item_image.classList.add('active');
					let child_item_caption = thumbnailCard.querySelector('.slide-caption');
					child_item_caption.classList.add('active');
					
					$('.showcase-gallery').addClass('disable');  
					
					let state = Flip.getState(image);
					hero.appendChild(image);
					Flip.from(state, {
				  		duration: 0.4,
				  		absolute: true,
				  		ease: "power1.inOut", 
						onComplete: function() {
							$('.slider-fixed-content').addClass('enable');								
						} 
					});
					
					
					gsap.to('.section-image:not(.active)', {duration: 0.2, opacity:0, scale: 0.7, delay:0, ease:Power1.inOut});
					gsap.to('#filters-wrapper', {duration: 0.2, opacity:0, delay:0, ease:Power1.inOut});
					
					
					gsap.to('.open-thumbnail .slide-caption.active .slide-title span', {duration: 0.4, opacity:1, y: 0, delay:0.25, ease:Power3.easeOut});
					gsap.to('.open-thumbnail .slide-caption.active .slide-cat span', {duration: 0.35, opacity:1, y: 0, delay:0.35, ease:Power3.easeOut});
					
			  	} else {
					closeHero();
			  	}
			}
			
			
		}
	
	}//End Showcase Gallery	
	
		



	window.LoadViaAjax = function() {	
		
		CleanupBeforeAjax();	
		FirstLoad();
		ScrollEffects();
		Sliders();
		PageLoadActions();
		FitThumbScreenGSAP();
		ShowcaseCarousel();		
		ShowcasePortfolio();
		ShowcaseLists();
		ShowcaseReverse();
		ShowcaseGallery();
		FitThumbScreenWEBGL();		
		LazyLoad();	
		Shortcodes();		
		JustifiedGrid();
		Lightbox();
		PlayVideo();
		CustomFunction();
		
	}//End Load Via Ajax
	
});	


var LoadViaAjax = window.LoadViaAjax;	
	
	

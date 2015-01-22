"use strict"

var controllerMasterpiece = {

    /**
     * Initialisation
     */
    init: function(id, temp) {
		UI.init();
//        controllerMasterpiece.detectMob();
        controllerMasterpiece.currentView = "descView";

        // TODO : récupérer l'id via un data-attribute [id-oeuvre=""]
        var idOeuvre = id;
        var impactsList = temp.impacts;
        // Bind les events sur les orbites et la nav
        controllerMasterpiece.bindOrbitEvents();
        controllerMasterpiece.bindNavEvents();

        // Create zoom img
        var src = document.querySelector('.cover-image').style.backgroundImage;
		src = src.replace('url(','').replace(')','');
        controllerMasterpiece.zoom(src);



            // Pour chaque impact, on place un point
            for(var i = 0; i < impactsList.length; i++){

                var impact = impactsList[i];
                var nbrImpacts = impactsList.length;

                UI.placePoint(impact, nbrImpacts, i, function(impact){
                    impact.addEventListener('click', controllerMasterpiece.toggleLinkedItem, false);
                    impact.addEventListener('mouseover', controllerMasterpiece.syncCanvasList, false);
                    impact.addEventListener('mouseleave', controllerMasterpiece.syncCanvasList, false);
                });

                UI.seedImpactsList(impact, i, function(listItem){

                    listItem.addEventListener('click', controllerMasterpiece.toggleAccordeon, false);
                    listItem.addEventListener('mouseenter', controllerMasterpiece.syncListCanvas, false);
                    listItem.addEventListener('mouseleave', controllerMasterpiece.syncListCanvas, false);

                });

            }


    }, // End init

    /**
     * Gère l'accordeon de la liste d'impacts
     */
    toggleAccordeon: function() {
        UI.toggleAccordeonState(this);
    },

    /**
     * Synchronise les mouse events du canvas avec la liste
     * @param {Object} e L'event déclenché
     */
    syncCanvasList: function(e) {

        // Récupère l'attribut de l'élément survolé + le type d'event
        var hoveredClass = this.getAttribute('data-group');
        var hoveredGroup = document.querySelectorAll('g.'+hoveredClass)[0];
        var eventType = e.type;

        var id = this.getElementsByClassName('inner-circle')[0].getAttribute('id');

        var listItem = document.getElementsByClassName('impacts-list')[0].querySelector('[id="'+id+'"]');

        // Stop ou relance l'animation selon le type d'event
        UI.toggleRotateAnimation(hoveredGroup, eventType);

         // Anime le point au hover
        UI.toggleHighlightImpact(id, eventType);
		
		// Anime le point de la liste
		UI.toggleImpactList(listItem, eventType);

    },


    /**
     * Synchronisation du clic sur le canvas avec l'accordeon
     */

    toggleLinkedItem: function(e) {
        var id = this.getElementsByClassName('inner-circle')[0].getAttribute('id');
        var listItem = document.getElementsByClassName('impacts-list')[0].querySelector('[id="'+id+'"]');
		var eventType = e.type;
		// Anime le point
        UI.toggleHighlightImpact(id, eventType);
		// Anime le point de la liste
		UI.toggleImpactList(listItem, eventType);
		
        if(controllerMasterpiece.currentView == "descView") {
            controllerMasterpiece.goToImpactsView();
            UI.toggleAccordeonState(listItem);
			UI.scrollToImpact(listItem);
        } else {
            UI.toggleAccordeonState(listItem);
			UI.scrollToImpact(listItem);
        }


    },

    /**
     * Synchronise le hover de la liste et l'impact lié sur le canvas
     * @param {Object} e L'event déclenché
     */
    syncListCanvas: function(e) {

        var eventType = e.type;
        var id = this.getAttribute('id');
        UI.toggleHighlightImpact(id, eventType);
    },

    /**
     * Bind les events de navigation
     */
    bindNavEvents: function() {

        var goToImpacts = document.getElementsByClassName('go-impacts')[0];
        var goToDesc = document.getElementsByClassName('go-desc')[0];
        var oeuvre = document.getElementsByClassName('oeuvre')[0];
        var cover = document.getElementsByClassName('cover-image')[0];
        var zoomView = document.getElementsByClassName('zoom')[0];
        var next = document.getElementsByClassName('next')[0];
        var previous = document.getElementsByClassName('previous')[0];
        var home = document.getElementsByClassName('go-home')[0];
        var lightbox = document.getElementsByClassName('lightbox')[0];
        var legende = document.getElementsByClassName('legende')[0];

		if(previous.getAttribute('id-oeuvre') == '') {
			previous.parentNode.removeChild(previous);
		}
		if(next.getAttribute('id-oeuvre') == '') {
			next.parentNode.removeChild(next);
		}
        goToImpacts.addEventListener('click', controllerMasterpiece.goToImpactsView,false);
        goToDesc.addEventListener('click', controllerMasterpiece.goToDescView,false);

        oeuvre.addEventListener('click', function() {

            if(controllerMasterpiece.currentView == "descView"){
                UI.bounceEffect(this);
            } else {
                controllerMasterpiece.goToDescView();
            }

        }, false);

        cover.addEventListener('click', controllerMasterpiece.toggleZoomView, false);
        zoomView.addEventListener('click', controllerMasterpiece.toggleZoomView, false);

        home.addEventListener('click', controllerMasterpiece.goToHomeView, false);

//        next.addEventListener('click', controllerMasterpiece.goToNextMasterpiece, false);
//        previous.addEventListener('click', controllerMasterpiece.goToPreviousMasterpiece, false);
        legende.addEventListener('click', controllerMasterpiece.openLightbox, false);
        lightbox.addEventListener('click', controllerMasterpiece.closeLightbox, false);
        lightbox.addEventListener('mouseleave', controllerMasterpiece.closeLightbox, false);

        if(next) next.addEventListener('click', controllerMasterpiece.changeMasterpiece, false);
        if(previous) previous.addEventListener('click', controllerMasterpiece.changeMasterpiece, false);

    },

	changeMasterpiece: function() {
		var id = this.getAttribute('id-oeuvre');
		controllerMasterpiece.goToOtherMasterpiece(id);
	},

    handleMouseOverOrbit: function(e) {

        var hoveredClass = this.getAttribute('data-group');
        var hoveredGroup = document.querySelectorAll('g.'+hoveredClass)[0];
        var eventType = e.type;
        UI.toggleRotateAnimation(hoveredGroup, eventType, this);
    },

    /**
     * Bind les events sur les orbites
     */
    bindOrbitEvents: function() {

        // Bind les event à l'initialisation
        var orbites = document.getElementsByClassName('orbit');
        for(var i=0;i<orbites.length;i++) {
            orbites[i].addEventListener('mouseover', controllerMasterpiece.handleMouseOverOrbit, false);
            orbites[i].addEventListener('mouseleave', controllerMasterpiece.handleMouseOverOrbit, false);
        }
    },


    /**
     * Gestion du zoom sur l'image grande taille
     * @param {[[Type]]} link L'url de l'image
     */
    zoom: function(link) {

        UI.createImage(link, function(){

            var evt = new Event(),
            m = new Magnifier(evt);
            m.attach({
                thumb: '#thumb',
                large: link,
                mode: 'inside',
                zoom: 2,
                zoomable: true
            });

        });

    },
//
//    detectMob: function () {
//            if( navigator.userAgent.match(/Android/i)
//                || navigator.userAgent.match(/webOS/i)
//                || navigator.userAgent.match(/iPhone/i)
//                || navigator.userAgent.match(/iPad/i)
//                || navigator.userAgent.match(/iPod/i)
//                || navigator.userAgent.match(/BlackBerry/i)
//                || navigator.userAgent.match(/Windows Phone/i)
//                || window.innerWidth <= 750
//                || window.innerHeight <= 640
//                ){
//                document.getElementsByClassName('mobile')[0].style.display = "block";
//            }
//            else {
//                document.getElementsByClassName('mobile')[0].style.display = "none";
//            }
//
//    },

    //////////////////////////////////////////////////
    //
    //  GESTION DES VIEWS
    //
    //////////////////////////////////////////////////

    openLightbox: function() {
        UI.renderLightboxViewIn(function() {


        });
    },

    closeLightbox: function() {
        UI.renderLightboxViewOut(function() {


        });
    },

    goToImpactsView: function() {
        UI.renderImpactsView(function(){
            controllerMasterpiece.currentView = "impactView";
        });

    },

    goToDescView: function() {
        UI.renderDescriptionView(function(){
            controllerMasterpiece.currentView = "descView";
        });
    },

    goToHomeView: function() {
        UI.renderTimelineView(function(){
            controller.backToTimeline();
            view.timelineMenu.opacity = 0;
        });
    },
	
	goToOtherMasterpiece: function(id) {
		UI.renderTimelineView(function(){
            controller.appendSingleView(id);
            view.timelineMenu.opacity = 0;
        });
	},

    toggleZoomView: function() {

        if(controllerMasterpiece.currentView == "zoomView") {
            UI.quitZoomView(function(){
                controllerMasterpiece.currentView = "descView";
            });
        } else {
            UI.renderZoomView(function(){
                controllerMasterpiece.currentView = "zoomView";
            });
        }

    }

}

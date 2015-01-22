"use strict"

var UI = {

    init: function() {
        UI.loader = document.getElementsByClassName('loader')[0];
        UI.univers = document.getElementsByClassName('univers')[0];
        UI.impactsList = document.getElementsByClassName('impacts-list')[0];
        UI.impactsView = document.getElementsByClassName('impacts')[0];
        UI.descView = document.getElementsByClassName('data')[0];
        UI.zoomView = document.getElementsByClassName('zoom')[0];
        UI.canvas = document.getElementsByTagName('svg')[0];
        UI.oeuvre = document.getElementsByClassName('oeuvre')[0];
        UI.navigation = document.getElementsByClassName('navigation')[0];
        UI.legende = document.getElementsByClassName('legende')[0];
        UI.lightbox = document.getElementsByClassName('lightbox')[0];

        UI.canvas.style.transform = "scale(0)";
        UI.oeuvre.style.transform = "scale(0)";
        UI.descView.style.right = "-100%";
        UI.loader.style.right = "-100%";
        UI.legende.style.opacity = 0;
        UI.navigation.style.opacity = 0;

        UI.animateViewIn();
        $('#loader').spriteOnHover({fps:48, autostart: true, loop: 'infinite'});

    },


    /**
     * Place un impact sur son orbite
     * @param {Object}   impact     L'objet impact courant
     * @param {[[Type]]} nbrImpacts Le nombre d'impact total pour l'oeuvre courante
     * @param {[[Type]]} id         L'index de l'impact qui permet de l'identifier de manière unique
     * @param {[[Type]]} callback   Callback qui permet de bind les events
     */
    placePoint: function(impact, nbrImpacts, id, callback){

        // On teste le genre de l'impact pour définir sur quel orbite placer le point
        switch(impact.genre) {

            // Genre 1 => Impact technique
            case "1":
                var radius = 80;
                var circleClass = "tech";
                var groupClass = "techGroup";
                break;

            // Genre 2 => Impact sociologique
            case "2":
                var radius = 140;
                var circleClass = "socio";
                var groupClass = "socioGroup";
                break;

            // Genre 3 => Impact économique
            case "4":
                var radius = 210;
                var circleClass = "eco";
                var groupClass = "ecoGroup";
                break;

            // Genre 4 => Impact culturel
            case "3":
                var radius = 300;
                var circleClass = "cult";
                var groupClass = "cultGroup";
                break;
            default:

        }

        // Placement aléatoire du premier impact sur l'orbite
        var prevAng = Math.random();

        // Placement à intervalles réguliers sur l'orbite
        var ang = (1-prevAng*2)*Math.PI;
        prevAng += (1/nbrImpacts);

        // Ensembles des points contenus sur un orbite
        var dX = Math.sin(ang)*radius;
        var dY = Math.cos(ang)*radius;

        // Récupère le canvas svg
        var svg = document.getElementsByTagName('svg')[0];

        // Récupère le groupe qui contiendra tous les impacts de ce genre
        var groupe = document.getElementsByClassName(groupClass)[0];

        // Création des 2 cercles
        var innerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var outerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        // Création d'un groupe pour contenir les 2 cercle
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");


        // Style du cercle intérieur
        innerCircle.classList.add('inner-circle');
        innerCircle.setAttribute('cx', dX);
        innerCircle.setAttribute('cy', dY);
        innerCircle.setAttribute('r', '7');
        innerCircle.setAttribute('id', id);
        innerCircle.classList.add(circleClass);

        // Style du cercle extérieur
        outerCircle.setAttribute('cx', dX);
        outerCircle.setAttribute('cy', dY);
        outerCircle.setAttribute('r', '10');
        outerCircle.setAttribute('id', id);
        outerCircle.classList.add('outer-circle');
        outerCircle.style.opacity = 0.4;


        // Append les cercles dans le groupe
        g.classList.add(circleClass);
        g.setAttribute('data-group',circleClass+"Group")
        g.appendChild(innerCircle);
        g.appendChild(outerCircle);

        // Append le groupe dans le groupe général
        groupe.appendChild(g);
        groupe.classList.add(circleClass+"Group");


        // Append dans le canvas svg
        svg.appendChild(groupe);

        callback.call(this, g);

    },

    /**
     * Toggle l'animation de rotation au hover
     * @param {Object}   hoveredGroup L'élément survolé
     * @param {[[Type]]} eventType    Le type d'event
     */
    toggleRotateAnimation: function(hoveredGroup, eventType, orbit) {

        if(eventType == "mouseout" || eventType == "mouseleave") {
            hoveredGroup.classList.remove('stopAnimation');
        } else {
            hoveredGroup.classList.add('stopAnimation');
        }

    },
	
	toggleImpactList: function(item, eventType) {
		if(eventType == "mouseout" || eventType == "mouseleave") {
            item.classList.remove('hoveredPoint');
        } else if(eventType === 'click') {
			item.classList.toggle('hoveredPoint');
		}else {
            item.classList.add('hoveredPoint');
        }
	},

    /**
     * Génère la liste des impacts
     * @param {Object}   impact   L'impact courant
     * @param {[[Type]]} id       L'id qui idientifie l'impact
     * @param {[[Type]]} callback Callback pour bind les events
     */
    seedImpactsList: function(impact, id, callback) {

        var innerDot = document.createElement('span');
        innerDot.classList.add('inner-dot');

        var dot = document.createElement('span');
        dot.classList.add('dot');

        var borderBottom = document.createElement('span');
        borderBottom.classList.add('border-bottom');

        var borderRight = document.createElement('span');
        borderRight.classList.add('border-right');

        var p = document.createElement('p');
        p.innerHTML = "+";

        borderRight.appendChild(p);

        var h2 = document.createElement('h2');
        h2.innerHTML = impact.titre;

        var content = document.createElement('div');
        content.classList.add('content');

        var pContent = document.createElement('p');
        pContent.innerHTML = impact.description;

        content.appendChild(pContent);



        var li = document.createElement('li');
        li.appendChild(innerDot);
        li.appendChild(dot);
        li.appendChild(borderBottom);
        li.appendChild(borderRight);
        li.appendChild(h2);
        li.appendChild(content);

        if(impact.image !== null) {
            var img = document.createElement('img');
            img.setAttribute('src', "http://ns329853.ip-37-187-117.eu/apiInfluence/API/public/photos/"+impact.image);
            console.log(impact.image);
            img.style.width = "100%";
            img.style.height = "auto";
            li.appendChild(img);
        }

        li.setAttribute('id', id);

        li.setAttribute('data-genre', impact.genre);

        var list = document.getElementsByClassName('impacts-list')[0];
        list.appendChild(li);
        callback.call(this, li);

    },

    /**
     * Anime un point d'impact lorsque l'élément de la liste correspondant est survolé
     * @param {[[Type]]} id        L'id qui identifie l'impact
     * @param {[[Type]]} eventType Le type d'event
     */
    toggleHighlightImpact: function(id, eventType) {

        var innerCircle = document.querySelectorAll('[id="'+id+'"]')[0];
        var outerCircle = document.querySelectorAll('[id="'+id+'"]')[1];


        if(eventType == "mouseleave" || eventType == "mouseout") {
            TweenMax.to(innerCircle, 0.6, {attr:{r:7}, ease:Elastic.easeInOut});
            TweenMax.to(outerCircle, 0.7, {attr:{r:10}, ease:Elastic.easeInOut});
        } else {
            TweenMax.to(innerCircle, 0.8, {attr:{r:12}, ease:Elastic.easeInOut});
            TweenMax.to(outerCircle, 0.6, {attr:{r:17}, ease:Elastic.easeInOut});
        }
    },

    /**
     * Ouvre le volet de l'item clické et réduit les autres volets ouverts
     * @param {[[Type]]} clickedItem L'item clické
     */
    toggleAccordeonState: function(clickedItem) {
        var icone = clickedItem.getElementsByClassName('border-right')[0].getElementsByTagName('p')[0];
        var list = UI.impactsList.getElementsByTagName('li');

        // Retire l'état "open" de tous les volets ouverts
        for(var i=0; i< list.length; i++) {
           if(UI.hasClass(list[i], 'open') && list[i] != clickedItem){
                var item = list[i];
                TweenMax.to(item, 0.4, {className:"", ease:Expo.easeInOut});
                list[i].getElementsByClassName('border-right')[0].getElementsByTagName('p')[0].innerHTML = '+';
           }
        }

        // Si l'élément clické a déjà la classe, il est fermé | Sinon on l'ouvre
        if(UI.hasClass(clickedItem, 'open')) {

            icone.innerHTML = '+';
            TweenMax.to(clickedItem, 0.6, {className:"", ease:Expo.easeInOut});

        } else {
            icone.innerHTML = '-';
            TweenMax.to(clickedItem, 0.6, {className:"open", ease:Expo.easeInOut, delay:0.4});

        }
    },


	scrollToImpact: function(item) {
		document.querySelector('.impacts').scrollTop = item.offsetTop;
		/*var elt = document.querySelector('.impacts');
		var top = item.offsetTop;
		TweenMax.to(elt, 0.7, {scrollTo:{y:500}, ease:Power2.easeInOut});*/
	},
    /**
     * Place l'image grand format de l'oeuvre dans le DOM
     * @param {[[Type]]} link     L'url de l'image
     * @param {[[Type]]} callback Le callback pour bin le magnifier
     */
    createImage: function(link, callback) {
        var div = document.getElementsByClassName('zoom')[0];
        var container = div.getElementsByClassName('container')[0];
        var img = document.createElement('img');
        var src = link;

        img.setAttribute('src',src);
        img.classList.add('zoom-image');
        container.style.opacity = "0";
        container.appendChild(img);



        setTimeout(function(){
            var w = img.offsetWidth;
            var h = img.offsetHeight;

            var imgResize = document.getElementsByClassName('zoom')[0].getElementsByTagName('img')[0];


                var ratio = (h/w);
                container.style.height = div.offsetHeight-100+"px";
                container.style.width = container.offsetHeight/ratio+"px";
                imgResize.style.position = "absolute";
                imgResize.style.left = "0";
                imgResize.style.top = "0";
                imgResize.setAttribute('id','thumb');


                imgResize.style.height = "100%";
                imgResize.style.width = "auto";
                container.style.left = (div.offsetWidth/2)-(container.offsetWidth/2)+"px";
                container.style.top = (div.offsetHeight/2)-(container.offsetHeight/2)+"px";
            


            TweenMax.to(container, 1, {opacity:1, ease:Expo.easeInOut});

            callback.call(this);

        }, 1000);

    },

    /**
     * Effet de bounce
     * @param {[[Type]]} el L'élément sélectionné
     */
    bounceEffect: function(el) {
        TweenMax.to(el, 0.4, {scale: 1.1, ease:Back.easeInOut, onComplete: function(){
            TweenMax.to(el, 0.5, {scale: 1, ease:Back.easeInOut});
        }});
    },

    animateViewIn: function() {
        TweenMax.to(UI.oeuvre, 0.8,{scale:1, ease: Back.easeInOut});
        TweenMax.to(UI.canvas, 0.8,{scale:1, ease: Expo.easeInOut, delay: 1});
        TweenMax.to([UI.legende, UI.navigation], 1.3,{opacity:1, ease: Expo.easeInOut, delay: 1.5});
        TweenMax.to(UI.descView, 0.7,{right:0, ease: Expo.easeInOut, delay: 2, onComplete: function(){
            UI.loader.style.right = "calc(30% - 250px)";

        }});

    },


    /////////////////////////////////////////////
    //
    // RENDER VIEWS
    //
    /////////////////////////////////////////////

    /**
     * Change la view de description avec celle des impacts
     * @param {[[Type]]} callback Permet de mettre à jour la propriété de vue active
     */
    renderImpactsView: function(callback) {



        TweenMax.fromTo([UI.loader, UI.univers], 0.8, {x:0}, {x:-250, ease:Expo.easeInOut});


        setTimeout(function(){

            TweenMax.fromTo([UI.descView, UI.impactsView], 0.8, {y:0}, {y:'-100%', ease:Expo.easeInOut});

            setTimeout(function(){

                TweenMax.fromTo([UI.loader, UI.univers], 0.6, {x:-250}, {x:0, ease:Expo.easeInOut});

            },500);

        },2000);

        callback.call(this);
    },

    renderLightboxViewIn: function(callback) {

        TweenMax.to(UI.lightbox, 0.6, {bottom:0, ease:Expo.easeInOut, onComplete:function(){
        }});

        callback.call(this);

    },

    renderLightboxViewOut: function(callback) {
        TweenMax.to(UI.lightbox, 0.6, {bottom:"-100%", ease:Expo.easeInOut});
        callback.call(this);
    },

    renderDescriptionView: function(callback) {

        setTimeout(function(){

            TweenMax.fromTo([UI.descView, UI.impactsView], 0.8, {y:'-100%'}, {y:'0%', ease:Expo.easeInOut});

        },400);

        callback.call(this);

    },

    renderTimelineView: function(callback) {

        var container = document.getElementsByClassName('main-content')[0];


        TweenMax.to(UI.canvas, 0.4,{scale: 0, ease: Expo.easeInOut});
        TweenMax.to(UI.oeuvre, 0.6,{scale: 0, ease: Back.easeInOut, delay: 0.3});
        TweenMax.to([UI.legende,UI.navigation], 0.6,{opacity: 0, ease: Expo.easeInOut, delay: 0.5});
        TweenMax.to([UI.descView,UI.loader,UI.impactsView], 0.4,{right: "-100%", ease: Expo.easeInOut, delay: 1, onComplete: function(){

            callback.call(this);
        }});


    },


    renderZoomView: function(callback) {
        TweenMax.to([UI.zoomView], 1, {x:"-100%", ease:Expo.easeInOut});
        callback.call(this);
    },

    quitZoomView: function(callback) {

        TweenMax.to([UI.zoomView], 1, {x:"0%", ease:Expo.easeInOut});
        callback.call(this);
    },


    //////////////////////////////////////
    //
    // UI HELPERS
    //
    //////////////////////////////////////

    hasClass: function(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

}

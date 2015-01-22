var controller = {


    init: function() {
		var startButton = document.querySelector('.start');
		var logo = document.querySelector('.enlarge-logo');
		var box = document.querySelector('.appearance-after-logo');
		var self = this;
		view.launchInitAnimation(logo, box, function() {
			view.changeTransition(box, logo);
			startButton.addEventListener('click', self.startExperience.bind(self), false);
            $('#loaderSVG').spriteOnHover({fps:32,autostart: true, loop: 'infinite'});
		});

	},

	dotsCanvas: document.querySelector('.dots'),
	/**
	 * Add the listener on the scroll to make the horizontal scroll
	 */
	addScrollListener: function() {
		var self = this;
		window.addEventListener("mousewheel", controller.scrollHorizontally, false);
		window.addEventListener("DOMMouseScroll", controller.scrollHorizontally, false);
	},

    removeScrollListener: function() {
		var self = this;
		window.removeEventListener("mousewheel", controller.scrollHorizontally, false);
		window.removeEventListener("DOMMouseScroll", controller.scrollHorizontally, false);
	},


	/**
	 * Make the horizontal scroll
	 * @param {event} e The event triggered when scrolling up-down
	 */
	scrollHorizontally: function(e) {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		document.body.scrollLeft -= (delta * 40); // Multiplied by 40
		e.preventDefault();
	},
	/**
	 * Fallback for VH : calculate in px the percent of the height of the window
	 * @param   {int} percent the percent of the height we want
	 * @returns {int} the height in px
	 */
	calculateVH: function(percent) {
		return percent*window.innerHeight/100;
	},

	/**
	 * Fallback for VW : calculate in px the percent of the width of the window
	 * @param   {int} percent the percent of the width we want
	 * @returns {int} the width in px
	 */
	calculateVW: function(percent) {
		return percent*window.innerWidth/100;
	},

	/**
	 * get the index of the key (used for the animation on mouse enter and leave)
	 * @param {Object} object the object we want to check for the key
	 * @param {string} key    the key we're looking for
	 */
	getIndexOfKey: function(object, key) {
		var length = Object.size(object);
		var cpt = 0;
		for(var i in object) {
			if(i === key) return cpt;
			cpt++;
		}
	},

	/**
	 * Add the listener to the hover of a planet
	 * @param {element} elt The planet
	 */
	addListenerHover: function(elt) {
		var self = this;
		elt.addEventListener('mouseenter', function() { self.togglePlanetState(this); }, false);
		elt.addEventListener('mouseleave', function() { self.togglePlanetState(this); }, false);
	},

	/**
	 * Launch the animation in the view
	 * @param {element} elt the element that is hovered
	 */
	togglePlanetState: function(elt){
		var datas = this.getDatasForHover(elt);
		view.togglePlanetState(datas.childs, datas.childsLength);
	},

	/**
	 * Get the informations that will be used for the animations on hover
	 * @param {element} elt the planet that is hover
	 * @return {Object} return the id, childs and childsLength (needed for animation on mouse enter)
	 */
	getDatasForHover: function(elt) {
		var id = elt.getAttribute('id-oeuvre');

		id = this.getIndexOfKey(model.masterpieces, id);
		var orbit = this.getOrbitSVGById(id);
		var childs = orbit.children;
		var childsLength = orbit.children.length;
		return {childs: childs, childsLength: childsLength};
	},

	/**
	 * Get the svg of the orbits linked to the planet (id is the id of the planet)
	 * @param   {int} id id of the planet
	 * @returns {element} the svg that contains the orbits
	 */
	getOrbitSVGById: function(id) {
		var orbits = document.querySelectorAll('.orbits');
		return orbits[id];
	},

	/**
	 * Load the template using the model and send it to the view
	 * @param {string} path         path to the handlebars template
	 * @param {string} templateName name used to save in the view
	 */
	loadTemplate: function(path, templateName) {
		var self = this;
		model.ajaxLoadTemplate(path, function(template){
			view.addTemplate(template, templateName);
			self.dealWithLoader();
		});
	},

	/**
	 * Deals with the loading screen: tells the view when to pass
	 */
	dealWithLoader: function(){
		this.loaded++;
		if(this.loaded === this.loaderCount) this.passLoader();
	},

	startExperience: function(e){
		e.preventDefault();
        console.log('start');
		var self = this;
		var box = document.getElementsByClassName('intro-box')[0];
		var logo = document.querySelector('.logo-box');
		view.rollStartExperience(box, self.dotsCanvas, logo, function(){
			self.initTimeline();
		});
	},

	/**
	 * init the controller (launch the init model and retrieve the informations in json)
	 */
	initTimeline: function() {
		var self = this;
		view.toggleLoaderFull(function(){
			model.init(function(){
				view.toggleScaleCanvas(self.dotsCanvas);
				self.addScrollListener();
				self.initTemplates();
			});
		});

	},

    backToTimeline: function() {
        var self= this;
		controller.addScrollListener();
        view.appendTimelineTemplate(function() {
			view.init(function() {
				controller.appendPlanets();
				view.hideTimelineElements();
				view.drawTimeline(document.querySelector('.timeline'), function() {

				});
			});
		});
    },

	/**
	 * Init the templates.
	 */
	initTemplates: function(){

		var templates = [
			{
				path: './assets/templates/circle.handlebars',
				templateName: 'circleTemplate'
			},
			{
				path: './assets/templates/orbits.handlebars',
				templateName: 'orbitsTemplate'
			},
			{
				path: './assets/templates/orbitSVG.handlebars',
				templateName: 'orbitSVGTemplate'
			},
			{
				path: './assets/templates/timeline.handlebars',
				templateName: 'timelineTemplate'
			},
            {
				path: './assets/templates/masterpiece.handlebars',
				templateName: 'masterpieceTemplate'
			}

		];
		this.loaderCount = templates.length;
		this.loaded = 0;
		for(var i = 0; i < this.loaderCount; i++) {
			this.loadTemplate(templates[i].path, templates[i].templateName);
		}
	},

	/**
	 * Pass the loader
	 */
	passLoader: function() {
		var self = this;
		view.appendTimelineTemplate(function() {
			view.init(function() {
				self.appendPlanets();
				view.hideTimelineElements();
				view.toggleLoaderFull(function() {
					view.drawTimeline(document.querySelector('.timeline'), function() {

					});
				});
			});
		});
	},

	/**
	 * Launch the append planet in view
	 */
	appendPlanets: function() {
		var self = this;
		for(var i in model.masterpieces) {
			var masterpiece = model.masterpieces[i];

			var datas = {image: masterpiece.photo, name: masterpiece.titre };
			view.appendPlanet(datas);
		}

		controller.addOrbitsSVG();
	},

	/**
	 * Append the svg that will contain the orbits to the right spot
	 */
	addOrbitsSVG: function() {
		var self = this;
		var planets = document.querySelectorAll('.pieceContainer');
		var p = 0;
		/* First : through the planets */
		for(var i in model.masterpieces) {
			var planet = planets[p];
			var masterpiece = model.masterpieces[i];
			planet.setAttribute('id-oeuvre', i);
			self.addListenerHover(planet);
            planet.addEventListener('click', self.goToSingleView, false);
			var viewportOffset = planet.getBoundingClientRect();
			var top = viewportOffset.top;
			var left = viewportOffset.left;
			var datas = {posX: left - 70, posY: top - 70};
			view.appendOrbitSVG(datas, function() {
				self.addOrbits(masterpiece, p);
			});
			p++;
		}
	},

	/**
	 * Add orbits to the svg
	 * @param {Object}   masterpiece actual masterpiece
	 * @param {int} i    index of the orbit
	 */
	addOrbits: function(masterpiece, i) {
		var self = this;
		var orbits = document.querySelectorAll('.orbits');

		//var lengthImpacts = masterpiece.impacts.length;
		/*Second : through the type of impacts of a planet*/
		for(var j in masterpiece.impacts) {
			var impact = masterpiece.impacts[j];
			var radius = 60+j*10;
			var datas = self.placePoint(impact, masterpiece.impacts.length);

			view.appendOrbitToSVG(datas, orbits[i]);

		}
	},

	/**
	 * Calculates the coords of a point of impact
	 * @param   {Object}   impact     Impact we want to place
	 * @param   {int} nbrImpacts number of impacts
	 * @returns {Object}   give back the informations we need : x,y and the selector of the group.
	 */
	placePoint: function(impact, nbrImpacts) {
		switch(impact.genre) {
			// Genre 1 => Impact technique
			case "1":
				var radius = 60;
				var circleClass = "tech";
				break;
			// Genre 2 => Impact sociologique
			case "2":
				var radius = 70;
				var circleClass = "socio";
				break;
			// Genre 3 => Impact économique
			case "3":
				var radius = 80;
				var circleClass = "eco";
				break;
			// Genre 4 => Impact culturel
			case "4":
				var radius = 90;
				var circleClass = "cult";
				break;
			default:
		}
		var prevAng = Math.random();
		var ang = (1-prevAng*2)*Math.PI;
		prevAng += (1/nbrImpacts);
		var dX = Math.sin(ang)*radius;
		var dY = Math.cos(ang)*radius;
		return {x : dX, y: dY, selector: circleClass};
	},


    //////////////////////////////////////////////////
    //
    //  VIEWS
    //
    //////////////////////////////////////////////////


    goToSingleView: function() {

        var id = this.getAttribute('id-oeuvre');
        var x = ((window.innerWidth)*(70/100))/2;
        var y = window.innerHeight/2;

        var orbits = document.getElementsByClassName('orbitsContainer')[0];
        var line = document.getElementsByClassName('timeline')[0];
        TweenMax.to([line,orbits], 0.8, {opacity:0, ease:Expo.easeInOut});

        var circles = document.getElementsByClassName('timelineNavigation')[0].getElementsByTagName('li');
        controller.tab = new Array();

        for(i=0; i < circles.length; i++) {

            controller.tab.push(circles[i]);
            if(circles[i].getAttribute('id-oeuvre') != id){

                var el = circles[i];
                 TweenMax.to(el, 0.8, {opacity:0, ease:Expo.easeInOut});
            }
        }

        var oldX = this.getBoundingClientRect().left;
        var newX = (x - oldX)-(this.offsetWidth/2);
        var self = this;

        TweenMax.to(self, 1.5, {x:newX, ease:Expo.easeInOut, onComplete: function(){
            TweenMax.to(self, 0.8, {scale:0, ease:Expo.easeInOut, delay:0.3, onComplete: function() {

				controller.appendSingleView(id);

            }});

        }});


    },

	appendSingleView: function(id) {
        var index = controller.getIndexOfKey(model.masterpieces, id);
        var temp = model.masterpieces[id];
        if(index < controller.tab.length-1) {
            var nextNumber = controller.tab[index+1].getAttribute('id-oeuvre');
            var next = model.masterpieces[nextNumber];
            temp.next = next.titre;
        }
        if(index > 0) {
            var previousNumber = controller.tab[index-1].getAttribute('id-oeuvre');
            var previous = model.masterpieces[previousNumber];
            temp.previous = previous.titre;
        }
        temp.nextNumber = nextNumber;
        temp.previousNumber = previousNumber;
        view.appendMasterpieceTemplate(temp, function(){
            controllerMasterpiece.init(id, temp);
            controller.removeScrollListener();
        });
    }

};

controller.init();

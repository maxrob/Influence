var view = {
	loaderFull: document.querySelector('.loader-full'),
	body: document.querySelector('body'),
	mainContent: document.querySelector('.main-content'),

	init: function(callback){
		this.timelineMenu = document.querySelector('.timelineNavigation');
		this.orbitsContainer = document.querySelector('.orbitsContainer');
		callback.call(this);
	},

	/**
	 * Add the template to the view
	 * @param {string} template     the template
	 * @param {string} templateName the name of the template
	 */
	addTemplate: function(template, templateName) {
		this[templateName] = Handlebars.compile(template);
	},

	launchInitAnimation: function(logo, box, callback){
		logo.classList.remove('enlarge-logo');
		box.classList.remove('appearance-after-logo');
		setTimeout(function(){callback.call(this);},3400)
	},

	changeTransition: function(box, logo) {
		logo.classList.add('new-transition');
		box.classList.add('new-transition');
	},

	rollStartExperience: function(box, canvas, logo, callback){
		box.classList.add('scale');
		logo.classList.add('scale');
		canvas.classList.add('scaleCanvas');
		setTimeout(function(){callback.call(this);},400);
	},

	toggleLoaderFull: function(callback) {
		this.loaderFull.classList.toggle('vanish');
		setTimeout(function(){
			callback.call(this);
		},700);
	},

	
	toggleScaleCanvas: function(canvas) {
		canvas.classList.toggle('scaleCanvas');
	},
	
	appendTimelineTemplate: function(callback) {
		var html = this.timelineTemplate();
		this.mainContent.innerHTML = html;
		callback.call(this);
	},

    appendMasterpieceTemplate: function(datas, callback) {
		var html = this.masterpieceTemplate(datas);
		this.mainContent.innerHTML = html;
        callback.call(this);
	},


	hideTimelineElements: function(){
		var tl = new TimelineMax();
		var planets = document.querySelectorAll('.pieceContainer');
		var orbits = document.querySelectorAll('.orbits');
		var length = planets.length;
		for(var i = 0; i < length; i++) {
			tl.set(planets[i], {scale: 0});
			tl.set(orbits[i], {scale: 0});
		}
	},

	drawTimeline: function(timeline, callback) {
		var tl = new TimelineMax();
		var planets = document.querySelectorAll('.pieceContainer');
		var orbits = document.querySelectorAll('.orbits');
		var length = planets.length;
		tl.to(timeline, 1, {right: 0, ease:Expo.easeInOut});

		for(i = 0; i < length; i++) {
			tl.to(planets[i], 0.3, {scale: 1});
			tl.to(orbits[i], 0.3, {scale: 1});
		}
	},
	/**
	 * Append the planets (li) to the timelineMenu
	 * @param {object} datas Datas used in the handlebars template
	 */
	appendPlanet: function(datas) {
		var html = this.circleTemplate(datas);
		this.timelineMenu.innerHTML += html;

	},

	/**
	 * Append a svg used fot the orbit on the righ position
	 * @param {object} datas Datas used in the handlebars template
	 * @param {function} callback callback function
	 */
	appendOrbitSVG: function(datas, callback) {
		var html = this.orbitSVGTemplate(datas);
		this.orbitsContainer.innerHTML += html;
		callback.call(this);
	},

	/**
	 * Append an orbit to the right svg
	 * @param {object} datas Datas used in the handlebars template
	 * @param {element}   svg   The svg we must append in
	 */
	appendOrbitToSVG: function(datas, svg) {
		var html = this.orbitsTemplate(datas);

		svg.querySelector('.'+datas.selector).innerHTML += html;

	},

	/**
	 * Make the animation when mouve enter or leave the "planet"
	 * @param {array} childs       the childs of node = the orbits
	 * @param {int} childsLength number of orbits
	 */
	togglePlanetState: function(childs, childsLength) {
		var child;
		for(var i = 0; i < childsLength; i++) {
			child = childs[i];
			child.classList.toggle('hoverCircle');
		}
	},

};

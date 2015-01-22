var model = {
	/**
	 * Init the model
	 * @param {function} callback callback function
	 */
	init: function(callback) {
		var self = this;
		self.ajaxLoadTemplate('http://ns329853.ip-37-187-117.eu/apiInfluence/API/public/data', function(datas) {
			self.masterpieces = JSON.parse(datas);
			callback.call(this);
		})
	},

	/**
	 * Allows to load a template or file
	 * @param {string} template path of the file
	 * @param {function} callback callback function
	 */
	ajaxLoadTemplate: function(template, callback) {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 ) {
			   if(xmlhttp.status == 200){
				   callback.call(this, xmlhttp.responseText);
			   }
			   else if(xmlhttp.status == 400) {
				   console.log('There was an error 400');
			   }
			   else {
				   console.log('something else other than 200 was returned');
			   }
			}
		};

		xmlhttp.open("GET", template, true);
		xmlhttp.send();
	}
};

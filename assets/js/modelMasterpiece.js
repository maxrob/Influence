"use strict"

var model = {

    /**
     * Récupère les impacts de l'oeuvre spécifié dans le data-attribute [id-oeuvre="1"]
     * @param {[[Type]]} idOeuvre L'id de l'oeuvre à récupérer
     * @param {[[Type]]} callback Callback qui va générer le SVG
     */
    getImpacts: function(idOeuvre, callback) {


        // TODO - Récupérer les données via l'API
        this.masterpieces = data;
        var impacts = model.masterpieces[idOeuvre].impacts;
        callback.call(this, impacts);

    }


}

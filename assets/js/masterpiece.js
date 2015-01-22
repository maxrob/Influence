////////////////////////////////////////////////////////////
//                                                        //
// Code procédural                                        //
//                                                        //
////////////////////////////////////////////////////////////

// Récupère les impacts de l'oeuvre spécifié dans le data-attribute [id-oeuvre="1"]
var impacts = data["1"].impacts;


// Pour chaque impact de cette oeuvre
for(i=0; i < impacts.length; i++){

        // On teste le genre de l'impact pour définir sur quel orbite placer le point
        switch(impacts[i].genre) {

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
            case "3":
                var radius = 210;
                var circleClass = "eco";
                var groupClass = "ecoGroup";
                break;

            // Genre 4 => Impact culturel
            case "4":
                var radius = 300;
                var circleClass = "cult";
                var groupClass = "cultGroup";
                break;
            default:

        }

        var nbrImpacts = impacts[i].length;

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
        innerCircle.setAttribute('r', '4');
        innerCircle.classList.add(circleClass);

        // Style du cercle extérieur
        outerCircle.setAttribute('cx', dX);
        outerCircle.setAttribute('cy', dY);
        outerCircle.setAttribute('r', '7');
        outerCircle.classList.add('outer-circle');
        outerCircle.style.opacity = 0.4;


        // Append les cercles dans le groupe
        g.classList.add(circleClass);
        g.appendChild(innerCircle);
        g.appendChild(outerCircle);

        // Append le groupe dans le groupe général
        groupe.appendChild(g);
        groupe.classList.add(circleClass+"Group");

        // Append dans le canvas svg
        svg.appendChild(groupe);
    }



var goImpacts = document.getElementsByClassName('more')[0];
var goDesc = document.getElementsByClassName('back-desc')[0];
var impactsList = document.getElementsByClassName('impacts-list')[0].getElementsByTagName('li');
goImpacts.addEventListener('click', loadImpacts, false);
goDesc.addEventListener('click', loadDesc, false);


for(i=0; i<impactsList.length;i++) {

    console.log(impactsList[i]);
    impactsList[i].addEventListener('click', clickImpact, false);
}

function clickImpact() {

    var icone = this.getElementsByClassName('border-right')[0].getElementsByTagName('p')[0];
    var list = document.getElementsByClassName('impacts-list')[0].getElementsByTagName('li');

        for(i=0; i<list.length; i++) {
           if(hasClass(list[i], 'open') && list[i] != this){
                var item = list[i];
                TweenMax.to(item, 0.4, {className:"", ease:Expo.easeInOut});
                list[i].getElementsByClassName('border-right')[0].getElementsByTagName('p')[0].innerHTML = '+';
           }
        }

    if(hasClass(this, 'open')) {

        icone.innerHTML = '+';
        TweenMax.to(this, 0.6, {className:"", ease:Expo.easeInOut});


    } else {
        icone.innerHTML = '-';
        TweenMax.to(this, 0.6, {className:"open", ease:Expo.easeInOut, delay:0.4});

    }

}

//
//function loadImpacts() {
//    console.log('loader');
//    var loader = document.getElementsByClassName('loader')[0];
//    var system = document.getElementsByClassName('univers')[0];
//    TweenMax.fromTo([loader, system], 0.8, {x:0}, {x:-250, ease:Expo.easeInOut});
//
//
//    setTimeout(function(){
//        var list = document.getElementsByClassName( 'impacts-list' )[0];
//        var impacts = document.getElementsByClassName('impacts')[0];
//        var data = document.getElementsByClassName('data')[0];
//        var back = document.getElementsByClassName('back')[0];
//
//        TweenMax.fromTo([data, impacts], 0.8, {y:0}, {y:'-100%', ease:Expo.easeInOut});
//
//        setTimeout(function(){
//            TweenMax.fromTo([loader, system], 0.7, {x:-250}, {x:0, ease:Expo.easeInOut});
//        },500);
//
//    },1500);
//}
//
//function loadDesc() {
//    console.log('loader');
//    var loader = document.getElementsByClassName('loader')[0];
//    var system = document.getElementsByClassName('univers')[0];
//    var back = document.getElementsByClassName('back')[0];
//
//    setTimeout(function(){
//        var list = document.getElementsByClassName( 'impacts-list' )[0];
//        console.log(list);
//
//        var impacts = document.getElementsByClassName('impacts')[0];
//        var data = document.getElementsByClassName('data')[0];
//        console.log('timeout', impacts);
//
//        TweenMax.fromTo([data, impacts], 0.8, {y:'-100%'}, {y:'0%', ease:Expo.easeInOut});
//
//    },400);
//}
//
//
//function hasClass(element, cls) {
//    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
//}
//











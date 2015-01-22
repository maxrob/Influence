<?php

class Upload extends Eloquent {
    
    public static function photo($file, $nameDB, $edit = false, $object = null) {

        // s'il y a bien une photo qui a été envoyé
        if($file!=NULL){

            /* permet d'obtenir l'extention de base de l'image alors que getExtension
             * return tmp car l'image est enregistré temporairement avant l'upload final
             */
            // On ouvre l'image
            $data = file_get_contents($file); 
             
            $extensionPhoto  = "jpg";
            
            // chemin ou sera stocké l'image : ex. [...]uploads/photos/products
            $directoryPhoto = public_path().'/photos/';

            /* uniqid genere un id unique aléatoirement et $extension rajoute le
             * '.png/.jpg' a la fin du nom
             */

            $fileNamePhoto = uniqid().".{$extensionPhoto}";
            
            // On nomme notre nouveau fichier
            $new = $directoryPhoto.$fileNamePhoto;

            // On enregistre le contenu de l'url dans le nouveau fichier
            file_put_contents($new, $data); 

            // test si l'image existe bien dans le dossier
            if(file_exists($directoryPhoto.$fileNamePhoto)){

                // si la fonction est utilisé dans le cadre de modifcation (edit)
                if($edit){
                    // Test si $object->photo != NULL, si oui nous supprimons l'image enregistré sur le serveur
                    if($object->$nameDB){

                        // Créer le chemin directe vers l'image
                        $fileDelete = $directoryPhoto.$object->$nameDB; 
                        // qui est ensuite supprimé pour laisser place à la nouvelle image
                        File::delete($fileDelete);
                    }
                }
               
                // renvoie seulement le nom de la photo et le status 200 = tout est oki
                return Response::json($fileNamePhoto, 200);
            } 
            else {

                // renvoie seulement le status 400 = La ressource est indisponible et aucune redirection n’est connue
                return Response::json(null, 410);
            }

            // renvoie seulement le status 400 = La ressource est indisponible et aucune redirection n’est connue
            return Response::json(null, 410);
        }
    }
}
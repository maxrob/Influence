<?php

class OeuvreController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/


	public function recupOeuvre()
	{
		$oeuvres = Oeuvre::all();

		foreach ($oeuvres as $key) {
			$oeuvre[$key->id] = array (
					'date' => $key->date,
					'titre' => $key->titre,
					'photo' => $key->photo,
					'description' => $key->description,
					'genre' => $key->genre,
					'style' => $key->style,
					'auteur' => $key->auteur,
					'pays' => $key->pays,
					'extimate' => $key->extimate
			);
			
			$impacts = Impact::where('oeuvre_id', '=', $key['id'])->get();

			foreach ($impacts as $impact) {
				$oeuvre[$key->id]['impacts'][]=array(
					'genre' => $impact->genre,
					'titre' => $impact->titre,
					'description' => $impact->description,
					'image' => $impact->image
				);
			}

		}

		return Response::json($oeuvre, 200, ['Access-Control-Allow-Origin' => '*']);
	}

}
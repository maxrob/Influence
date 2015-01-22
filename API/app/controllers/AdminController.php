<?php

class AdminController extends BaseController {

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

	public function affichage()
	{
		$oeuvres = Oeuvre::all();

		foreach ($oeuvres as $key) {
			$oeuvre[$key->id] = array (
				'id' => $key->id,
				'date' => $key->date,
				'titre' => $key->titre,
				'photo' => $key->photo,
				'description' => $key->description,
				'genre' => $key->genre,
				'style' => $key->style,
				'auteur' => $key->auteur,
				'pays' => $key->pays,
				'impacts' => NULL
			);

			$impacts[$key->id] = Impact::where('oeuvre_id', '=', $key['id'])->get();

			foreach ($impacts[$key->id] as $impact) {
				$oeuvre[$key->id]['impacts'][]=array(
					'id' => $impact->id,
					'genre' => $impact->genre,
					'titre' => $impact->titre,
					'description' => $impact->description,
					'image' => $impact->image
				);
			}
		}
		return View::make('admin.index')
                        ->with('oeuvres', $oeuvre);
	}

	public function listOeuvres()
	{
		$oeuvres = Oeuvre::all();

		foreach ($oeuvres as $key) {
			$list[$key->id] = array(
				'id' => $key->id,
				'titre' => $key->titre
			);
		}

		return View::make('admin.addImpact')
						->with('lists', $list);
	}

	public function addOeuvre()
	{
		$data = Input::all();

		$photo = Upload::photo( $data['image'], 'photo', false );
		
		$image = json_decode($photo->getContent());

		$oeuvre = Oeuvre::create(
            [
                'titre' => $data[ 'title' ],
                'date' => $data[ 'dates' ],
                'auteur' => $data[ 'author' ],
                'style' => $data[ 'style' ],
                'pays' => $data[ 'origin' ],
                'genre' => $data[ 'genre' ],
                'description' => $data[ 'description' ],
                'photo' => $image,
                'extimate' => $data['extimate']
            ]
        );

        return Redirect::action('AdminController@affichage');


	}

	public function addImpact()
	{
		$data = Input::all();

		$photo = Upload::photo( $data['image'], 'photo', false );

		if ($photo!=NULL) {
			$image = json_decode($photo->getContent());
		} else {
			$image = NULL;
		}

		$oeuvre = Impact::create(
            [
                'titre' => $data[ 'title' ],
                'oeuvre_id' => $data[ 'oeuvre' ],
                'genre' => $data[ 'genre' ],
                'description' => $data[ 'description' ],
                'image' => $image
            ]
        );

        return Redirect::action('AdminController@affichage');


	}	

	public function dataOeuvre()
	{
		$id = Input::get('id');
		$data = Oeuvre::where('id', '=', $id)->get();

		return View::make('admin.editOeuvre')
						->with('oeuvres', $data);
	}

	public function editOeuvre()
	{
		$data = Input::all();
	
		$oeuvre = Oeuvre::find($data['id']);
		$oeuvre->titre = $data['title'];
		$oeuvre->date = $data['dates'];
		$oeuvre->auteur = $data['author'];
		$oeuvre->style = $data['style'];
		$oeuvre->pays = $data['origin'];
		$oeuvre->genre = $data['genre'];
		$oeuvre->description = $data['description'];
		$oeuvre->extimate = $data['extimate'];
		$oeuvre->save();

        return Redirect::action('AdminController@affichage');
	}

	public function dataImpact()
	{
		$id = Input::get('id');

		$data = Impact::find($id);
		$data->oeuvreT = DB::table('oeuvres')
								->where('id', '=', $data->oeuvre_id)
								->select('titre')
								->get();
		foreach ($data->oeuvreT as $key ) {
			$data->oeuvreT = $key->titre;
		}

		$oeuvres = Oeuvre::all();

		foreach ($oeuvres as $key) {
			$list[$key->id] = array(
				'id' => $key->id,
				'titre' => $key->titre
			);
		}

		return View::make('admin.editImpact')
				->with('impacts', $data)
				->with('lists', $list);

	}

	public function editImpact()
	{
		$data = Input::all();
	
		$impact = Impact::find($data['id']);
		$impact->titre = $data['title'];
		$impact->genre = $data['genre'];
		$impact->description = $data['description'];
		$impact->oeuvre_id = $data['oeuvre'];
		$impact->save();

        return Redirect::action('AdminController@affichage');
	}

	public function supprOeuvre()
	{
		$id = Input::get('id');
		$impacts = Impact::where('oeuvre_id', '=', $id)->delete();
		$oeuvre = Oeuvre::where('id', '=', $id)->delete();

        return Redirect::action('AdminController@affichage');
	}

	public function supprImpact()
	{
		$id = Input::get('id');
		$impact = Impact::where('id', '=', $id)->delete();

        return Redirect::action('AdminController@affichage');
	}

}
<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});

Route::get('data', 'OeuvreController@recupOeuvre');
Route::get('admin','AdminController@affichage');


Route::get('newoeuvre', function() {
	return View::make('admin.addOeuvre'); 
});
Route::get('newimpact','AdminController@listOeuvres');

Route::post('addoeuvre','AdminController@addOeuvre');
Route::post('addimpact','AdminController@addImpact');

Route::get('oeuvre', 'AdminController@dataOeuvre');
Route::put('editoeuvre', 'AdminController@editOeuvre');

Route::get('impact', 'AdminController@dataImpact');
Route::put('editimpact', 'AdminController@editImpact');

Route::get('supproeuvre', 'AdminController@supprOeuvre');
Route::get('supprimpact', 'AdminController@supprImpact');

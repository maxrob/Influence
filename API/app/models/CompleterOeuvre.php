<?php

class CompleterOeuvre extends Eloquent {

    protected $table = 'completer_oeuvres';

    protected $softDelete = true;

    protected $guarded = array();

    public static $rules = array();

    public function oeuvre () {
    	return $this->belongsTo('Oeuvre');
    }
}
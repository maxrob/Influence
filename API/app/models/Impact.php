<?php

class Impact extends Eloquent {

    protected $table = 'impacts';

    protected $softDelete = true;

    protected $guarded = array();

    public static $rules = array();

    public function oeuvre () {
    	return $this->belongsTo('Oeuvre');
    }
}
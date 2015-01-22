<?php

class Source extends Eloquent {

    protected $table = 'sources';

    protected $softDelete = true;

    protected $guarded = array();

    public static $rules = array();

    public function completerOeuvre () {
    	return $this->belongsTo('CompleterOeuvre');
    }

    public function completerImpact () {
    	return $this->belongsTo('CompleterImpact');
    }
}
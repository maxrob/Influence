<?php

class CompleterImpact extends Eloquent {

    protected $table = 'completer_impacts';

    protected $softDelete = true;

    protected $guarded = array();

    public static $rules = array();

    public function impact () {
    	return $this->belongsTo('Impact');
    }
}
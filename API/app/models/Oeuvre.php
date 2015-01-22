<?php

class Oeuvre extends Eloquent {

    protected $table = 'oeuvres';

    protected $softDelete = true;

    protected $guarded = array();

    public static $rules = array();
}
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOeuvres extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        // sila table n'existe pas
        if(!Schema::hasTable('oeuvres')){
    
            Schema::create('oeuvres', function(Blueprint $table) {
                $table->increments('id');
                $table->string('titre', 50);
                $table->string('photo', 100);
                $table->text('description');
                $table->string('date', 40);
                $table->string('genre', 20);
                $table->string('style', 50)->nullable();
                $table->string('auteur', 50);
                $table->string('pays', 30);   
                $table->timestamps();             
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('oeuvres');
    }

}

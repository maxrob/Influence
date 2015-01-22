<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImpactsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
    public function up()
    {

        // sila table n'existe pas
        if(!Schema::hasTable('impacts')){
    
            Schema::create('impacts', function(Blueprint $table) {
                $table->increments('id');
                $table->string('titre', 100);
                $table->string('genre', 2);
                $table->text('description');
                $table->string('image', 100)->nullable();
                $table->integer('oeuvre_id');
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
        Schema::dropIfExists('impacts');
    }

}

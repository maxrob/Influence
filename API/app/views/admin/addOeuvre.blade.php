<!DOCTYPE html>
<html lang="en">

@include('includes.header')

<div class="container padding-top">
    {{ Form::open(array('files' => true, 'method' => 'post', 'action' => array('AdminController@addOeuvre'), 'class' => 'form-horizontal')) }} 
		<fieldset>

			<!-- Form Name -->
			<legend>Ajouter une oeuvre</legend>
			<!-- Text input-->
			<div class="form-group">
                {{ Form::label('title', 'Titre', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::input('title' ,'title','', array('placeholder' => 'Titre de l\'oeuvre','class' => 'form-control input-md', 'required' => '')) }}
				</div>
			</div>

			<!-- Text input-->
			<div class="form-group">
                {{ Form::label('dates', 'Date', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::input('dates' ,'dates','', array('placeholder' => 'Date de création','class' => 'form-control input-md', 'required' => '')) }}
				</div>
			</div>

			<div class="form-group">
                {{ Form::label('extimate', 'Date extimée', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::input('extimate' ,'extimate','', array('placeholder' => 'Date estimée','class' => 'form-control input-md', 'required' => '')) }}
				</div>
			</div>


			<!-- Text input-->
			<div class="form-group">
                {{ Form::label('author', 'Auteur', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::input('author' ,'author','', array('placeholder' => 'Auteur de l\'oeuvre','class' => 'form-control input-md', 'required' => '')) }}
				</div>
			</div>

			<!-- Text input-->
			<div class="form-group">
                {{ Form::label('style', 'Style', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::input('style' ,'style','', array('placeholder' => 'Style de l\'oeuvre','class' => 'form-control input-md')) }}
					<span class="help-block">Courant artistique</span> 
				</div>
			</div>

			<!-- Text input-->
			<div class="form-group">
                {{ Form::label('origin', 'Pays d\'origine', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::input('origin' ,'origin','', array('placeholder' => 'Pays d\'origine','class' => 'form-control input-md', 'required' => '')) }}
				</div>
			</div>

			<!-- Select Basic -->
			<div class="form-group">
                {{ Form::label('genre', 'Genre', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::select('genre', ['LITTERATURE' => 'Littérature', 'ARCHITECTURE' => 'Architecture', 'PEINTURE' => 'Peinture', 'SCULPTURE' => 'Sculpture', 'CINEMA' => 'Cinéma', 'MUSIQUE' => 'Musique', 'THEATRE' => 'Théâtre'], '', array('id' => 'genre', 'class' => 'form-control', 'required' => ''))}}

				</div>
			</div>

			<!-- File Button -->
			<div class="form-group">
                {{ Form::label('image', 'Image', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::file('image', array('class' => 'input-file', 'id' => 'image', 'required' => ''))}}
				</div>
			</div>

			<!-- Textarea -->
			<div class="form-group">
                {{ Form::label('description', 'Description', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{Form::textarea('description', 'Une desciption succinte de l\'oeuvre', array('class' => 'form-control', 'id' => 'description', 'required' => ''))}}
				</div>
			</div>

			<!-- Button -->
			<div class="form-group">
                {{ Form::label('', '', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
        		    {{ Form::submit('Submit', array('id' => 'submit', 'name'=>'submit', 'class' => 'btn btn-info btn-block')) }}
				</div>
			</div>
		</fieldset>
	{{ Form::close() }}
</div>
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
</body>
</html>
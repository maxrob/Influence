<!DOCTYPE html>
<html lang="en">

@include('includes.header')

@foreach($lists as $list)
	{{$oeuvres[$list["id"]] = $list["titre"]}}
@endforeach
<div class="container padding-top">
    {{ Form::open(array('files' => true, 'method' => 'post', 'action' => array('AdminController@addImpact'), 'class' => 'form-horizontal')) }} 
		<fieldset>

			<!-- Form Name -->
			<legend>Ajouter un impact</legend>
			<!-- Select Basic -->
			<div class="form-group">
                {{ Form::label('oeuvre', 'Oeuvre lié', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::select('oeuvre', $oeuvres, '', array('id' => 'oeuvre', 'class' => 'form-control', 'required' => ''))}}
				</div>
			</div>

			<!-- Text input-->
			<div class="form-group">
                {{ Form::label('titre', 'Titre', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::input('title' ,'title','', array('placeholder' => 'Titre','class' => 'form-control input-md', 'required' => '')) }}
				</div>
			</div>
			
			<!-- Select Basic -->
			<div class="form-group">
                {{ Form::label('genre', 'Genre', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::select('genre', ['1' => 'Technique', '2' => 'Social', '3' => 'Culturel', '4' => 'Economique/Marketing'], '', array('id' => 'genre', 'class' => 'form-control', 'required' => ''))}}

				</div>
			</div>
			
			<!-- File Button -->
			<div class="form-group">
                {{ Form::label('image', 'Image', array('class' => 'col-md-4 control-label')) }}
				<div class="col-md-4">
					{{ Form::file('image', array('class' => 'input-file', 'id' => 'image'))}}
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
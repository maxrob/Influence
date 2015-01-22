<!DOCTYPE html>
<html lang="en">
	@include('includes.header')
	@foreach($oeuvres as $oeuvre)
		<div class="full-width oeuvre">
			<div class="image-col">
				<div class="image-container">
					{{ HTML::image('photos/'.$oeuvre['photo']) }}
				</div>
			</div>

			<div class="text-col">
				<h2>{{$oeuvre['titre']}}</h2>
			</div>
			<div class="actions-col">
			<button class='btn btn-primary oeuvreBtn'>{{ HTML::decode(HTML::linkAction('AdminController@dataOeuvre', 'Edit', array('id' => $oeuvre['id']), array('class' => 'white')))}}</button>
			<button class='btn btn-danger oeuvreBtn'>{{ HTML::decode(HTML::linkAction('AdminController@supprOeuvre', 'Supprimer', array('id' => $oeuvre['id']), array('class' => 'white')))}}</button>
			</div>
		</div>
		@if($oeuvre['impacts']!=NULL)
			@foreach($oeuvre['impacts'] as $impact)
				<div class="full-width impact">
					<div class="text-col"><h2>{{$impact['titre']}}</h2></div>
					<div class="actions-col">
						<button class='btn btn-primary impactBtn'>{{ HTML::decode(HTML::linkAction('AdminController@dataImpact', 'Edit', array('id' => $impact['id']), array('class' => 'white')))}}</button>
						<button class='btn btn-danger impactBtn'>{{ HTML::decode(HTML::linkAction('AdminController@supprImpact', 'Supprimer', array('id' => $impact['id']), array('class' => 'white')))}}</button>
					</div>
				</div>
			@endforeach
		@endif
	@endforeach	
	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
</body>

</html>
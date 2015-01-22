<head>
	<meta charset="UTF-8">
	<title>Admin API</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/main.css">
</head>

<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<div id="navbar" class="collapse navbar-collapse">

				<ul class="nav navbar-nav">
					<li>{{link_to('admin', 'Home')}}
					</li>
					<li>{{link_to('newoeuvre', 'Add Oeuvre')}}
					</li>
					<li>{{HTML::linkAction('AdminController@listOeuvres', 'Add Impact')}}
					</li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</nav>
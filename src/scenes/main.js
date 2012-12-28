Crafty.scene("main", function() {
	var elements = [
       		"src/entities/player.js",
		"src/entities/claimed.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		sc['player'] = new Player();
		sc['claimed'] = new Claimed();
	});
});

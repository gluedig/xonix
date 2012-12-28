Claimed = BaseEntity.extend({
    defaults: {
       	'speed' : 2,
    },
    initialize: function(){
    	var model = this;
    	var top_entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, ClaimedArea");
	
    	top_entity
	    .setName('topClaimed')
            .attr({x: 0, y: 0, z: 200, w: Crafty.viewport.width, h:20})
	    .color("green");

    	model.set({'top_entity' : top_entity });

     	var bottom_entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, ClaimedArea");
	
    	bottom_entity
	    .setName('bottomClaimed')
            .attr({x: 0, y: Crafty.viewport.height - 20, z: 200, w: Crafty.viewport.width, h:20})
	    .color("green");

    	model.set({'bottom_entity' : bottom_entity });

      	var left_entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, ClaimedArea");
	
    	left_entity
	    .setName('leftClaimed')
            .attr({x: 0, y: 0, z: 200, w: 20, h: Crafty.viewport.height})
	    .color("green");

    	model.set({'left_entity' : left_entity });

     	var right_entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, ClaimedArea");
	
    	right_entity
	    .setName('rightClaimed')
            .attr({x: Crafty.viewport.width - 20, y: 0, z: 200, w: 20, h: Crafty.viewport.height})
	    .color("green");

    	model.set({'right_entity' : right_entity });

	Crafty.bind("ClaimNewArea", function(area) {
		console.log("ClaimNewArea");
		console.log("left: " + area['left'].x + ":" + area['left'].y);
		console.log("entered: " + area['entered'].x + ":" + area['entered'].y);
		for (var i = 0; i<area['lines'].length; i++) {
			var line = area['lines'][i];
			console.log("line "+line['start'].x+":"+line['start'].y+" -> "+line['end'].x+":"+line['end'].y);
		}
	});
    }
});

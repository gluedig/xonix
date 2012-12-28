Player = BaseEntity.extend({
    defaults: {
       	'speed' : 2,
    },
    initialize: function(){
    	var model = this;
	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Keyboard, Collision, Color");
	
	entity.moving = false;
	entity.move_dir = '';
    	entity.attr({x: ((Crafty.viewport.width/2) - (entity.w/2)), y: 0, z: 300, w: 10, h:10});
    	entity.bind('EnterFrame', function(e){
		if (this.moving)
			this.move();
		
		if (!this.inClaimed && this.claimLine['entity'])
			this.claimLine['entity'].grow(this.move_dir, model.get('speed'));
		
		if (this.x > Crafty.viewport.width - this.w) {
			this.x = Crafty.viewport.width - this.w;
			this.moving = false;
		}
		if (this.x < 0) {
			this.x = 0;
			this.moving = false;
		}
		if (this.y > Crafty.viewport.height - this.h) {
			this.y = Crafty.viewport.height - this.h;
			this.moving = false;
		}
		if (this.y < 0) {
			this.y = 0;
			this.moving = false;
		}
        });
	entity.bind('KeyDown', function(e){
		var old_dir = '';
		if (this.moving)
			old_dir = this.move_dir;
		
		if (this.isDown("LEFT_ARROW")) {
			if (!this.inClaimed && this.moving && this.move_dir == 'right')
				return;	
		        					
			this.moving = true;
			this.move_dir = 'left';
			if (this.moving && this.move_dir != old_dir) 
				this.changeDirection(this.move_dir, old_dir);
		}
		if (this.isDown('RIGHT_ARROW')) {
			if (!this.inClaimed && this.moving && this.move_dir == 'left')
				return;
	
			this.moving = true;
			this.move_dir = 'right';
			if (this.moving && this.move_dir != old_dir) 
				this.changeDirection(this.move_dir, old_dir);
		}
	    	if (this.isDown('UP_ARROW')) {
			if (!this.inClaimed && this.moving && this.move_dir == 'down')
				return;
	
			this.moving = true;
			this.move_dir = 'up';
			if (this.moving && this.move_dir != old_dir) 
				this.changeDirection(this.move_dir, old_dir);
		}
		if (this.isDown('DOWN_ARROW')) {
			if (!this.inClaimed && this.moving && this.move_dir == 'up')
				return;
	
			this.moving = true;
			this.move_dir = 'down';
			if (this.moving && this.move_dir != old_dir) 
				this.changeDirection(this.move_dir, old_dir);
		}
		

	});
	entity.setName('Player').color("red");

	entity.origin(entity.w/2, entity.h/2);

	entity.move = function() {
		switch(this.move_dir) {
			case 'left':
				this.x = this.x - model.get('speed'); 
				break;
			case 'right':
				this.x = this.x + model.get('speed');
				break;
			case 'up':
				this.y = this.y - model.get('speed');
				break;
			case 'down':
				this.y = this.y + model.get('speed');
				break;
			default:
				this.moving = false;
				this.move_dir = '';
				break;
		}
	};

	entity.changeDirection = function(new_dir, old_dir) {
		console.log('changeDirection '+new_dir + ' '+old_dir);
		if(this.inClaimed)
			return;
		this.claimLine['end'] = { x: this.x, y: this.y};
		this.claimLines['lines'].push(this.claimLine);
		this.claimLine = new Object;
		this.claimLine['start'] = { x: this.x, y: this.y};
		var claimEntity = Crafty.e("ClaimLine");
		claimEntity.start(this.x, this.y);
		this.claimLine['entity'] = claimEntity;
	};

	entity.inClaimed = true;
	entity.claimLines = new Object;
	entity.claimLines['lines'] = new Array;
	entity.claimLine = new Object;

	entity.leftClaimed = function() {
		if (!this.inClaimed)
			return;
		this.inClaimed = false;
		this.claimLines['left'] = { x: this.x, y: this.y};
		this.claimLine['start'] = this.claimLines['left'];
		
		var claimEntity = Crafty.e("ClaimLine");
		claimEntity.start(this.x, this.y);
		this.claimLine['entity'] = claimEntity;
	};

	entity.enteredClaimed = function() {
		if (this.inClaimed)
			return;
		this.inClaimed = true;
		this.claimLines['entered'] = { x: this.x, y: this.y};
		this.claimLine['end'] = this.claimLines['entered'];
		this.claimLines['lines'].push(this.claimLine);
		this.claimNewArea();
	};

	entity.claimNewArea = function() {
		console.log('claiming: '+this.claimLines);
		Crafty.trigger("ClaimNewArea", this.claimLines);
		entity.claimLines = new Object;
		entity.claimLines['lines'] = new Array;
		entity.claimLine = new Object;
	}; 	

	entity.onHit('ClaimedArea', 
		function() { 
			if (!entity.inClaimed) {
				entity.enteredClaimed();
			}
		}, 
		function() {
			if (entity.inClaimed) {
				entity.leftClaimed();
			}
		}
	);
	model.set({'entity' : entity });
	}
});

Crafty.c('ClaimLine', {
    init: function() {
        var entity = this;

        this.requires("2D, "+gameContainer.conf.get('renderType')+", Collision, Color")
        
        return this;
    },
    grow: function(dir, speed) {
	switch(dir) {
		case 'left':
			this.x -= speed;
			this.w += speed; 
			break;
		case 'right':
			this.w += speed;
			break;
		case 'up':
			this.y -= speed;
			this.h += speed;
			break;
		case 'down':
			this.h += speed;
			break;
		default:
			break;
	}
	return;
    },
    start: function(x, y) {
	this.attr({x: x, y: y, z: 100, w: 10, h:10}).color('blue');
    }
});

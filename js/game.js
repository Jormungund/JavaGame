
window.addEventListener('load', function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	var movePlayer = function() {
		player.isMoving = true;
	};
	
	var stopPlayer = function() {
		player.isMoving = false;
	};
	
	canvas.addEventListener("mousedown", movePlayer);
	canvas.addEventListener("mouseup", stopPlayer);
	
	var CANVAS_WIDTH = 900;
	var CANVAS_HEIGHT = 500;
	var GAME_WIDTH = 900;
	var GAME_HEIGHT = 460;
	var gameLive = true;
	
	var player = {
		x:10,
		y:230,
		speedX: 2,
		w: 40,
		h:40,
		isMoving: false
	};
	
	var goal = {
		
		x: 840,
		y: 230,
		w: 40,
		h: 40
		
		
	};
	
	var enemies = [ // enemies[0].y    enemies[3].x
	
	{x:105, y:0, speedY: 1, w: 40, h:40, myColor: "#00FF00"},
	
	{x:150, y:0, speedY: 7, w: 40, h:40, myColor: "#FF0000"},
	
	{x:230, y:0, speedY: 3, w: 40, h:40, myColor: "#FFFF00"},
	
	{x:300, y:0, speedY: 2, w: 40, h:40, myColor: "#AAFF00"},
	
	{x:360, y:0, speedY: 1, w: 40, h:40, myColor: "#00FF00"},
	
	{x:400, y:0, speedY: 7, w: 40, h:40, myColor: "#FF0000"},
	
	{x:490, y:0, speedY: 3, w: 40, h:40, myColor: "#FFFF00"},
	
	{x:600, y:0, speedY: 2, w: 40, h:40, myColor: "#AAFF00"},
	
	{x:650, y:0, speedY: 1, w: 40, h:40, myColor: "#00FF00"},
	
	{x:720, y:0, speedY: 7, w: 40, h:40, myColor: "#FF0000"},
	
	//{x:830, y:0, speedY: 3, w: 40, h:40, myColor: "#FFFF00"},
	
	{x:60, y:0, speedY: 2, w: 40, h:40, myColor: "#AAFF00"},
	
	];
	
	var update = function() {
		
		if (player.isMoving) {
			player.x += player.speedX;
		}
		
		var j = 0; // just a simple counter
		var n = enemies.length;
		
		while (j < n) {
			
			if(checkCollision(player, enemies[j])) {
				gameLive = false;
				alert('YIKES! Game is over!');
				window.location = "";
			}
			
			enemies[j].y = enemies[j].y + enemies[j].speedY;
				
			if (enemies[j].y >= GAME_HEIGHT){
				
				enemies[j].y = GAME_HEIGHT;
				enemies[j].speedY *= -1;
				
		}else if (enemies[j].y <= 0){
			
				enemies[j].y = 0;
				enemies[j].speedY *= -1;
				
				
			}
			
			j++;
			
		}
		
	};

	var draw = function() {
		
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(player.x, player.y, player.w, player.h);
		
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
		
		//var j = 0;
		//var n = enemies.length;
		
		//while(j < n) {
			for (var j = 0; j < enemies.length; j++){
			
			if (enemies[j].speedY > 0) {
				ctx.fillStyle = enemies[j].myColor;
			} else if (enemies[j].speedY < 0) {
				ctx.fillStyle = "#0000FF";
			} else {
				ctx.fillStyle = "#000000";
			}
			
			ctx.fillRect(
				enemies[j].x,
				enemies[j].y,
				enemies[j].w,
				enemies[j].h
			);
			//j += 1;
		}
	};


	
	var step = function() {
		
		update();
		draw();
		
		if(gameLive) {
			window.requestAnimationFrame(step);
		};
	};
	
	var checkCollision = function(rect1, rect2){
		
		var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
		var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
		
		return closeOnHeight && closeOnWidth;
		
	};
	
	// calling process
	
	step();
});

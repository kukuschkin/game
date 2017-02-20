var mainState = {


    preload: function () { 
        // Laedt das bird bild
        game.load.image('bird', 'assets/bird.png');
        
        // Laedt das background bild
        game.load.image('background', 'assets/background.png')
       
        // Laedt das pipe bild
        game.load.image('pipe', 'assets/pipe.png');
        
        // Laedt das pipe new bild
        game.load.image('pipeN', 'assets/pipenew.png')
    },


    create: function() { 
        // Hintergrund Farbe
        // game.stage.backgroundColor = '#80e832';              
        game.add.sprite(0, 0, 'background');
        
        // Fügt Physik hinzu
        game.physics.startSystem(Phaser.Physics.ARCADE);    

        // Erstellt ein Sprite für den Vogel
        this.bird = game.add.sprite(100, 245, 'bird');      

        // Aktiviert für den Vogel Physik
        game.physics.arcade.enable(this.bird);              

        // Lässt den Vogel nach unten Fallen, (Flappy Goat)
        this.bird.body.gravity.y = 1000;    

        // Falls Space gedrueckt wird rufe die jump funktion auf
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
        
        // Erstellt eine Gruppe
        this.pipes = game.add.group(); 
        // test
        this.pipesN = game.add.group();
        
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
        
        this.score = -1;
            this.labelScore = game.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" });   
    },


    update: function() {
        //Falls der Vogel zu Hoch oder zu niedrig ist startet das Spiel neu
        if (this.bird.y < 0 || this.bird.y > 500)
        this.restartGame(); 
        
        //Kollision
        game.physics.arcade.overlap(
        this.bird, this.pipes, this.restartGame, null, this);
    },
    
    
    // Bringt den Vogel zum Fliegen 
    jump: function() {
        // Fallgeschwindigkeit
        this.bird.body.velocity.y = -300;
    },

    
    // Startet spiel neu
    restartGame: function() {
        game.state.start('main');
    },
    
    
    addOnePipe: function(x, y) {
        // Erstellt eine Pipe auf der Position X, Y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Fuegt die Pipe zu der Gruppe hinzu
        this.pipes.add(pipe);

        // Aktieviert Physik auf der Pipe
        game.physics.arcade.enable(pipe);

        // Erstellt Geschwindigkeit um nach Links zu bewegen
        pipe.body.velocity.x = -200; 

        // Toetet die Pipe wenn sie nicht Sichtbar ist
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    
      NaddOnePipe: function(x, y) {
        // Erstellt eine Pipe auf der Position X, Y
        var pipeN = game.add.sprite(x, y, 'pipeN');

        // Fuegt die Pipe zu der Gruppe hinzu
        this.pipesN.add(pipeN);

        // Aktieviert Physik auf der Pipe
        game.physics.arcade.enable(pipeN);

        // Erstellt Geschwindigkeit um nach Links zu bewegen
        pipeN.body.velocity.x = -200; 

        // Toetet die Pipe wenn sie nicht Sichtbar ist
        pipeN.checkWorldBounds = true;
        pipeN.outOfBoundsKill = true;
    },
    
    
    addRowOfPipes: function() {
        // Wahlt eine Nummer zwischen 1 bis 6
        var hole = Math.floor(Math.random()*6 +1);
        
        this.score += 1;
        this.labelScore.text = this.score;  

        // Add the  pipes 
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 10; i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(400, i * 50)
                this.NaddOnePipe(400, (hole-1)*50)
                this.NaddOnePipe(400, (hole+2)*50);
},
    
};





// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 500);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');

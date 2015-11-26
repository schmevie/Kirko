//GLOBAL VARS
var sally;

//DEFAULT VARS
var WORLD_WIDTH = 700 * 35;
var WORLD_HEIGHT = 1500;//500;
var KIRKO_SPEED = 50;//525; 225 is very good speed.
var GLOBAL_GRAVITY = 1200;
var SALLY_START_X = 5800//250;
var SALLY_START_Y = 1250;


var kirko_guitar_track;
var kirko_voice_test;
//was 170 changed it to 300

var jump = 0;
var onTheGround = false;
var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

    create: function() { 
        game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        game.stage.backgroundColor = '#FFFFFF'

        //Enabling the physics for the rest of the game
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.friction  = 5.5;
        game.physics.p2.surfaceVelocity  = 2.5;
        game.physics.p2.gravity.y = GLOBAL_GRAVITY;


        /******TITLE IMAGE*******/
        var title = game.add.sprite(20, 950, 'kirko_title');
        title.alpha = 1;
        game.add.tween(title).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true, 0);

        //HIlls
        var hills = game.add.sprite(0, 1290, 'hills');

        /******KIRKO(Codename Sally)*******/
        //sally = game.add.sprite(180, 250, 'sally'); 150 is good too
        sally = game.add.sprite(SALLY_START_X, SALLY_START_Y, 'sally');
        game.physics.p2.enable(sally);
        
        sally.body.setCircle(35);
        game.camera.follow(sally);
        
        //sally.body.debug = true;
        //sally.body.angularDamping= .1;
        sally.body.angularDamping= .9;
        sally.body.angularForce= 99;
        //sally.body.collideWorldBounds = false;

        sally.body.mass = 1;
        

        /******COLLISION GROUPS*******/
        var kirkoCollisionGroup = game.physics.p2.createCollisionGroup();
        var floorCollisionGroup = game.physics.p2.createCollisionGroup();
        var stairCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfPipeOneCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfPipeTwoCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfPipeThreeCollisionGroup = game.physics.p2.createCollisionGroup();
        var rampCollisionGroup = game.physics.p2.createCollisionGroup();
        var rampReversedCollisionGroup = game.physics.p2.createCollisionGroup();
        var bottomStairCollisionGroup = game.physics.p2.createCollisionGroup();
        var middleStairCollisionGroup = game.physics.p2.createCollisionGroup();
        var smallStairCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfMountainCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfMountainInvertedCollisionGroup = game.physics.p2.createCollisionGroup();

        //This makes sure that the world bounds are still being collided with by the other collision groups
        game.physics.p2.updateBoundsCollisionGroup();


        /**********************************************************
          /$$$$$$  /$$   /$$  /$$$$$$  /$$$$$$$  /$$$$$$$$  /$$$$$$ 
         /$$__  $$| $$  | $$ /$$__  $$| $$__  $$| $$_____/ /$$__  $$
        | $$  \__/| $$  | $$| $$  \ $$| $$  \ $$| $$      | $$  \__/
        |  $$$$$$ | $$$$$$$$| $$$$$$$$| $$$$$$$/| $$$$$   |  $$$$$$ 
         \____  $$| $$__  $$| $$__  $$| $$____/ | $$__/    \____  $$
         /$$  \ $$| $$  | $$| $$  | $$| $$      | $$       /$$  \ $$
        |  $$$$$$/| $$  | $$| $$  | $$| $$      | $$$$$$$$|  $$$$$$/
         \______/ |__/  |__/|__/  |__/|__/      |________/ \______/
         **********************************************************/    

         /** QUICK COMMENT: REMEMBER THAT FOR COLLISION GROUPS YOU NEED TO ADD THE GROUP
         TO BOTH GROUPS SO FLOOR - KIRKO AND KIRKO-FLOOR
         **/
        /******RAMPS*******/
        var ramp = game.add.sprite(15150, 1200, 'ramp');
        game.physics.p2.enable(ramp);
        ramp.body.clearShapes();
        ramp.body.loadPolygon('physicsData', 'ramp');    
        ramp.body.setCollisionGroup(rampCollisionGroup);
        ramp.body.mass = 10;
        ramp.body.collides([floorCollisionGroup, kirkoCollisionGroup]);

                                                                    
        /******THE FLOORS GROUP*******/
        var floors = game.add.group();
        floors.enableBody = true;
        floors.physicsBodyType = Phaser.Physics.P2JS;

        /******CREATING THE FLOORS THE SIZE OF THE WORLD*******/
        for (var x = 350; x < WORLD_WIDTH; x+= 700) {
            var floor = floors.create(x, 455 + 1000, 'floor');
            floor.body.setCollisionGroup(floorCollisionGroup);
            floor.body.collides([kirkoCollisionGroup, floorCollisionGroup, stairCollisionGroup,
                                 halfPipeOneCollisionGroup, halfPipeTwoCollisionGroup, 
                                 halfPipeThreeCollisionGroup, rampCollisionGroup, halfMountainCollisionGroup,
                                 halfMountainInvertedCollisionGroup]);  
            floor.body.mass = 10000;      
        }    


         /******STAIRS- BUILDING THE STAIRS*******/
         var bottomStair = game.add.sprite(3500, 1358, 'bottom_stair');
         game.physics.p2.enable(bottomStair);
         bottomStair.body.clearShapes();
         bottomStair.body.loadPolygon('physicsData', 'large_stair');
         bottomStair.body.static = true;
         bottomStair.body.setCollisionGroup(bottomStairCollisionGroup);
         bottomStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);

         var middleStair = game.add.sprite(3500, 1262, 'middle_stair');
         game.physics.p2.enable(middleStair);
         middleStair.body.clearShapes();
         middleStair.body.loadPolygon('physicsData', 'medium_stair');
         middleStair.body.static = true;
         middleStair.body.setCollisionGroup(middleStairCollisionGroup);
         middleStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);     
         //middleStair.body.debug = true;

         var smallStair = game.add.sprite(3500, 1165, 'small_stair');
         game.physics.p2.enable(smallStair);
         smallStair.body.clearShapes();
         smallStair.body.loadPolygon('physicsData', 'small_stair');
         smallStair.body.static = true;
         smallStair.body.setCollisionGroup(smallStairCollisionGroup);
         smallStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);     
         //smallStair.body.debug = true;


         /******MOUNTAIN- BUILDING THE MOUNTAIN*******/
         var halfMountain = game.add.sprite(7500, 807, 'half_mountain');
         game.physics.p2.enable(halfMountain);
         halfMountain.body.clearShapes();
         halfMountain.body.loadPolygon('physicsData', 'half_mountain');
         halfMountain.body.static = true;
         halfMountain.body.mass = 10;
         halfMountain.body.setCollisionGroup(halfMountainCollisionGroup);
         halfMountain.body.collides([kirkoCollisionGroup]);

         var halfMountainInverted = game.add.sprite(9640, 807, 'half_mountain_inverted');
         game.physics.p2.enable(halfMountainInverted, true);
         halfMountainInverted.body.clearShapes();
         halfMountainInverted.body.loadPolygon('physicsData', 'half_mountain_inverted');
         halfMountainInverted.body.static = true;
         halfMountainInverted.body.mass = 10;
         halfMountainInverted.body.setCollisionGroup(halfMountainInvertedCollisionGroup);
         halfMountainInverted.body.collides([kirkoCollisionGroup]);

        /******HALF PIPES*******/
         var half_pipe_one = game.add.sprite(13800, 1200, 'half_pipe');
         game.physics.p2.enable(half_pipe_one, true);
         half_pipe_one.body.clearShapes();
         half_pipe_one.body.loadPolygon('physicsData', 'half_pipe'); 
         half_pipe_one.body.collideWorldBounds = false;
         half_pipe_one.body.mass = 10;
         half_pipe_one.body.setCollisionGroup(halfPipeOneCollisionGroup);
         half_pipe_one.body.collides([floorCollisionGroup, kirkoCollisionGroup]);   

         var half_pipe_two = game.add.sprite(14500, 1200, 'half_pipe');
         game.physics.p2.enable(half_pipe_two);
         half_pipe_two.body.clearShapes();
         half_pipe_two.body.loadPolygon('physicsData', 'half_pipe'); 
         half_pipe_two.body.collideWorldBounds = false;
         half_pipe_two.body.mass = 10;
         half_pipe_two.body.setCollisionGroup(halfPipeTwoCollisionGroup);
         half_pipe_two.body.collides([floorCollisionGroup, kirkoCollisionGroup]);

         var half_pipe_three = game.add.sprite(15200, 1200, 'half_pipe');
         game.physics.p2.enable(half_pipe_three);
         half_pipe_three.body.clearShapes();
         half_pipe_three.body.loadPolygon('physicsData', 'half_pipe'); 
         half_pipe_three.body.collideWorldBounds = false;
         half_pipe_three.body.mass = 10;
         half_pipe_three.body.setCollisionGroup(halfPipeThreeCollisionGroup);
         half_pipe_three.body.collides([floorCollisionGroup, kirkoCollisionGroup]);            


        /******Making sure that sally collides with the floor*******/
        sally.body.setCollisionGroup(kirkoCollisionGroup);
        sally.body.collides([stairCollisionGroup, halfPipeOneCollisionGroup, halfPipeTwoCollisionGroup, 
                             halfPipeThreeCollisionGroup, rampCollisionGroup, halfMountainCollisionGroup,
                             halfMountainInvertedCollisionGroup]);
        sally.body.collides(floorCollisionGroup, this.hitFloor, this);
        sally.body.collides(bottomStairCollisionGroup, this.hitFloor, this);
        sally.body.collides(middleStairCollisionGroup, this.hitFloor, this);
        sally.body.collides(smallStairCollisionGroup, this.hitFloor, this);
        sally.body.collides(floorCollisionGroup, this.hitFloor, this);
        //TODO ADD COLLISIONS WITH THE STUFF SO WE CAN JUMP
         




         /*****CURSORS*******/
        cursors = game.input.keyboard.createCursorKeys();


        /******MUSIC********/
        kirko_guitar_track = game.add.audio('kirko_guitar_track');
        kirko_guitar_track.volume -= .5;
        //kirko_guitar_track.play();

        kirko_voice_test = game.add.audio('kirko_voice_test');
        kirko_voice_test.volume += 1;
        //kirko_voice_test.play();


        //DEBUG TEXT AT TOP
        var lengthofgame = 10000;
        for (var i = 0; i < lengthofgame; i+=100) {
            var text = i;
            var style = { font: "30px Arial", fill: "#ff0044", align: "center" };
            var t = game.add.text(i, 1000, text, style)        
        }
    }, //end of create function

    //UPDATE FUNCTION - GAME LOOP
    update: function() {
        console.log(sally.body.angularForce);
        console.log(sally.body.angularVelocity);
        if (cursors.left.isDown)
        {
            //sally.body.velocity.x = -200;
            sally.body.rotateLeft(KIRKO_SPEED);
        }
        else if (cursors.right.isDown)
        {
            //sally.body.velocity.x = 200;
            sally.body.rotateRight(KIRKO_SPEED);
        }
        else
        {
            //sally.body.setZeroRotation();
        }


        if (sally.body.x > 500 && sally.body.x < 510) {
           // kirko_guitar_track.pause();
        }
        /*
        if (sally.body.x > 200 && sally.body.x < 500 ) {
            game.physics.p2.gravity.y = 5200;
        } else {
            game.physics.p2.gravity.y = 1200;
        }

        */
       // if (cursors.up.isDown)
       // {
        //    sally.body.moveUp(90);
        //}
        //else if (cursors.down.isDown)
        //{
            //sally.body.reverse(400);
        //} 
        this.jumpkey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.jumpkey.onDown.add(this.jumpCheck, this);
    },
    jumpCheck: function() {
        sally.body.moveUp(500);
        if (onTheGround) {
            sally.body.moveUp(500);
            onTheGround = false;
        }
        // console.log(sally.body.y);
        // if (jump < 2) {//&& (sally.body.velocity.y < 1 && sally.body.velocity.y > -1)) {
        //     sally.body.moveUp(500);  
        //     //sally.body.moveUp(1000);  
        //     jump++;  
        // }
        // jump = 0;
    },
    hitFloor: function() {
        onTheGround = true;
        console.log("evieviewfe");
    }
};
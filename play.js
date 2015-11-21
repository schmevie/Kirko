//GLOBAL VARS
var sally;

//DEFAULT VARS
var WORLD_WIDTH = 700 * 35;
var WORLD_HEIGHT = 1500;//500;
var KIRKO_SPEED = 225;//525;
var GLOBAL_GRAVITY = 1200;
var SALLY_START_X = 7000;
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
        var halfPyramidCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfPyramidReversedCollisionGroup = game.physics.p2.createCollisionGroup();
        var stairCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfPipeOneCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfPipeTwoCollisionGroup = game.physics.p2.createCollisionGroup();
        var halfPipeThreeCollisionGroup = game.physics.p2.createCollisionGroup();
        var rampCollisionGroup = game.physics.p2.createCollisionGroup();
        var rampReversedCollisionGroup = game.physics.p2.createCollisionGroup();
        var bottomStairCollisionGroup = game.physics.p2.createCollisionGroup();
        var middleStairCollisionGroup = game.physics.p2.createCollisionGroup();
        var smallStairCollisionGroup = game.physics.p2.createCollisionGroup();

        //This makes sure that the world bounds are still being collided with by the other collision groups
        game.physics.p2.updateBoundsCollisionGroup();


        /******Building the FLOOR*******/
        /*
        //floor = game.add.sprite(350, 455, 'floor');
        floor = game.add.sprite(350, 455, 'floor');
        game.physics.p2.enable(floor);
        floor.body.immovable = true;
        floor.body.mass = 10;
        //floor.body.debug = true;
        */
       
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
        /******RAMPS*******/
        var ramp = game.add.sprite(11150, 1200, 'ramp');
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
            floor.body.collides([kirkoCollisionGroup, floorCollisionGroup, halfPyramidCollisionGroup, halfPyramidReversedCollisionGroup, stairCollisionGroup, halfPipeOneCollisionGroup, halfPipeTwoCollisionGroup, halfPipeThreeCollisionGroup, rampCollisionGroup]);  
            floor.body.mass = 10000;      
        }    

        /******PYRAMID*******/

        /*
         var half_pyramid = game.add.sprite(3525, (-250 + 1005), 'half_pyramid');
         game.physics.p2.enable(half_pyramid);
         half_pyramid.body.clearShapes();
         half_pyramid.body.loadPolygon('physicsData', 'half_pyramid');     
         half_pyramid.body.collideWorldBounds = false;
         half_pyramid.body.setCollisionGroup(halfPyramidCollisionGroup);
         half_pyramid.body.collides([floorCollisionGroup, kirkoCollisionGroup]);//, kirkoCollisionGroup]);
         //half_pyramid.body.mass = 1000; 
         half_pyramid.body.static = true;
         */

        /******PYRAMID REVERSED*******/
        /*
         var half_pyramid_reversed = game.add.sprite(4900, (-250 + 1005), 'half_pyramid_reversed');
         game.physics.p2.enable(half_pyramid_reversed);
         half_pyramid_reversed.body.clearShapes();
         half_pyramid_reversed.body.loadPolygon('physicsData', 'half_pyramid_reversed');     
         half_pyramid_reversed.body.collideWorldBounds = false;
         half_pyramid_reversed.body.setCollisionGroup(halfPyramidReversedCollisionGroup);
         half_pyramid_reversed.body.collides([floorCollisionGroup, kirkoCollisionGroup]);
         //half_pyramid_reversed.body.mass = 1000;
         half_pyramid_reversed.body.static = true;  
         */

         /******STAIRS- BUILDING THE STAIRS*******/
         var bottomStair = game.add.sprite(3500, 1358, 'bottom_stair');
         game.physics.p2.enable(bottomStair);
         bottomStair.body.clearShapes();
         bottomStair.body.loadPolygon('physicsData', 'large_stair');
         bottomStair.body.static = true;
         bottomStair.body.setCollisionGroup(bottomStairCollisionGroup);
         bottomStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);

         //TODO: Need to add physics
         var middleStair = game.add.sprite(3500, 1262, 'middle_stair');
         game.physics.p2.enable(middleStair);
         middleStair.body.clearShapes();
         middleStair.body.loadPolygon('physicsData', 'medium_stair');
         middleStair.body.static = true;
         middleStair.body.setCollisionGroup(middleStairCollisionGroup);
         middleStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);     
         //middleStair.body.debug = true;

         //TODO: Need to add physics
         var smallStair = game.add.sprite(3500, 1165, 'small_stair');
         game.physics.p2.enable(smallStair);
         smallStair.body.clearShapes();
         smallStair.body.loadPolygon('physicsData', 'small_stair');
         smallStair.body.static = true;
         smallStair.body.setCollisionGroup(smallStairCollisionGroup);
         smallStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);     
         //smallStair.body.debug = true;


         /******MOUNTAIN- BUILDING THE MOUNTAIN*******/
         var half_mountain = game.add.sprite(7500, (-997.5 + 1005), 'half_mountain');
         var half_mountain_inverted = game.add.sprite(10000, (-997.5 + 1005), 'half_mountain_inverted');



         /*
         var bottomLeft = game.add.sprite(7100, 1200, 'stair');
         game.physics.p2.enable(bottomLeft);
         bottomLeft.body.mass = 500;
         bottomLeft.body.setCollisionGroup(stairCollisionGroup);
         bottomLeft.body.collides([floorCollisionGroup, kirkoCollisionGroup, stairCollisionGroup]);

         var bottomMiddle = game.add.sprite(7800.12, 1200, 'stair');
         game.physics.p2.enable(bottomMiddle);
         bottomMiddle.body.mass = 500;
         bottomMiddle.body.setCollisionGroup(stairCollisionGroup);
         bottomMiddle.body.collides([floorCollisionGroup, kirkoCollisionGroup, stairCollisionGroup]);     

         var bottomRight = game.add.sprite(8500, 1200, 'stair');
         game.physics.p2.enable(bottomRight);
         bottomRight.body.mass = 500;
         bottomRight.body.setCollisionGroup(stairCollisionGroup);
         bottomRight.body.collides([floorCollisionGroup, kirkoCollisionGroup, stairCollisionGroup]);  

         var middleLeft = game.add.sprite(7450, 1000, 'stair');
         game.physics.p2.enable(middleLeft);
         middleLeft.body.mass = 50;
         middleLeft.body.setCollisionGroup(stairCollisionGroup);
         middleLeft.body.collides([floorCollisionGroup, kirkoCollisionGroup, stairCollisionGroup]);

         var middleRight = game.add.sprite(8150, 1000, 'stair');
         game.physics.p2.enable(middleRight);
         middleRight.body.mass = 50;
         middleRight.body.setCollisionGroup(stairCollisionGroup);
         middleRight.body.collides([floorCollisionGroup, kirkoCollisionGroup, stairCollisionGroup]);  

         var top = game.add.sprite(7800, 800, 'stair');
         game.physics.p2.enable(top);
         top.body.mass = 10;
         top.body.setCollisionGroup(stairCollisionGroup);
         top.body.collides([floorCollisionGroup, kirkoCollisionGroup, stairCollisionGroup]);               
        */

        /******HALF PIPES*******/
         var half_pipe_one = game.add.sprite(11800, 1200, 'half_pipe');
         game.physics.p2.enable(half_pipe_one, true);
         half_pipe_one.body.clearShapes();
         half_pipe_one.body.loadPolygon('physicsData', 'half_pipe'); 
         half_pipe_one.body.collideWorldBounds = false;
         half_pipe_one.body.mass = 10;
         half_pipe_one.body.setCollisionGroup(halfPipeOneCollisionGroup);
         half_pipe_one.body.collides([floorCollisionGroup, kirkoCollisionGroup]);   

         var half_pipe_two = game.add.sprite(12500, 1200, 'half_pipe');
         game.physics.p2.enable(half_pipe_two);
         half_pipe_two.body.clearShapes();
         half_pipe_two.body.loadPolygon('physicsData', 'half_pipe'); 
         half_pipe_two.body.collideWorldBounds = false;
         half_pipe_two.body.mass = 10;
         half_pipe_two.body.setCollisionGroup(halfPipeTwoCollisionGroup);
         half_pipe_two.body.collides([floorCollisionGroup, kirkoCollisionGroup]);

         var half_pipe_three = game.add.sprite(13200, 1200, 'half_pipe');
         game.physics.p2.enable(half_pipe_three);
         half_pipe_three.body.clearShapes();
         half_pipe_three.body.loadPolygon('physicsData', 'half_pipe'); 
         half_pipe_three.body.collideWorldBounds = false;
         half_pipe_three.body.mass = 10;
         half_pipe_three.body.setCollisionGroup(halfPipeThreeCollisionGroup);
         half_pipe_three.body.collides([floorCollisionGroup, kirkoCollisionGroup]);            


        /******Making sure that sally collides with the floor*******/
        sally.body.setCollisionGroup(kirkoCollisionGroup);
        sally.body.collides([halfPyramidCollisionGroup, halfPyramidReversedCollisionGroup, 
                             stairCollisionGroup, halfPipeOneCollisionGroup, halfPipeTwoCollisionGroup, 
                             halfPipeThreeCollisionGroup, rampCollisionGroup]);
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
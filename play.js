var invisibleWall;
//GLOBAL VARS
var sally;
var enemies;
var treeLedges;
var worldScale = 1;


//DEFAULT VARS
var WORLD_WIDTH = 700 * 50;//700 * 35;
var WORLD_HEIGHT = 1500;//500;
var KIRKO_SPEED = 225;//250;//525; 225 is very good speed.
var GLOBAL_GRAVITY = 1200;
var SALLY_START_X = 340;//250;//5000;//19933;//18000;//11000;//5800//250 is like the perfect beginning point;
var SALLY_START_Y = 1300;//189;//1250;


var kirko_guitar_track;
var kirko_voice_test;
var sample;
//was 170 changed it to 300

var jump = 0;
var onTheGround = false;


//COLLISION GROUPS
var kirkoCollisionGroup;
var floorCollisionGroup;
var stairCollisionGr
var halfPipeOneCollisionGroup;
var halfPipeTwoCollisionGroup;
var halfPipeThreeCollisionGroup;
var rampCollisionGroup;
var rampReversedCollisionGroup;
var bottomStairCollisionGroup;
var middleStairCollisionGroup;
var smallStairCollisionGroup;
var halfMountainCollisionGroup;
var halfMountainInvertedCollisionGroup;
var treeLedgeCollisionGroup;
var invisibleWallCollisionGroup;

var spawnFirstEnemy = true;
var enemyMoveLoop;

var moveEvents = {};

var stopSally = true;

var cameraStart = false;

var title;
var pressStartTitle;


var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

    create: function() { 
        game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        game.stage.backgroundColor = '#FFFFFF';

        //Enabling the physics for the rest of the game
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.friction  = 5.5;
        game.physics.p2.surfaceVelocity  = 2.5;
        game.physics.p2.gravity.y = GLOBAL_GRAVITY;


        //ADVANCED TIMING
        game.time.advancedTiming = true;
        game.time.desiredFps = 60;
        game.time.slowMotion = 1.0;

         /*****CURSORS*******/
        cursors = game.input.keyboard.createCursorKeys();





        /**********************************************************
.______        ___       ______  __  ___   _______ .______        ______    __    __  .__   __.  _______  
|   _  \      /   \     /      ||  |/  /  /  _____||   _  \      /  __  \  |  |  |  | |  \ |  | |       \ 
|  |_)  |    /  ^  \   |  ,----'|  '  /  |  |  __  |  |_)  |    |  |  |  | |  |  |  | |   \|  | |  .--.  |
|   _  <    /  /_\  \  |  |     |    <   |  | |_ | |      /     |  |  |  | |  |  |  | |  . `  | |  |  |  |
|  |_)  |  /  _____  \ |  `----.|  .  \  |  |__| | |  |\  \----.|  `--'  | |  `--'  | |  |\   | |  '--'  |
|______/  /__/     \__\ \______||__|\__\  \______| | _| `._____| \______/   \______/  |__| \__| |_______/ 
                                                                                                          
         **********************************************************/ 


        var backgroundV1 = game.add.sprite(0, 800, 'background_v1');








        var treeTrunk = game.add.sprite(18500, -868, 'tree_trunk');

        //TODO: SET THESE UP ADD PHYSICS MOVE IT TO SHAPES ETC
        //Hills
        var hills = game.add.sprite(10900, 1079, 'hills');
        var hills2 = game.add.sprite(14400, 1079, 'hills');
        // sample = game.add.tileSprite(0, 650, WORLD_WIDTH, 1025, 'background');
        // var sample = game.add.sprite(1025, 650, 'background');
        // var sample = game.add.sprite(2050, 650, 'background');
        // var sample = game.add.sprite(3075, 650, 'background');



        /******KIRKO(Codename Sally)*******/
        //sally = game.add.sprite(180, 250, 'sally'); 150 is good too
        sally = game.add.sprite(SALLY_START_X, SALLY_START_Y, 'sally');
        game.physics.p2.enable(sally);
        
        sally.body.setCircle(35);
        game.camera.follow(sally);
        game.camera.setPosition(0, SALLY_START_Y);
        
        //sally.body.debug = true;
        //sally.body.angularDamping= .1;
        sally.body.angularDamping= .9;
        sally.body.angularForce= 99;
        //sally.body.collideWorldBounds = false;

        sally.body.mass = 1;

        /******COLLISION GROUPS*******/
        kirkoCollisionGroup = game.physics.p2.createCollisionGroup();
        floorCollisionGroup = game.physics.p2.createCollisionGroup();
        stairCollisionGroup = game.physics.p2.createCollisionGroup();
        halfPipeOneCollisionGroup = game.physics.p2.createCollisionGroup();
        halfPipeTwoCollisionGroup = game.physics.p2.createCollisionGroup();
        halfPipeThreeCollisionGroup = game.physics.p2.createCollisionGroup();
        rampCollisionGroup = game.physics.p2.createCollisionGroup();
        rampReversedCollisionGroup = game.physics.p2.createCollisionGroup();
        bottomStairCollisionGroup = game.physics.p2.createCollisionGroup();
        middleStairCollisionGroup = game.physics.p2.createCollisionGroup();
        smallStairCollisionGroup = game.physics.p2.createCollisionGroup();
        halfMountainCollisionGroup = game.physics.p2.createCollisionGroup();
        halfMountainInvertedCollisionGroup = game.physics.p2.createCollisionGroup();
        treeLedgeCollisionGroup = game.physics.p2.createCollisionGroup();
        invisibleWallCollisionGroup = game.physics.p2.createCollisionGroup();

        var enemyCollisionGroup = game.physics.p2.createCollisionGroup();

        //This makes sure that the world bounds are still being collided with by the other collision groups
        game.physics.p2.updateBoundsCollisionGroup();


        //TODO SHOULD CLEAN THIS UP
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.P2JS;










        /**********************************************************
             _______. __    __       ___      .______    _______     _______.
            /       ||  |  |  |     /   \     |   _  \  |   ____|   /       |
           |   (----`|  |__|  |    /  ^  \    |  |_)  | |  |__     |   (----`
            \   \    |   __   |   /  /_\  \   |   ___/  |   __|     \   \    
        .----)   |   |  |  |  |  /  _____  \  |  |      |  |____.----)   |   
        |_______/    |__|  |__| /__/     \__\ | _|      |_______|_______/    
         **********************************************************/    

         /** QUICK COMMENT: REMEMBER THAT FOR COLLISION GROUPS YOU NEED TO ADD THE GROUP
         TO BOTH GROUPS SO FLOOR - KIRKO AND KIRKO-FLOOR
         **/

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
                                 halfMountainInvertedCollisionGroup, treeLedgeCollisionGroup]);  
            // floor.body.mass = 10000;
            floor.body.static = true;
        }


         /******STAIRS- BUILDING THE STAIRS*******/
         var bottomStair = game.add.sprite(8500, 1358, 'bottom_stair');
         game.physics.p2.enable(bottomStair);
         bottomStair.body.clearShapes();
         bottomStair.body.loadPolygon('physicsData', 'large_stair');
         bottomStair.body.static = true;
         bottomStair.body.setCollisionGroup(bottomStairCollisionGroup);
         bottomStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);

         var middleStair = game.add.sprite(8500, 1262, 'middle_stair');
         game.physics.p2.enable(middleStair);
         middleStair.body.clearShapes();
         middleStair.body.loadPolygon('physicsData', 'medium_stair');
         middleStair.body.static = true;
         middleStair.body.setCollisionGroup(middleStairCollisionGroup);
         middleStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);     
         //middleStair.body.debug = true;

         var smallStair = game.add.sprite(8500, 1165, 'small_stair');
         game.physics.p2.enable(smallStair);
         smallStair.body.clearShapes();
         smallStair.body.loadPolygon('physicsData', 'small_stair');
         smallStair.body.static = true;
         smallStair.body.setCollisionGroup(smallStairCollisionGroup);
         smallStair.body.collides([kirkoCollisionGroup, floorCollisionGroup]);     
         //smallStair.body.debug = true;


         /******MOUNTAIN- BUILDING THE MOUNTAIN*******/
         // var halfMountain = game.add.sprite(7500, 807, 'half_mountain');
         // game.physics.p2.enable(halfMountain);
         // halfMountain.body.clearShapes();
         // halfMountain.body.loadPolygon('physicsData', 'half_mountain');
         // halfMountain.body.static = true;
         // halfMountain.body.mass = 10;
         // halfMountain.body.setCollisionGroup(halfMountainCollisionGroup);
         // halfMountain.body.collides([kirkoCollisionGroup]);

         // var halfMountainInverted = game.add.sprite(9640, 807, 'half_mountain_inverted');
         // game.physics.p2.enable(halfMountainInverted, true);
         // halfMountainInverted.body.clearShapes();
         // halfMountainInverted.body.loadPolygon('physicsData', 'half_mountain_inverted');
         // halfMountainInverted.body.static = true;
         // halfMountainInverted.body.mass = 10;
         // halfMountainInverted.body.setCollisionGroup(halfMountainInvertedCollisionGroup);
         // halfMountainInverted.body.collides([kirkoCollisionGroup]);


        /******THE TREE LEDGES*******/
        
        // treeLedges = game.add.group();
        // treeLedges.enableBody = true;
        // treeLedges.physicsBodyType = Phaser.Physics.P2JS;

        // var treeLedge = treeLedges.create(18850, 1350, 'tree_ledge');
        // treeLedge.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge.body.collides([kirkoCollisionGroup]);  
        // treeLedge.body.static = true;

        // var treeLedge2 = treeLedges.create(19200, 1250, 'tree_ledge');
        // treeLedge2.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge2.body.collides([kirkoCollisionGroup]);  
        // treeLedge2.body.static = true;

        // var treeLedge3 = treeLedges.create(19550, 1150, 'tree_ledge');
        // treeLedge3.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge3.body.collides([kirkoCollisionGroup]);  
        // treeLedge3.body.static = true;

        // var treeLedge4 = treeLedges.create(19850 + 50, 1050, 'tree_ledge_smaller');
        // treeLedge4.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge4.body.collides([kirkoCollisionGroup]);  
        // treeLedge4.body.static = true;

        // var treeLedge5 = treeLedges.create(19600 - 50, 950, 'tree_ledge_smaller');
        // treeLedge5.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge5.body.collides([kirkoCollisionGroup]);  
        // treeLedge5.body.static = true;

        // var treeLedge6 = treeLedges.create(19850 + 50, 850, 'tree_ledge_smaller');
        // treeLedge6.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge6.body.collides([kirkoCollisionGroup]);  
        // treeLedge6.body.static = true;

        // var treeLedge7 = treeLedges.create(19600 - 50, 750, 'tree_ledge_smaller');
        // treeLedge7.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge7.body.collides([kirkoCollisionGroup]);  
        // treeLedge7.body.static = true;

        // var treeLedge8 = treeLedges.create(19850 + 50, 650, 'tree_ledge_smaller');
        // treeLedge8.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge8.body.collides([kirkoCollisionGroup]);  
        // treeLedge8.body.static = true;

        // var treeLedge9 = treeLedges.create(19600 - 50, 550, 'tree_ledge_smaller');
        // treeLedge9.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge9.body.collides([kirkoCollisionGroup]);  
        // treeLedge9.body.static = true;

        // var treeLedge10 = treeLedges.create(19850 + 50, 450, 'tree_ledge_smaller');
        // treeLedge10.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge10.body.collides([kirkoCollisionGroup]);  
        // treeLedge10.body.static = true;

        // var treeLedge11 = treeLedges.create(19600 - 50, 350, 'tree_ledge_smaller');
        // treeLedge11.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge11.body.collides([kirkoCollisionGroup]);  
        // treeLedge11.body.static = true;

        // var treeLedge12 = treeLedges.create(19850 + 50, 250, 'tree_ledge_smaller');
        // treeLedge12.body.setCollisionGroup(treeLedgeCollisionGroup);
        // treeLedge12.body.collides([kirkoCollisionGroup]);  
        // treeLedge12.body.static = true;

        // // var treeLedge13 = treeLedges.create(19850 + 300, 150, 'tree_ledge_smaller_alternate');
        // // treeLedge13.body.setCollisionGroup(floorCollisionGroup);
        // // treeLedge13.body.static = true;
        // // treeLedge13.body.collides([kirkoCollisionGroup], function() {
        // //     console.log("last ledge");
        // //     treeLedge13.body.static = false;
        // // });


        // /******THE LAST TREE LEDGE PIECES*******/
        // var brokenLedge1 = treeLedges.create(19850 + 268, 136, 'broken_ledge_1');
        // brokenLedge1.body.setCollisionGroup(treeLedgeCollisionGroup);
        // brokenLedge1.body.static = true;
        // brokenLedge1.body.collides([kirkoCollisionGroup], function() {
        //     brokenLedge1.body.static = false;
        //     brokenLedge2.body.static = false;
        //     brokenLedge3.body.static = false;
        //     brokenLedge4.body.static = false;
        //     brokenLedge5.body.static = false;
        //     brokenLedge5.body.moveRight(50);
        //     brokenLedge4.body.moveDown(50);
        //     brokenLedge1.body.moveLeft(50);
        //     game.time.slowMotion = 4.0;
        // });
        // brokenLedge1.body.collides([floorCollisionGroup])

        // var brokenLedge2 = treeLedges.create(19850 + 300, 150, 'broken_ledge_2');
        // brokenLedge2.body.setCollisionGroup(treeLedgeCollisionGroup);
        // brokenLedge2.body.static = true;
        // brokenLedge2.body.collides([kirkoCollisionGroup], function() {
        //     brokenLedge1.body.static = false;
        //     brokenLedge2.body.static = false;
        //     brokenLedge3.body.static = false;
        //     brokenLedge4.body.static = false;
        //     brokenLedge5.body.static = false;
        //     brokenLedge5.body.moveRight(50);
        //     brokenLedge4.body.moveDown(50);
        //     brokenLedge1.body.moveLeft(50);
        //     game.time.slowMotion = 4.0;
        // });
        // brokenLedge2.body.collides([floorCollisionGroup])

        // var brokenLedge3 = treeLedges.create(19850 + 270, 167, 'broken_ledge_3');
        // brokenLedge3.body.setCollisionGroup(treeLedgeCollisionGroup);
        // brokenLedge3.body.static = true;
        // brokenLedge3.body.collides([kirkoCollisionGroup], function() {
        //     brokenLedge3.body.static = false;
        // });
        // brokenLedge3.body.mass = 6000000000;
        // brokenLedge3.body.collides([floorCollisionGroup])

        // var brokenLedge4 = treeLedges.create(19850 + 305, 162.5, 'broken_ledge_4');
        // brokenLedge4.body.setCollisionGroup(treeLedgeCollisionGroup);
        // brokenLedge4.body.static = true;
        // brokenLedge4.body.collides([kirkoCollisionGroup], function() {
        //     brokenLedge4.body.static = false;
        //     brokenLedge4.body.mass = 60000;
        // });
        // brokenLedge4.body.mass = 60000;
        // brokenLedge4.body.collides([floorCollisionGroup])

        // var brokenLedge5 = treeLedges.create(19850 + 357, 150, 'broken_ledge_5');
        // brokenLedge5.body.setCollisionGroup(treeLedgeCollisionGroup);
        // brokenLedge5.body.static = true;
        // brokenLedge5.body.collides([kirkoCollisionGroup], function() {
        //     brokenLedge1.body.static = false;
        //     brokenLedge2.body.static = false;
        //     brokenLedge3.body.static = false;
        //     brokenLedge4.body.static = false;
        //     brokenLedge5.body.static = false;
        //     brokenLedge5.body.moveRight(50);
        //     brokenLedge4.body.moveDown(50);
        //     brokenLedge1.body.moveLeft(50);
        //     game.time.slowMotion = 4.0;
        // });
        // brokenLedge5.body.collides([floorCollisionGroup])


        // invisibleWall = game.add.sprite(708, SALLY_START_Y - 100 , 'invisible_wall');
        // game.physics.p2.enable(invisibleWall);
        // invisibleWall.alpha = 0;
        // // invisibleWall.body.clearShapes();
        // invisibleWall.body.setCollisionGroup(floorCollisionGroup);
        // // invisibleWall.scale.width = 400;
        // // invisibleWall.body.setRectangle(40, 400, 0, 0);
        // invisibleWall.body.static = true;
        // invisibleWall.body.mass = 1000;
        // invisibleWall.body.collides([kirkoCollisionGroup]);




        /******Making sure that sally collides with the floor*******/
        sally.body.setCollisionGroup(kirkoCollisionGroup);
        sally.body.collides([stairCollisionGroup, halfPipeOneCollisionGroup, halfPipeTwoCollisionGroup, 
                             halfPipeThreeCollisionGroup, rampCollisionGroup, halfMountainCollisionGroup,
                             halfMountainInvertedCollisionGroup, treeLedgeCollisionGroup, invisibleWallCollisionGroup]);
        sally.body.collides(floorCollisionGroup, this.hitFloor, this);
        sally.body.collides(bottomStairCollisionGroup, this.hitFloor, this);
        sally.body.collides(middleStairCollisionGroup, this.hitFloor, this);
        sally.body.collides(smallStairCollisionGroup, this.hitFloor, this);
        sally.body.collides(floorCollisionGroup, this.hitFloor, this);
        //TODO ADD COLLISIONS WITH THE STUFF SO WE CAN JUMP
         

        /**********************************************************
         ___________    ____  _______ .__   __. .___________.    _______.
        |   ____\   \  /   / |   ____||  \ |  | |           |   /       |
        |  |__   \   \/   /  |  |__   |   \|  | `---|  |----`  |   (----`
        |   __|   \      /   |   __|  |  . `  |     |  |        \   \    
        |  |____   \    /    |  |____ |  |\   |     |  |    .----)   |   
        |_______|   \__/     |_______||__| \__|     |__|    |_______/    
         **********************************************************/ 


         moveEvents = {
            270 : {
                "spawnEnemy" : {
                    "hasBeenSpawned" : false,
                    "spawnX": 5800,
                    "spawnY": 100
                }

            }
         }








        /**********************************************************
         __  .__   __.  __  .___________.
        |  | |  \ |  | |  | |           |
        |  | |   \|  | |  | `---|  |----`
        |  | |  . `  | |  |     |  |     
        |  | |  |\   | |  |     |  |     
        |__| |__| \__| |__|     |__|     
                                             
         **********************************************************/    


        /******TITLE IMAGE*******/
        // title = game.add.sprite(120, 1000, 'kirko_title_alternate');
        title = game.add.sprite(120, 945, 'kirko_title_alternate');
        pressStartTitle = game.add.sprite(225, 1430, 'kirko_press_start');
        title.alpha = 1;
        pressStartTitle.alpha = 1;


        /******MUSIC********/
        kirko_guitar_track = game.add.audio('kirko_guitar_track');
        kirko_guitar_track.volume -= .5;
        //kirko_guitar_track.play();

        kirko_voice_test = game.add.audio('kirko_voice_test');
        kirko_voice_test.volume += 1;
        //kirko_voice_test.play();


        //DEBUG TEXT AT TOP
        // var lengthofgame = WORLD_WIDTH;//10000;
        // for (var i = 0; i < lengthofgame; i+=100) {
        //     var text = i;
        //     var style = { font: "30px Arial", fill: "#ff0044", align: "center" };
        //     var t = game.add.text(i, 1000, text, style)        
        // }


        //TIMER
        enemyMoveLoop = game.time.events.loop(1500, function() {
            // console.log("Move Enemy even fired")
            this.moveEnemies(450);
        }, this);

        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.startGame, this);

        //JUMPING 
        this.jumpkey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.jumpkey.onDown.add(this.jumpCheck, this);

    }, //end of create function

    //UPDATE FUNCTION - GAME LOOP
    update: function() {
        //Parallax effect
        // sample.x= game.camera.x*0.1
        // console.log(sally.body.angularForce);
        // console.log(sally.body.angularVelocity);


        // sally.body.setZeroVelocity();
        /******CURSORS/CONTROLS********/
        if (!stopSally) {
            if (cursors.left.isDown) {
                //sally.body.velocity.x = -200;
                sally.body.rotateLeft(KIRKO_SPEED);

                // sally.body.moveLeft(200);
            } else if (cursors.right.isDown) {
                //sally.body.velocity.x = 200;
                sally.body.rotateRight(KIRKO_SPEED);
                // sally.body.moveRight(200);
            } else {
                if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
                    sally.body.setZeroRotation();
                }
            }
        }



        // if (cursors.up.isDown)
        // {
        //     sally.body.moveUp(200);
        // }
        // else if (cursors.down.isDown)
        // {
        //     sally.body.moveDown(200);
        // }




        //SCALING FOR DEBUG PURPOSES ONLY
        if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            console.log("evie");
            worldScale += 0.005;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            worldScale -= 0.005;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            console.log("C checking");
            game.camera.unfollow();
            var cameraTween = game.add.tween(game.camera).to( {x: (sally.x )  + 300, y: sally.y  }, 750, Phaser.Easing.Quadratic.InOut, true);
        } if (game.input.keyboard.isDown(Phaser.Keyboard.V)) { 
                        // game.camera.unfollow();
            var cameraTween = game.add.tween(game.camera).to( {x: (sally.x ) - (game.camera.width / 2), y: sally.y  }, 750, Phaser.Easing.Quadratic.InOut, true);
            cameraTween.onComplete.add(function() {
                game.camera.follow(sally);
                // cameraStart = true;
            });
        }
        game.world.scale.set(worldScale);


        //Spawning the first enemy.
        // if (sally.body.x > 5400 && sally.body.x < 5420) {
        //    if (spawnFirstEnemy) {
        //         this.spawnEnemy(5800, 100);
        //         spawnFirstEnemy = false;
        //    }
        // }

        //Grab the coord and divide by the offset and then look in the hash table for it
        var cleanCoord = Math.floor(Math.floor(sally.body.x) / 20); // The 20 should be replaced with a constant.
        if (moveEvents[cleanCoord]) {
            var eventObj = moveEvents[cleanCoord];
            if (eventObj.spawnEnemy) {
                    var spawnEnemyObj = eventObj.spawnEnemy;
                    if (!spawnEnemyObj.hasBeenSpawned) {
                        this.spawnEnemy(spawnEnemyObj.spawnX, spawnEnemyObj.spawnY);
                        spawnEnemyObj.hasBeenSpawned = true;
                    }

            }
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

        // if (cameraStart) {
        //     game.camera.focusOnXY(sally.x, sally.y);
        // }


    },
    jumpCheck: function() {
        //Remove this to get rid of the double jump
        if (!stopSally){
            sally.body.moveUp(600);
        }

        // if (onTheGround) {
        //     sally.body.moveUp(500);
        //     onTheGround = false;
        // }
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
    },
    enemyCollidesFloor: function(enemy) {
        game.time.events.add(1000, function() {
            // console.log("Setting the floor var to true");
            enemy.isOnFloor = true;
        }, this);
    },
    spawnEnemy: function(x, y) {
        var enemy = enemies.create(x, y, 'enemy');
        enemy.body.setCollisionGroup(floorCollisionGroup);
        enemy.body.collides([kirkoCollisionGroup, stairCollisionGroup,
        halfPipeOneCollisionGroup, halfPipeTwoCollisionGroup, 
        halfPipeThreeCollisionGroup, rampCollisionGroup, halfMountainCollisionGroup,
        halfMountainInvertedCollisionGroup]);  
        enemy.body.collides(floorCollisionGroup, function() {
            this.enemyCollidesFloor(enemy);
        }, this)
        enemy.body.mass = 10;
        enemy.isOnFloor = false;
    },
    moveEnemies: function(rot) {
        enemies.forEachExists(function(enemy) {
            if (enemy.isOnFloor) {
                enemy.body.rotateLeft(rot);
            }

        });
    },
    startGame: function() {
        // game.camera.follow(sally);
        // invisibleWall.kill();
        stopSally = false;
        game.add.tween(title).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true, 0);
        // game.camera.follow(sally);
        // var cameraTween = game.add.tween(game.camera).to( {x: (sally.x )  - 200, y: sally.y  }, 750, Phaser.Easing.Quadratic.InOut, true);
        // cameraTween.onComplete.add(function() {
        //     // game.camera.follow(sally);
        //     cameraStart = true;
        // });
    },
    render: function() {
        // game.debug.cameraInfo(game.camera, 32, 32);
        // game.debug.spriteCoords(sally, 32, 500);
    }
};
window.moveEnemies = play_state.moveEnemies;
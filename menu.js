var sally;
var persX;
var persY;
var menu_state = {  
    create: function() {
        // game.world.setBounds(0, 0, 700, 500);
        // game.stage.backgroundColor = '#FFFFFF';

        // game.physics.startSystem(Phaser.Physics.P2JS);
        // game.physics.p2.setImpactEvents(true);
        // game.physics.p2.friction  = 5.5;
        // game.physics.p2.surfaceVelocity  = 2.5;
        // game.physics.p2.gravity.y = GLOBAL_GRAVITY;
        // game.physics.p2.updateBoundsCollisionGroup();


        // var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // space_key.onDown.add(this.start, this);


        // var kirkoCollisionGroup = game.physics.p2.createCollisionGroup();
        // var floorCollisionGroup = game.physics.p2.createCollisionGroup();
        // var floor = game.add.sprite(350, 450, 'floor');
        // game.physics.p2.enable(floor);
        // floor.body.static = true;
        // floor.body.setCollisionGroup(floorCollisionGroup);
        // floor.body.collides([kirkoCollisionGroup]);

        // cursors = game.input.keyboard.createCursorKeys();



        // sally = game.add.sprite(340, 360, 'sally');
        // game.physics.p2.enable(sally);
        
        // sally.body.setCircle(35);
        // sally.body.setCollisionGroup(kirkoCollisionGroup);
        // sally.body.collides([floorCollisionGroup]);




        // var title = game.add.sprite(120, 0, 'kirko_title_alternate');

        this.start();
    },

    // Start the actual game
    start: function() {
        this.game.state.start('play');
    },

    update: function() {
        // if (cursors.left.isDown)
        // {
        //     //sally.body.velocity.x = -200;
        //     sally.body.rotateLeft(KIRKO_SPEED);

        //     // sally.body.moveLeft(200);
        // }
        // else if (cursors.right.isDown)
        // {
        //     //sally.body.velocity.x = 200;
        //     sally.body.rotateRight(KIRKO_SPEED);
        //     // sally.body.moveRight(200);
        // }
        // else
        // {
        //     if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        //         sally.body.setZeroRotation();
        //     }

        // }
        // persY = sally.y;
        // persX = sally.x;
    }
};
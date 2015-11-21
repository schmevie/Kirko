var load_state = {  
    preload: function() {
        /*** MAIN CHARACTER ***/
        game.load.image('sally', 'assets/sallyv4.png');

        game.load.image('floor', 'assets/kirko_ground.png');
        game.load.image('half_pyramid', 'assets/half_pyramid_test.png');
        game.load.image('half_pyramid_reversed', 'assets/half_pyramid_reversed.png');

        game.load.image('stair', 'assets/kirko_stairs.png');

        game.load.image('bottom_stair', 'assets/kirko_stair_large.png');
        game.load.image('middle_stair', 'assets/kirko_stair_medium.png');
        game.load.image('small_stair', 'assets/kirko_stair_small.png');
        //Hills//
        game.load.image('hills', 'assets/kirko_hills.png');

        game.load.image('half_pipe', 'assets/kirko_half_pipe.png');
        game.load.image('ramp', 'assets/kirko_ramp.png');

        game.load.image('half_mountain', 'assets/kirko_half_mountain.png');
        game.load.image('half_mountain_inverted', 'assets/kirko_half_mountain_alternate.png');
        /*** TITLE SCREEN ***/
        game.load.image('kirko_title', 'assets/kirko_title_screen.png');
        /*** PHYSICS DATA ***/
        game.load.physics('physicsData', 'assets/physics/sprites.json');

        /*** VOICE AND MUSIC TRACKS ***/
        game.load.audio('kirko_guitar_track', ['assets/Music/kirko_guitar_test.mp3']);
        game.load.audio('kirko_voice_test', ['assets/Music/kirko_voice_test.mp3']);
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};
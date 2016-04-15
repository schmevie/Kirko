var load_state = {  
    preload: function() {
        /*** MAIN CHARACTER ***/
        game.load.image('sally', 'assets/sallyv4.png');

        /*** ENEMY ***/
        game.load.image('enemy', 'assets/kirko_enemy.png');

        /*** GEOMETRY ***/
        game.load.image('floor', 'assets/geometry/kirko_ground.png');

        game.load.image('bottom_stair', 'assets/geometry/kirko_stair_large.png');
        game.load.image('middle_stair', 'assets/geometry/kirko_stair_medium.png');
        game.load.image('small_stair', 'assets/geometry/kirko_stair_small.png');

        game.load.image('half_pipe', 'assets/geometry/kirko_half_pipe.png');
        game.load.image('ramp', 'assets/geometry/kirko_ramp.png');

        game.load.image('half_mountain', 'assets/geometry/kirko_half_mountain.png');
        game.load.image('half_mountain_inverted', 'assets/geometry/kirko_half_mountain_inverted.png');

        /*** TITLE SCREEN ***/
        game.load.image('kirko_title', 'assets/kirko_title_screen.png');
        game.load.image('kirko_title_alternate', 'assets/kirko_title_screen_v3.png');
        game.load.image('kirko_press_start', 'assets/kirko_press_start.png');
        /*** PHYSICS DATA ***/
        game.load.physics('physicsData', 'assets/physics/sprites.json');

        //Hills//
        game.load.image('hills', 'assets/kirko_hills_final.png');
        game.load.image('background', 'assets/colored_talltrees.png');

        //TREE//
        game.load.image('tree_trunk', 'assets/kirko_tree_trunk.png');
        game.load.image('tree_ledge', 'assets/kirko_tree_ledge.png');
        game.load.image('tree_ledge_smaller', 'assets/kirko_tree_ledge_smaller.png');
        game.load.image('tree_ledge_smaller_alternate', 'assets/kirko_tree_ledge_smaller.png');

        //BROKEN LEDGE PIECES//
        game.load.image('broken_ledge_1', 'assets/kirko_broken_ledge_1.png');
        game.load.image('broken_ledge_2', 'assets/kirko_broken_ledge_2.png');
        game.load.image('broken_ledge_3', 'assets/kirko_broken_ledge_3.png');
        game.load.image('broken_ledge_4', 'assets/kirko_broken_ledge_4.png');
        game.load.image('broken_ledge_5', 'assets/kirko_broken_ledge_5.png');

        //INVISIBLE WALL
        game.load.image('invisible_wall', 'assets/kirko_invisible_wall_v2.png');


        /*** VOICE AND MUSIC TRACKS ***/
        game.load.audio('kirko_guitar_track', ['assets/Music/kirko_guitar_test.mp3']);
        game.load.audio('kirko_voice_test', ['assets/Music/kirko_voice_test.mp3']);

        //BACKGROUND
        game.load.image('background_v1', 'assets/background/kirko_background_v1.png');

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};
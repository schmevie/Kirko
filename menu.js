var menu_state = {  
    create: function() {
        this.start();
    },

    // Start the actual game
    start: function() {
        this.game.state.start('play');
    }
};
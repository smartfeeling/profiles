/**
 * Template Script.
 */
!(function (window, $) {

    function loaded(model, callback) {

        // console.log('Template Script');

        _initMyTemplate(model);

        // after initialization and HTML creation
        // $()['Accordion']({initAll:true});
        //$()['Carousel']({initAll:true});

        ly.call(callback);
    }

    // ------------------------------------------------------------------------
    //                      private
    // ------------------------------------------------------------------------


    function _initMyTemplate(model) {
        // creates sections and add handlers
    }


    // ------------------------------------------------------------------------
    //                      export
    // ------------------------------------------------------------------------

    ly.provide("app.Bootstrapper.loaded");
    app.Bootstrapper.loaded = loaded;

})(this, jQuery);
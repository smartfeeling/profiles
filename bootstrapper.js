!(function (window, $) {



    // ------------------------------------------------------------------------
    //                      bootstrapper
    // ------------------------------------------------------------------------

    function Bootstrapper() {
        this.options = {
            template:"basic", // template name
            profile_id:"",
            target:"#page_content",
            callback:function (model) {
            }
        };
    }

    Bootstrapper.prototype.load = function (options) {
        var template = options['template'] || 'basic';
        var target = options['target'] || '#page_content';
        $(target).html('');
        _.bind(_load, this)(template, target, function (model) {
            if (!!options.callback) {
                ly.call(options.callback, [model]);
            }
        });
    };

    // ------------------------------------------------------------------------
    //                      private
    // ------------------------------------------------------------------------

    function _load(template, target, callback) {
        var self = this;
        var timestamp = '?timestamp=' + new Date(); // avoid ajax cache
        var path_template = '../../templates/' + template + '/' + template + '.html' + timestamp;
        var path_links = '../../templates/' + template + '/' + template + '.link' + timestamp;
        var path_scripts = '../../templates/' + template + '/' + template + '.script' + timestamp;
        var path_script = '../../templates/' + template + '/' + template + '.js' + timestamp;
        var path_css = '../../templates/' + template + '/' + template + '.css' + timestamp;
        // load template files
        _.bind(_appendLinks, self)(path_links, $(target), function () {
            _.bind(_appendScripts, self)(path_scripts, $(target), function () {
                _.bind(_appendCss, self)(path_css, $(target), function () {
                    $.get(path_template, function (template) {
                        if (!!template) {
                            _.bind(_getModel)(function (model) {
                                if (!!model) {
                                    _.bind(_appendHtml, self)($(target), template, model, function () {
                                        $.get(path_script, function (template_script) {
                                            // evaluate template script
                                            if (!!template_script) {
                                                // evaluate template script and call custom actions
                                                _evalTemplateScript(template_script, model, function () {
                                                    _.bind(_show)(target);
                                                    ly.call(callback, [model]);
                                                });
                                            } else {
                                                // no template script. just append
                                                _.bind(_show)(target);
                                                ly.call(callback, [model]);
                                            }
                                        }, 'html');
                                    });
                                }
                            }, 'json');
                        }
                    }, 'html');
                });
            });
        });
    }

    function _getModel(callback){
        var lang = (navigator.language) ? navigator.language : navigator.userLanguage;
        lang = lang.split('-', 1)[0];
        var timestamp = '?timestamp=' + new Date(); // avoid ajax cache
        var path_model = 'model.json' + timestamp;
        var path_model_lang = 'model_'+lang+'.json' + timestamp;
        $.get(path_model_lang, function (model) {
            if(!model){
                $.get(path_model, function (model) {
                    ly.call(callback, [model]);
                }, 'json');
            } else {
                ly.call(callback, [model]);
            }
        }, 'json');
    }

    function _appendLinks(path, $target, callback) {
        $.get(path, function (links) {
            if (!!links) {
                // append css
                $target.append(links);
            }
            ly.call(callback);
        }, 'html');
    }

    function _appendScripts(path, $target, callback) {
        $.get(path, function (scripts) {
            if (!!scripts) {
                // append css
                $target.append(scripts);
            }
            ly.call(callback);
        }, 'html');
    }

    function _appendCss(path, $target, callback) {
        $.get(path, function (css) {
            if (!!css) {
                // append css
                $target.append('<style>' + css + '</style>');
            }
            ly.call(callback);
        }, 'html');
    }

    function _appendHtml($target, template, model, callback) {
        try {
            var html = ly.template(template, model);
            $target.append(html);
            //console.log(html);
        } catch (err) {
            ly.console.error(err);
        }
        ly.call(callback);
    }

    function _evalTemplateScript(template_script, model, callback) {
        //_.delay(function(){
            try {
                eval(template_script);
                if (!!app.Bootstrapper.loaded) {
                    app.Bootstrapper.loaded(model, function () {
                        ly.call(callback);
                    });
                } else {
                    ly.call(callback);
                }
            } catch (err) {
                ly.console.error(err);
                ly.call(callback);
            }
        //}, 100);
    }

    function _show(target) {
        $('.loading').hide();
        $(target).fadeIn();
    }

    // ------------------------------------------------------------------------
    //                      export
    // ------------------------------------------------------------------------

    ly.provide("app.Bootstrapper");
    app.Bootstrapper = new Bootstrapper();


})(this, jQuery);

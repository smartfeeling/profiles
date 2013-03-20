/**
 * Template Script.
 */
!(function (window, $) {

    function loaded(model, callback) {

        // console.log('Template Script');

        _initSkills(model['skills']);
        _initPortfolio(model['portfolio']);
        _initLinks(model['links']);
        _initContacts(model['contacts']);


        $('#skills').accordion({
            collapsible: true,
            heightStyle: "content"
        });

        $('.carousel').carousel('pause');

        ly.call(callback);
    }

    // ------------------------------------------------------------------------
    //                      private
    // ------------------------------------------------------------------------

    /**
     * Returns a map of array
     * @param items
     * @return {Object}
     */
    function _group(items) {
        var result = {};
        _.forEach(items, function (item) {
            var group = item['group'];
            result[group] = result[group] || [];
            result[group].push(item);
        });
        return result;
    }

    // ------------------------------------------------------------------------
    //                      SKILLS
    // ------------------------------------------------------------------------

    function _initSkills(items) {
        if (_.isArray(items) && items.length > 0) {
            var data = _group(items);
            //-- creates accordion --//
            var $parent = $('#skills');
            var i = 0;
            var ac_html = '';
            _.forEach(data, function (data_array, title) {
                if (_.isArray(data_array)) {
                    // console.log(data_array);
                    var ac_item = {
                        title: title,
                        description: _createSkillItems(data_array),
                        selected: false // i === 0
                    };
                    ac_html += _createSkillAccordion(ac_item);
                }
                i++;
            });
            $parent.append(ac_html);

        } else {
            // hide box
            $('#box_skills').hide();
        }
    }

    function _createSkillAccordion(accordion) {
        var selected = false; // accordion.selected
        var html_selected = 'aria-selected="false"'; // (selected ? 'aria-selected="true"' : 'aria-selected="false"')
        var tpl = '<h3 ' + html_selected + '> ' +
            '{title}</h3> ' +
            '<div>{description}</div>';
        return ly.template(tpl, accordion);
    }

    function _createSkillItems(items) {
        var tpl = '<p><div style="min-height: 50px;vertical-align: middle;width: 100%;">' +
            '<span class="badge badge-info">{!!name?name:description}</span>' +
            '<img style="float: right; max-height: 1em;" src="../../assets/img/stars/{stars>0?stars:\'empty\'}.png">' +
            '</div>' +
            '<div ></div></p>';
        var html = '';
        if (_.isArray(items)) {
            _.forEach(items, function (item) {
                item.stars = Math.ceil((parseInt(item.value) / 10) * 5);
                html += ly.template(tpl, item);
            });
        }
        return html;
    }

    // ------------------------------------------------------------------------
    //                      PORTFOLIO
    // ------------------------------------------------------------------------

    function _initPortfolio(items) {
        if (_.isArray(items) && items.length > 0) {
            var data = _group(items);
            //-- creates carousel --//
            var $parent = $('#portfolio');
            var ac_html = '';
            _.forEach(data, function (data_array, title) {
                if (_.isArray(data_array)) {
                    // console.log(title);
                    var ac_item = {
                        title: title,
                        content: _createPortfolioItems(data_array)
                    };
                    ac_html += _createPortfolio(ac_item, data_array.length);
                }
            });
            $parent.append(ac_html);
        } else {
            // hide box
            $('#box_portfolio').hide();
        }
    }

    function _createPortfolioItems(items) {
        var tpl = '<div class="item {active}">' +
            '<img src="{image}" alt="">' + //<a href="{url}"></a>
            '<div class="carousel-caption row-fluid">' +
            '<div class="span10">' +
            '<h4>{name}</h4>' +
            '<p>{description}</p>' +
            '</div>' +
            '<div class="span2">' +
            '<a class="btn btn-info btn-large" href="{url}">Link</a>' +
            '</div>' +
            '</div>' +
            '</div>';
        var html = '';
        if (_.isArray(items)) {
            _.forEach(items, function (item, index) {
                item.id = _.uniqueId('slide_');
                item.active = index === 0 ? 'active' : '';
                html += ly.template(tpl, item);
            });
        }

        return html;
    }


    function _createPortfolio(item, count) {
        item.id = item.id || _.uniqueId('');
        var tpl = '<h4>{title}</h4>';
        tpl += '<div id="{id}" class="carousel slide">';
        // indicators
        tpl += '<ol class="carousel-indicators">';
        for (var i = 0; i < count; i++) {
            tpl += '<li data-target="#{id}" data-slide-to="' + i + '" class="' + (i === 0 ? 'active' : '') + '"></li>';
        }
        tpl += '</ol>';
        // content and arrows
        tpl += '<div class="carousel-inner">{content}</div>' +
            '<a class="left carousel-control" href="#{id}" data-slide="prev">‹</a>' +
            '<a class="right carousel-control" href="#{id}" data-slide="next">›</a>' +
            '</div>';

        return ly.template(tpl, item);
    }


    // ------------------------------------------------------------------------
    //                      LINKS
    // ------------------------------------------------------------------------

    function _initLinks(items) {
        if (_.isArray(items) && items.length > 0) {
            var data = _group(items);
            //-- creates carousel --//
            var $parent = $('#links');
            var ac_html = '';
            _.forEach(data, function (data_array, title) {
                if (_.isArray(data_array)) {
                    // console.log(title);
                    var ac_item = {
                        title: title,
                        content: _createLinkItems(data_array)
                    };
                    ac_html += _createLink(ac_item);
                }
            });
            $parent.append(ac_html);
        } else {
            // hide box
            $('#box_links').hide();
        }
    }

    function _createLinkItems(items) {
        var tpl = '<div id="{id}" class="notices" style="cursor: pointer">' +
            '<div class="bg-color-lighten">' +
            '<div class="notice-icon"></div>' +
            '<div class="notice-image"><a href="{url}"><img class="photo" src="{image}"/></a></div>' +
            '<div class="notice-header fg-color-darken">{name}</div>' +
            '<div class="notice-text fg-color-blueDark">{description}</div>' +
            '</div>' +
            '</div>';
        var html = '';
        if (_.isArray(items)) {
            _.forEach(items, function (item) {
                item.id = _.uniqueId('link_');
                html += ly.template(tpl, item);
                $('#links').delegate('#' + item.id, 'click', function(){
                    location.href = item.url;
                    console.log(item.url);
                });
            });
        }
        return html;
    }

    function _createLink(item) {
        var tpl = '{content}';
        return ly.template(tpl, item);
    }

    // ------------------------------------------------------------------------
    //                      CONTACTS
    // ------------------------------------------------------------------------

    function _initContacts(items) {
        if (_.isArray(items) && items.length > 0) {
            var data = _group(items);
            //-- creates carousel --//
            var $parent = $('#contacts');
            var ac_html = '';
            _.forEach(data, function (data_array, title) {
                if (_.isArray(data_array)) {
                    // console.log(title);
                    var ac_item = {
                        title: title,
                        content: _createContactItems(data_array)
                    };
                    ac_html += _createContact(ac_item);
                }
            });
            $parent.append(ac_html);
        } else {
            // hide box
            $('#box_contacts').hide();
        }
    }

    function _createContactItems(items) {
        var tpl = '<div id="{id}" data-item="{url}" class="notices" style="cursor: pointer">' +
            '<div class="bg-color-orange">' +
            '<div class="notice-icon"><img style="height: 32px;" src="{image}"/></div>' +
            '<div class="notice-image"><img class="photo" src="{image}"/></div>' +
            '<div class="notice-header fg-color-darken">{name}</div>' +
            '<div class="notice-text fg-color-blueDark">{description}</div>' +
            '</div>' +
            '</div>';
        var html = '';
        if (_.isArray(items)) {
            _.forEach(items, function (item) {
                try {
                    item.id = _.uniqueId('contact_');
                    html += ly.template(tpl, item);
                    $('#contacts').delegate('#' + item.id, 'click', function () {
                        window.location.href = item.url;
                    });
                } catch (err) {
                    console.error(err);
                }
            });
        }
        return html;
    }

    function _createContact(item) {
        var tpl = '{content}';
        return ly.template(tpl, item);
    }

    // ------------------------------------------------------------------------
    //                      export
    // ------------------------------------------------------------------------

    ly.provide("app.Bootstrapper.loaded");
    app.Bootstrapper.loaded = loaded;

})(this, jQuery);
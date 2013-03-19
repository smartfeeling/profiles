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
        var tpl = '<h3 ' + (accordion.selected ? 'aria-selected="true"' : 'aria-selected="false"') + '> ' +
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
                    ac_html += _createPortfolio(ac_item);
                }
            });
            $parent.append(ac_html);
        } else {
            // hide box
            $('#box_portfolio').hide();
        }
    }

    function _createPortfolioItems(items) {
        var tpl = '<div id="{id}" class="slide image bg-color-grayDark">' +
            '<img src="{image}"/>' +
            '<div class="description">' +
            '<div class="notices">' +
            '<div class="bg-color-grayDark">' +
            '<div class="notice-icon"><a href="{url}"><img style="height: 32px;width: 32px;" src="../../assets/img/link.png"/></a></div>' +
            '<div class="notice-image"><img class="photo" src="{image}"/></div>' +
            '<div class="notice-header fg-color-lighten">{name}</div>' +
            '<div class="notice-text">{description}</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var html = '';
        if (_.isArray(items)) {
            _.forEach(items, function (item) {
                item.id = _.uniqueId('slide_');
                html += ly.template(tpl, item);
            });
        }
        return html;
    }


    function _createPortfolio(item) {
        var tpl = '<h3>{title}</h3>' +
            '<div  class="carousel" data-role="carousel" style="height: 300px; max-width: 400px; margin: auto;">' +
            '<div class="slides">{content}</div>' +
            '<span class="control right">›</span>' +
            '<span class="control left">‹</span>' +
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
        var tpl = '<div id="{id}" class="notices">' +
            '<div class="bg-color-lighten">' +
            '<div class="notice-icon"><a href="{url}"><img style="height: 32px;" src="../../assets/img/link.png"/></a></div>' +
            '<div class="notice-image"><img class="photo" src="{image}"/></div>' +
            '<div class="notice-header fg-color-darken">{name}</div>' +
            '<div class="notice-text fg-color-blueDark">{description}</div>' +
            '</div>' +
            '</div>';
        var html = '';
        if (_.isArray(items)) {
            _.forEach(items, function (item) {
                item.id = _.uniqueId('link_');
                html += ly.template(tpl, item);
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
        var tpl = '<div id="{id}" data-item="{url}" class="notices">' +
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
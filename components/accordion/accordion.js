/**
 * RADIO BEHAVIOUR
 * <section class="ac-container">
 *  <div>
 *      <input id="ac-1" name="accordion-1" type="radio" checked />
 *      <label for="ac-1">About us</label>
 *      <article class="ac-small">
 *          <p>Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows.</p>
 *      </article>
 * </div>
 * <div>
 *      <input id="ac-2" name="accordion-1" type="radio" />
 *      <label for="ac-2">How we work</label>
 *      <article class="ac-medium">
 *          <p>Like you, I used to think the world was this great place where everybody lived by the same standards I did, then some kid with a nail showed me I was living in his world, a world where chaos rules not order, a world where righteousness is not rewarded. That's Cesar's world, and if you're not willing to play by his rules, then you're gonna have to pay the price. </p>
 *      </article>
 * </div>
 </section>
 */
!(function () {

    var tpl_item = '<div>' +
        '<input id="{id}" name="{group}" type="radio" {checked} />' +
        '<label for="{id}">{title}</label>' +
        '<article class="ac-article">' +
        '{description}' +
        '</article>' +
        '</div>';

    function Accordion(selector) {
        this['selector'] = selector;
        this['name'] = _.uniqueId('ac_');

        //-- add style --//
        $(this['selector']).addClass('ac-container');
    }

    Accordion.prototype.init = function () {
        //-- initialize handlers --//
        _.bind(_initHandler, this)();
        //-- toggle selected --//
        _.bind(_toggle, this)(false);
    };

    /**
     *
     * @param item Object: { selected:true, title:'', description:'' }
     */
    Accordion.prototype.addItem = function(item){
        item.id = item.id || _.uniqueId(this['name']+'_');
        item.group = this['name'];
        item.checked = !!item.selected?'checked':'';
        item.title = item['title']||'TITLE is undefined';
        item.description = item['description']||'';

        var html = ly.template(tpl_item, item);
        $(this['selector']).append(html);
    };

    // ------------------------------------------------------------------------
    //                      private
    // ------------------------------------------------------------------------

    function _initHandler() {
        var self = this;
        $('.ac-container input').change(function (evt) {
            // console.log($(this).parent().find('article').html());
            _.bind(_toggle, self)(true);
        });
    }

    function _toggle(scroll) {
        var self = this;
        var $inputs = $('.ac-container input');
        $inputs.each(function (index, element) {
            var selected = ly.el.value(element);
            if (selected) {
                _.bind(_expand, self)(element, scroll);
            } else {
                _.bind(_collapse, self)(element);
            }
        });
    }

    function _expand(input, scroll) {
        var self = this;
        var $article = $(input).parent().children('article');
        $article.slideDown();
        if (!!scroll) {
            //ly.el.scrollTo($(input));
        }
    }

    function _collapse(input) {
        var $article = $(input).parent().children('article');
        $article.slideUp();
    }

    // ------------------------------------------------------------------------
    //                      export
    // ------------------------------------------------------------------------

    ly.provide("app.components.Accordion");
    app.components.Accordion = Accordion;

})();
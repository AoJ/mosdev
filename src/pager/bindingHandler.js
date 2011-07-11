/**
 * This bindinghandler renders the pager by simply using the "pagerTemplate" for now.
 */
ko.bindingHandlers["pager"] = {
    init: function(element, valueAccessor) {
        var data = valueAccessor();
        ko.renderTemplate(
            "pagerTemplate",
            data,
            {},
            element
        );
    }
};
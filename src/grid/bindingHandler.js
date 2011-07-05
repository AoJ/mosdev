/**
 * This bindinghandler renders the grid by simply using the "gridTemplate" for now.
 */
ko.bindingHandlers["grid"] = {
    init: function(element, valueAccessor) {
        var data = valueAccessor();
        ko.renderTemplate(
            "gridTemplate",
            data,
            {},
            element
        );
    }
};
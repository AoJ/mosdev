/**
 * This extender can be used to monitor observable arrays for changes of a specific type.
 * @param observableArray The observable array to monitor.
 * @param options Should contain "callback", the function to call with the changed items, and "status" which should be: "added", "deleted" or "retained".
 */
ko.extenders.change = function(observableArray, options) {
    var contents = observableArray().slice(0);
    observableArray.subscribe(function(newContents) {
        /**
         * Figure out what has changed in the array and make a copy of the contents for the next time.
         */
        var editScript = ko.utils.compareArrays(contents, newContents);
        contents = newContents.slice(0);

        /**
         * Find out which changes are relevant to the caller.
         */
        var relevantChanges = ko.utils.arrayFilter(editScript, function(change) {
            return change.status === options.status;
        });

        /**
         * Take the actual objects, which are stored in "value", from the change objects.
         */
        var items = ko.utils.arrayMap(relevantChanges, function(change) {
           return change.value;
        });

        /**
         * Notify the caller.
         */
        options.callback(items);
    });

    return observableArray;
};
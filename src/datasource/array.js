namespace("mos.dataSource");

/**
 * A datasource exposes two properties to the outside world:
 * (*) items, an observableArray of objects that represent a filtered subset of the original input "data" passed into the constructor
 * (*) view, a View object that specifies how to filter the data.
 */
mos.dataSource.array = Class.extend({
    init: function(data, options) {
        var _this = this;

        _this.view = ko.observable(new mos.dataSource.view({
            totalItems: data.length,
            start: 0,
            stop: data.length
        }));
        _this.items = ko.observableArray();

        /**
         * Every time the view changes, the "items" array will be re-evaluated.
         */
        ko.dependentObservable(function() {
            var view = _this.view();
            var subset;

            if (view.sorting.length) {
                var property = view.sorting[0].property;
                var order = view.sorting[0].order;

                subset = data.slice(0).sort(function(a, b) {
                    var compare = a[property] < b[property] ? -1 : 1;
                    if (order === "desc") compare = -compare;
                    return compare;
                });
            } else {
                subset = data;
            }
            subset = subset.slice(view.start, view.stop);
            _this.items(subset);
        })
    }
});
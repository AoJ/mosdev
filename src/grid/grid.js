/**
 * The main grid class.
 */
mos.grid = Class.extend({
    init: function() {
        var _this = this;

        /**
         * The rows of the grid. Should not be altered in any way by the grid itself.
         */
        _this.rows = ko.observableArray();

        /**
         * The column definitions (mos.grid.column). Used to configure which data is rendered into each column.
         */
        _this.columns = ko.observableArray();

        /**
         * This function converts a single rowData in an array of columns that can be rendered.
         * @param row The row that should be converted.
         */
        _this.cellData = function(row) {
            var result = [];
            ko.utils.arrayForEach(_this.columns(), function(column) {
                result.push({
                    displayValue: row[column.property()]
                });
            });
            return result;
        };
    }
});

/**
 * Contains all the necessary information to render one column.
 */
mos.grid.column = Class.extend({
    init: function(options) {
        var _this = this;

        _this.title = ko.observable(options.title);
        _this.property = ko.observable(options.property);
    }
});

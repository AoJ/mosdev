/**
 * The main grid class.
 */
mos.grid = Class.extend({
    init: function(options) {
        var _this = this;

        options = options || {};
        options.rows = options.rows || ko.observableArray();

        /**
         * The rows of the grid. Should not be altered in any way by the grid itself.
         */
        _this.rows = options.rows;

        /**
         * The column definitions (mos.grid.column). Used to configure which data is rendered into each column.
         */
        _this.columns = ko.observableArray();

        /**
         * This function converts a single rowData in an array of columns that can be rendered.
         * @param row The row that should be converted.
         */
        var getCellData = function(row) {
            var result = [];
            ko.utils.arrayForEach(_this.columns(), function(column) {
                result.push(new mos.grid.cell(row, column));
            });
            return result;
        };

        /**
         * displayRows contains the row-data converted into data the grid will display.
         * Every item in this array represents a row, containing another array with all the cells.
         */
        _this.displayRows = ko.observableArray();

        /**
         * This anonymous dependent observable recalculates all "displayRows" every time one of its
         * dependencies changes. This is a good candidate for optimization later.
         */
        ko.dependentObservable(function() {
            var newDisplayRows = [];
            ko.utils.arrayForEach(_this.rows(), function(row) {
                newDisplayRows.push(getCellData(row));
            });
            _this.displayRows(newDisplayRows);
        });
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

/**
 * One cell in the grid
 */
mos.grid.cell = Class.extend({
    init: function(row, column) {
        var _this = this;

        /**
         * The value that will actually be displayed (i.e. completely formatted)
         */
        _this.displayValue = row[column.property()];
    }
});
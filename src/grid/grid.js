namespace("mos.grid");

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
         * For every column that is added to the "columns" array, subscribe to certain events.
         */
        _this.columns = _this.columns.extend({
            change: {
                callback: function(columns) {
                    ko.utils.arrayForEach(columns, function(column) {

                        /**
                         * Subscribe to changes to "order", so whenever a column's sorting changes, that becomes our new sortColumn.
                         */
                        column.order.subscribe(function(order) {
                            if (!order) return;

                            /**
                             * Previous sortcolumns should be cleared.
                             */
                            ko.utils.arrayForEach(_this.sortStatus(), function(status) {
                                var otherColumn = _this.columns()[status.columnIndex];
                                if (otherColumn != column) {
                                    otherColumn.order(null);
                                };
                            });

                            /**
                             * For now, we only support a single sortColumn, so overwrite the array.
                             */
                            _this.sortStatus([
                                {
                                    columnIndex: ko.utils.arrayIndexOf(_this.columns(), column),
                                    property: column.property(),
                                    order: column.order()
                                }
                            ]);
                        });
                    });
                },
                status: "added"
            }
        });

        /**
         * This array contains information about the columns that are currently used for sorting.
         * The array items copy the "columnIndex", "property" and "order" from the column.
         * The reason these properties are copied are so that they can be safely used in dependentObservables outside of the grid, without
         * creating unnecessary subscriptions.
         */
        _this.sortStatus = ko.observableArray();

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

        /**
         * Are we sorting on this column? Falsey if not, otherwise "asc" or "desc" to specify sort direction.
         */
        _this.order = ko.observable();

        /**
         * Toggle sorting on this column
         */
        _this.toggleSort = function() {
            var currentSort = _this.order();
            if (!currentSort) {
                _this.order("asc");
                return;
            }

            _this.order(currentSort == "asc" ? "desc" : "asc");
        };
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
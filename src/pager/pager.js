namespace("mos.pager");

/**
 * The pager is a class that provides pager functionality. Provided with "totalItems" and "itemsPerPage", the pager will
 * allow the user to navigate back and forward through the appropriate number of pages.
 */
mos.pager = Class.extend({
    init: function(options) {
        var _this = this;

        /**
         * Set default options.
         */
        options = options || {};
        options.totalItems = options.totalItems || 0;
        options.itemsPerPage = options.itemsPerPage || 10;

        _this.currentPage = ko.observable(1);
        _this.totalItems = ko.observable(options.totalItems);
        _this.itemsPerPage = ko.observable(options.itemsPerPage);

        _this.totalPages = ko.dependentObservable(function() {
            return Math.ceil(_this.totalItems() / _this.itemsPerPage());
        });

        _this.canGoBack = ko.dependentObservable(function() {
            return _this.currentPage() > 1;
        });
        _this.canGoForward = ko.dependentObservable(function() {
            return _this.currentPage() < _this.totalPages();
        });

        _this.first = function() {
            _this.currentPage(1);
        };
        _this.previous = function() {
            _this.currentPage(_this.currentPage() - 1);
        };
        _this.next = function() {
            _this.currentPage(_this.currentPage() + 1);
        };
        _this.last = function() {
            _this.currentPage(_this.totalPages());
        };
        _this.canGotoPage = function(page) {
            return page != _this.currentPage();
        };

        _this.gotoPage = function(page) {
            _this.currentPage(page);
        };

        /**
         * The number of navigation pages to show in the UI (ie. buttons saying [1] [2] [3] [4] [5] etc.)
         */
        _this.totalNavigationPages = ko.observable(5);

        /**
         * The actual navigation pages array, which is just an array of page numbers.
         * It will try to keep the current page in the center of the array.
         */
        _this.navigationPages = ko.dependentObservable(function() {
            var pages = [];
            var total = _this.totalNavigationPages();
            var currentPage = _this.currentPage();

            // If we have 5 pages to show, let's make sure the "current page" is in the middle.
            // We do this by going backward a certain amount of pages.
            currentPage -= Math.floor(total / 2);

            // We also don't want to overrun, and make sure the rightmost page is never higher than the total
            // amount of pages there is.
            if (currentPage + total > _this.totalPages()) currentPage -= (currentPage + total - _this.totalPages() - 1);

            // Clamp
            if (currentPage < 1) currentPage = 1;

            while (total--) {
                 pages.push(currentPage++);
            };

            return pages;
        });
    }
});
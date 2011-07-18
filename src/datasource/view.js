namespace("mos.dataSource");

mos.dataSource.view = Class.extend({
   init: function(options) {
       var _this = this;

       var options = options || {};
       _this.totalItems = options.totalItems || 0;
       _this.start = options.start || 0;
       _this.stop = options.stop || 0;
       _this.sorting = options.sorting || [];
   }
});
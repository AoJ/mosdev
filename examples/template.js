document.write('\
<!-- The main grid template -->\
<script type="text/html" id="gridTemplate">\
    <table>\
        <thead>\
        <tr data-bind="template: { name: \'gridHeaderColumnTemplate\', foreach: columns }">\
        </tr>\
        </thead>\
        <tbody data-bind="template: { name: \'gridRowTemplate\', foreach: displayRows }">\
        </tbody>\
    </table>\
</script>\
\
<!-- The template for every grid header -->\
<script type="text/html" id="gridHeaderColumnTemplate">\
    <th data-bind="click: toggleSort">\
        <span data-bind="text: title"></span>\
        <span data-bind="text: order"></span>\
    </th>\
</script>\
\
<!-- The template for every row -->\
<script type="text/html" id="gridRowTemplate">\
    <tr data-bind="template: { name: \'gridCellTemplate\', foreach: $data }">\
    </tr>\
</script>\
\
<!-- The template for every cell in a row -->\
<script type="text/html" id="gridCellTemplate">\
    <td>{{= displayValue }}</td>\
</script>\
\
<!-- The template for the pager -->\
<script type="text/html" id="pagerTemplate">\
    <div>\
        <button data-bind="click: first, enable: canGoBack">&lt;&lt;</button>\
        <button data-bind="click: previous, enable: canGoBack">&lt;</button>\
        <span data-bind="template: { foreach: navigationPages, name: \'pagerPageTemplate\', templateOptions: { pager: $data } }">\
        </span>\
        <button data-bind="click: next, enable: canGoForward">&gt;</button>\
        <button data-bind="click: last, enable: canGoForward">&gt;&gt;</button>\
    </div>\
</script>\
\
<script type="text/html" id="pagerPageTemplate">\
    <button data-bind="click: function() { $item.pager.gotoPage($data); }, enable: $item.pager.canGotoPage($data)">\
        {{= $data }}\
    </button>\
</script>\
');
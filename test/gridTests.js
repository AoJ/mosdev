require(["grid/grid"], function(Grid) {
    describe("Grid", function() {
        it("can be constructed", function() {
            var grid = new Grid("bla");
            expect(grid.name).toBe("bla");
        });
    });
});

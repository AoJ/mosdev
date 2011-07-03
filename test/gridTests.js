describe("Grid", function() {
    it("can be constructed", function() {
        var grid = new mos.grid("bla");
        expect(grid.name).toBe("bla");
    });
});
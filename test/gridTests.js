describe("Grid", function() {
    var grid = new mos.grid();

    it("can be constructed with default options", function() {
        expect(grid).not.toBe(undefined);
    });

    // This spec shows up as being "skipped", even though "can be added" is run.
    describe("Rows", function() {
        it("can be added", function() {
            grid.rows.push({ a: "a" });
        });
    });
});
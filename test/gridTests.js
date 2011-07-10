describe("Grid", function() {
    beforeEach(function() {
        this.grid = new mos.grid();
    });

    it("can be constructed with default options", function() {
        expect(this.grid).not.toBe(undefined);
    });

    describe("Adding a row", function() {
        beforeEach(function() {
            this.grid.rows.push({ a: "a" });
        });

        it("can be done", function() {
            expect(this.grid.rows()[0]).toEqual({ a: "a" });
        });
    });

    describe("After adding a row and a column, DisplayRows", function() {
        beforeEach(function() {
            this.grid.rows.push({ a: "a_value", b: "b_value" });
            this.grid.columns.push(new mos.grid.column({
                property: "b"
            }));
        });

        it("match the number of rows", function() {
            expect(this.grid.displayRows().length).toBe(1);
        });

        // There is no "toBeInstanceOf" yet
        xit("contain cells", function() {
            expect(this.grid.displayRows()[0][0]).toBeInstanceOf("cell");
        });

        it("contain the correct property of a row", function() {
            expect(this.grid.displayRows()[0][0].displayValue).toBe("b_value");
        });
    });
});
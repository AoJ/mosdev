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

    describe("Adding a row and a column, DisplayRows", function() {
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

    describe("Adding two rows and two columns", function() {
        beforeEach(function() {
            this.grid.rows.push({ a: "a1", b: "b1" });
            this.grid.rows.push({ a: "a2", b: "b2" });
            this.grid.columns.push(new mos.grid.column({
                property: "a"
            }));
            this.grid.columns.push(new mos.grid.column({
                property: "b"
            }));
        });

        it("initially has no sorting", function() {
            expect(this.grid.sortStatus().length).toBe(0);
        });

        describe("Sorting on the first column", function() {
            beforeEach(function() {
                this.grid.columns()[0].toggleSort();
            });

            it("has one sort column", function() {
                expect(this.grid.sortStatus().length).toBe(1);
            });

            it("has sorting on the first column", function() {
                expect(this.grid.sortStatus()[0].columnIndex).toBe(0);
            });

            it("has sorting on property 'a'", function() {
                expect(this.grid.sortStatus()[0].property).toBe("a");
            });

            it("has ascending sorting", function() {
                expect(this.grid.sortStatus()[0].order).toBe("asc");
            });
        });
    });
});
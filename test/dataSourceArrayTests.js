describe("DataSource.Array", function() {
    beforeEach(function() {
        this.data = [
            { id: 1, a: "a5" },
            { id: 2, a: "a4" }
        ];
        this.dataSource = new mos.dataSource.array(this.data);
    });

    it("should return the original array", function() {
        expect(this.dataSource.items()).toEqual(this.data);
    });

    describe("When selecting the last item", function() {
        beforeEach(function() {
            var view = this.dataSource.view();
            view.start = 1;
            view.stop = 2;
            this.dataSource.view(view);
        });

        it("should return 1 item", function() {
            expect(this.dataSource.items().length).toEqual(1);
        });

        it("should return the last item", function() {
            expect(this.dataSource.items()[0]).toEqual({ id: 2, a: "a4" });
        });
    });

    describe("When sorting DESC on the id column", function() {
        beforeEach(function() {
            var view = this.dataSource.view();
            view.sorting = [
                {
                    property: "id",
                    order: "desc"
                }
            ];
            this.dataSource.view(view);
        });

        it("should return 2 items", function() {
            expect(this.dataSource.items().length).toEqual(2);
        });

        it("should return the reversed original data", function() {
            expect(this.dataSource.items()).toEqual(this.data.reverse());
        });
    })

    describe("When sorting ASC on the a column", function() {
        beforeEach(function() {
            var view = this.dataSource.view();
            view.sorting = [
                {
                    property: "a"
                }
            ];
            this.dataSource.view(view);
        });

        it("should return 2 items", function() {
            expect(this.dataSource.items().length).toEqual(2);
        });

        it("should return the reversed original data", function() {
            expect(this.dataSource.items()).toEqual(this.data.reverse());
        });
    })
});
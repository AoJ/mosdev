describe("Pager", function() {
    beforeEach(function() {
        this.pager = new mos.pager();
    });

    it("defaults to showing 0 pages", function() {
        expect(this.pager.totalPages()).toBe(0);
    });

    it("defaults to showing 10 items per page", function() {
        expect(this.pager.itemsPerPage()).toBe(10);
    });

    describe("100 items", function() {
        beforeEach(function() {
            this.pager.totalItems(100);
        });

        it("defaults to 10 pages", function() {
            expect(this.pager.totalPages()).toBe(10);
        });

        it("defaults to page 1", function() {
            expect(this.pager.currentPage()).toBe(1);
        });

        describe("The first page", function() {
            beforeEach(function() {
                this.pager.currentPage(1);
            });

            it("Allows navigation to next page", function() {
                expect(this.pager.canGoForward()).toBe(true);
            });

            it("Disallows navigation to previous page", function() {
                expect(this.pager.canGoBack()).toBe(false);
            });

            it("Allows navigation to page 10", function() {
                expect(this.pager.canGotoPage(10)).toBe(true);
            });

            it("Disallows navigation to page 1", function() {
                expect(this.pager.canGotoPage(1)).toBe(false);
            });

            it("Shows 5 navigation pages, starting with 1", function() {
                expect(this.pager.navigationPages()).toEqual([1, 2, 3, 4, 5]);
            });

            describe("Go to last page", function() {
                beforeEach(function() {
                    this.pager.last();
                });

                it("Goes to the lat page", function() {
                    expect(this.pager.currentPage()).toBe(10);
                });
            });
        });

        describe("The last page", function() {
            beforeEach(function() {
                this.pager.currentPage(10);
            });

            it("Disallows navigation to next page", function() {
                expect(this.pager.canGoForward()).toBe(false);
            });

            it("Allows navigation to previous page", function() {
                expect(this.pager.canGoBack()).toBe(true);
            });

            it("Disallows navigation to page 10", function() {
                expect(this.pager.canGotoPage(10)).toBe(false);
            });

            it("Allows navigation to page 1", function() {
                expect(this.pager.canGotoPage(1)).toBe(true);
            });

            it("Shows 5 navigation pages, ending with 10", function() {
                expect(this.pager.navigationPages()).toEqual([6, 7, 8, 9, 10]);
            });

            describe("Go to first page", function() {
                beforeEach(function() {
                    this.pager.first();
                });

                it("Goes to the first page", function() {
                    expect(this.pager.currentPage()).toBe(1);
                });
            });
        });

    });
});
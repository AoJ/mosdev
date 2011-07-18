var createPeopleData = function(amount) {
    var people = [];
    var firstNames = ["Alice", "Bob", "Charles", "Dick", "Elmer", "Fred", "Ginger", "Hank", "Iris", "Jack", "Katherine", "Leo", "Melissa", "Nico", "Oliver", "Priscilla", "Quan", "Rebecca", "Simon", "Tallulah", "Victor", "William", "Xavier", "Yasmine", "Zach"];
    var lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Andersom", "Thomas", "Garcia"];
    var trees = ["Oak", "Pine", "Maple", "Cedar", "Elm"];
    var features = ["Park", "View", "Lake", "Hill"];
    Array.prototype.randomItem = function() {
      return this[Math.floor(Math.random() * this.length)];
    };
    for (var t = 1; t <= amount; t++) {
        var name = firstNames.randomItem() + " " + lastNames.randomItem();
        var address = 50 * Math.floor(1 + Math.random() * 100) + " " + trees.randomItem() + " " + features.randomItem();
        people.push({
            name: name,
            address: address
        });
    }
    return people;    
};
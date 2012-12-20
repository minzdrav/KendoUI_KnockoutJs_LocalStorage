var ViewModel = function () {
    var self = this;
    self.items = ko.observableArray([]);
    self.id = ko.observable(null);
    self.addItem = function (id, name) {
        self.items.push(new Item(id, name));
    };
    self.clearItems = function () {
        self.items([]);
        self.id(null);
    };
    self.updateList = function() {
        $.ajax({
            url: '/home/getdata/',
            type: "POST",
            dataType: "json",
            data: {
                lastId: self.id()
            },
            success: function(response) {
                for (var i = 0; i < response.length; i++) {
                    self.addItem(response[i].Id, response[i].Name);
                    self.id(response[i].Id);
                }
                localStorage.items = JSON.stringify(self.items());
                localStorage.lastId = JSON.stringify(self.id());
                
                setTimeout(function() {
                    self.updateList();
                }, 2000);
            }
        });
    };

    var restoreFromLocalStorage = function() {
        var restoreItems = localStorage.items;
        if (restoreItems != null) {
            var parsedData = JSON.parse(restoreItems);
            for (var i = 0; i < parsedData.length; i++) {
                self.items.push(new Item(parsedData[i].id, parsedData[i].name));
            }
        }
        var restoreId = localStorage.lastId;
        if (restoreId != null) {
            var id = JSON.parse(restoreId);
            self.id(id);
        }
    };
    
    restoreFromLocalStorage();
    setTimeout(function () {
        self.updateList();
    }, 1000);
};

ko.applyBindings(new ViewModel());
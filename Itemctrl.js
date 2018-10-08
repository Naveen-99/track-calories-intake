//-------- Item controller

const Itemctrl = (function() {
  // item constructor
  const item = function(id, name, calories) {
    this.name = name;
    this.id = id;
    this.calories = calories;
  };

  // Data Structure or state
  const Data = {
    items: StorageCtrl.getItemFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  // public methods, availabe out of the function(globally)
  return {
    logItems: function() {
      return Data.items;
    },
    addItem: function(name, calories) {
      // create a unique id for each item
      let ID;
      if (Data.items.length > 0) {
        ID = Data.items[Data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // parse calories to integer
      calories = parseInt(calories);

      // create new item
      newItem = new item(ID, name, calories);

      // add to items array
      Data.items.push(newItem);

      return newItem;
    },
    updateItem: function(name, calories) {
      // parse the calories as its comming from the form
      calories = parseInt(calories);

      let found = null;
      Data.items.forEach(item => {
        if (item.id === Data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id) {
      // get all the ids
      const ids = Data.items.map(item => {
        return item.id;
      });

      // get index
      const index = ids.indexOf(id);

      // remove item
      Data.items.splice(index, 1);
    },
    clearAllItems: function() {
      Data.items = [];
    },
    getTotalcalories: function() {
      let total = 0;

      //loop through the items and get calories
      Data.items.forEach(item => {
        total += item.calories;
      });

      // set total calories in datastructure
      Data.totalCalories = total;

      // rturn total calories
      return Data.totalCalories;
    },
    getItemById: function(id) {
      let found = null;
      Data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function(item) {
      Data.currentItem = item;
    },
    getCurrentItem: function() {
      return Data.currentItem;
    },
    logData: function() {
      return Data;
    }
  };
})();

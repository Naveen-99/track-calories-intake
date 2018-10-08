//------- storage controller
const StorageCtrl = (function() {
  //public methods
  return {
    storeItem: function(item) {
      const items = this.getItemFromStorage();

      // set new item into the array
      items.push(item);

      // set the local storage
      localStorage.setItem("items", JSON.stringify(items));
    },
    getItemFromStorage: function() {
      let items;

      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }

      return items;
    },
    updateLocalstorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (item.id === updatedItem.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteFromLocalStorage: function(id) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (item.id === id) {
          items.splice(index, 1);
        }
      });

      localStorage.setItem("items", JSON.stringify(items));
    },
    clearAllFromLocalStorage: function() {
      localStorage.removeItem("items");
    }
  };
})();

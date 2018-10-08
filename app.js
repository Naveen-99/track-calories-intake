const App = (function() {
  const loadEventListener = function() {
    // get ui selectors
    const selector = UIctrl.getSelectors();
    // add even for add meal button
    document
      .querySelector(selector.addBtn)
      .addEventListener("click", itemAddSubmit);
    // disable update button when press enter
    document.addEventListener("keypress", e => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    // add click event for edit icon
    document
      .querySelector(selector.itemlist)
      .addEventListener("click", itemEditClick);

    // click event for update button
    document
      .querySelector(selector.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // click event for delete button
    document
      .querySelector(selector.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // click event on back button
    document
      .querySelector(selector.backBtn)
      .addEventListener("click", UIctrl.beforeEditState);

    // click event on clearAll button
    document
      .querySelector(selector.clearBtn)
      .addEventListener("click", clearAllItems);
  };
  // add item event
  const itemAddSubmit = function(e) {
    // get form input from ui ctrl
    const input = UIctrl.getFormInput();

    if (input.name !== "" && input.calories !== "") {
      // add item
      const newitem = Itemctrl.addItem(input.name, input.calories);
      // add new item to list
      UIctrl.addListItem(newitem);
      // get total calories
      const totalCalories = Itemctrl.getTotalcalories();
      // display total calories
      UIctrl.showtotalcalories(totalCalories);

      // add item to local storage
      StorageCtrl.storeItem(newitem);
      // clear input fields
      UIctrl.clearInput();
    }
    e.preventDefault();
  };

  // update item submit
  const itemEditClick = function(e) {
    if (e.target.classList.contains("edit-item")) {
      // get list item id to edit the item(item-0, item-1...)
      const listId = e.target.parentElement.parentElement.id;

      // split the listid to get the number
      const listIdArr = listId.split("-");

      // get the actual id
      const id = parseInt(listIdArr[1]);

      // get item to edit
      const itemToEdit = Itemctrl.getItemById(id);

      // set current item = item to edit
      Itemctrl.setCurrentItem(itemToEdit);

      // add item to the form to edit
      UIctrl.addItemToForm();
    }
  };

  const itemUpdateSubmit = function(e) {
    // get iteminput
    const input = UIctrl.getFormInput();
    // update item
    const updatedItem = Itemctrl.updateItem(input.name, input.calories);
    // update item in the list
    UIctrl.updateListItem(updatedItem);
    // get total calories
    const totalCalories = Itemctrl.getTotalcalories();
    // display total calories
    UIctrl.showtotalcalories(totalCalories);
    // update localstorage
    StorageCtrl.updateLocalstorage(updatedItem);

    UIctrl.beforeEditState();
    e.preventDefault();
  };

  const itemDeleteSubmit = function(e) {
    // get current item
    const currentItem = Itemctrl.getCurrentItem();

    // delete from the datastructure
    Itemctrl.deleteItem(currentItem.id);

    // delete from the ui
    UIctrl.removeItem(currentItem.id);

    // get total calories
    const totalCalories = Itemctrl.getTotalcalories();

    // display total calories
    UIctrl.showtotalcalories(totalCalories);

    // clear from local storage
    StorageCtrl.deleteFromLocalStorage(currentItem.id);

    UIctrl.beforeEditState();

    e.preventDefault();
  };

  const clearAllItems = function() {
    // clear items from data structure
    Itemctrl.clearAllItems();

    // get total calories
    const totalCalories = Itemctrl.getTotalcalories();
    // display total calories
    UIctrl.showtotalcalories(totalCalories);

    // clear items from ui
    UIctrl.clearItems();

    // clear all from ls
    StorageCtrl.clearAllFromLocalStorage();

    UIctrl.hideList();
  };

  // public methods, availabe out of the function(globally)
  return {
    init: function() {
      // clear edit stae | set initial state
      UIctrl.beforeEditState();

      // fetch data from itemctrl
      const foods = Itemctrl.logItems();

      // check if any items exists
      if (foods.length === 0) {
        UIctrl.hideList();
      } else {
        // populate the uictrl to add items to the list
        UIctrl.populateitems(foods);
      }

      // get total calories
      const totalCalories = Itemctrl.getTotalcalories();
      // display total calories
      UIctrl.showtotalcalories(totalCalories);
      // call eventlistener
      loadEventListener();
    }
  };
})();

console.log(App);

App.init();

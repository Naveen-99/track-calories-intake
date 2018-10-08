//------- UI controller

const UIctrl = (function() {
  const UISelectors = {
    itemlist: "#item-list",
    itemsList: "#item-list li",
    addBtn: ".add-btn",
    deleteBtn: ".delete-btn",
    updateBtn: ".update-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    mealInput: "#item-name",
    mealCalories: "#item-calories",
    totalCalories: ".total-calories"
  };

  return {
    populateitems: function(foods) {
      let html = "";
      foods.forEach(food => {
        html += ` <li class="collection-item" id="item-${food.id}">
                <strong>${food.name}: </strong> <em>${
          food.calories
        } Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
      });
      document.querySelector(UISelectors.itemlist).innerHTML = html;
    },
    getFormInput: function() {
      return {
        name: document.querySelector(UISelectors.mealInput).value,
        calories: document.querySelector(UISelectors.mealCalories).value
      };
    },
    addListItem: function(item) {
      document.querySelector(UISelectors.itemlist).style.display = "block";

      // create li element
      const li = document.createElement("li");
      // add class
      li.className = "collection-item";
      // add id
      li.id = `item-${item.id}`;
      // add html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${
        item.calories
      } Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>`;
      // insert item
      document
        .querySelector(UISelectors.itemlist)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: function(item) {
      let listitems = document.querySelectorAll(UISelectors.itemsList);

      //conver nodelist into array
      listitems = Array.from(listitems);
      // loop through the listitems array
      listitems.forEach(listitem => {
        const itemId = listitem.getAttribute("id");

        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${
            item.name
          }: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>`;
        }
      });
    },
    removeItem: function(id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    clearItems: function() {
      let listitems = document.querySelectorAll(UISelectors.itemsList);

      listitems = Array.from(listitems);

      listitems.forEach(item => {
        item.remove();
      });
    },
    showtotalcalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearInput: function() {
      document.querySelector(UISelectors.mealInput).value = "";
      document.querySelector(UISelectors.mealCalories).value = "";
    },
    addItemToForm: function() {
      document.querySelector(
        UISelectors.mealInput
      ).value = Itemctrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.mealCalories
      ).value = Itemctrl.getCurrentItem().calories;
      UIctrl.showEditstate();
    },
    hideList: function() {
      document.querySelector(UISelectors.itemlist).style.display = "none";
    },
    beforeEditState: function() {
      UIctrl.clearInput();
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditstate: function() {
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

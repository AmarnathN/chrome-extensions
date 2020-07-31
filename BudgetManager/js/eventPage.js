var contextMenu = {
  id: "spendMoney",
  title: "AddSpend",
  contexts: ["selection"],
};

chrome.contextMenus.create(contextMenu);

function isInt(val) {
  var check = !isNaN(val) && parseInt(Number(val)) == val && !isNaN(parseInt(val, 10));
  return check;
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
    if (isInt(clickData.selectionText)) {
      chrome.storage.sync.get(["total", "limit"], function (budget) {
        var newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({ total: newTotal }, function () {
          if (newTotal >= budget.limit) {
            var notificationsOptions = {
              type: "basic",
              iconUrl: "icons/icon128.png",
              title: "Limit Reached",
              message: "Looks like the limit is Reached",
            };
            chrome.notifications.create("limitNotif", notificationsOptions);
            chrome.notifications.clear("limitNotif");
          }
        });
      });
    } else {
      var errorOptions = {
        type: "basic",
        iconUrl: "icons/icon128.png",
        title: "Not a Integer",
        message: `"${clickData.selectionText}" , is Not a Integer. Please select Integer`,
      };
      chrome.notifications.create("nanNotif", errorOptions);
      chrome.notifications.clear("nanNotif");
    }
  }
});

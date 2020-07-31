$(function () {
  chrome.storage.sync.get(["total", "limit"], function (budget) {
    $("#total").text(budget.total);
    $("#limit").text(budget.limit);
  });
  $("#spentAmount").click(function () {
    chrome.storage.sync.get(["total", "limit"], function (budget) {
      var newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      var amount = $("#amount").val();
      if (amount) {
        newTotal += parseInt(amount);
      }
      chrome.storage.sync.set({ total: newTotal }, function () {
        if (amount && newTotal >= budget.limit) {
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

      $("#total").text(newTotal);
      $("#amount").val("");
    });
  });
});

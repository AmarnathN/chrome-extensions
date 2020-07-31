$(function () {
  chrome.storage.sync.get("limit", function (budget) {
    $("#limit").val(budget.limit);
  });
  $("#saveLimit").click(function () {
    var limit = $("#limit").val();
    if (limit) {
      chrome.storage.sync.set({ limit: limit }, function () {
        close();
      });
    }
  });

  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      var resetOptions = {
        type: "basic",
        iconUrl: "icons/icon128.png",
        title: "Total Reset",
        message: "Total has been reset to Zero",
      };
      chrome.notifications.create("resetNotif", resetOptions);
      chrome.notifications.clear("resetNotif");
    });
  });
});

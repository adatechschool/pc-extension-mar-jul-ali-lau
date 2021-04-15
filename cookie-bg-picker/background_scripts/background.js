/* Retrieve any previously set cookie and send to content script */
var dictionary = new Map();
function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

function cookieUpdate() {
  getActiveTab().then((tabs) => {
    // get any previously set cookie for the current tab
    var gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: "bgpicker",
    });
    gettingCookies.then((cookie) => {
      if (cookie) {
        var cookieVal = JSON.parse(cookie.value);
        browser.tabs.sendMessage(tabs[0].id, { image: cookieVal.image });
        browser.tabs.sendMessage(tabs[0].id, { color: cookieVal.color });
        dictionary.set("allumeuse", "🌸");
      }
    });
  });
}
console.log(dictionary);

// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);

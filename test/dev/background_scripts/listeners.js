import ctrl from './_actions'

console.log("import LISTENERS");

// tabs
browser.tabs.onActivated.addListener(ctrl.activatedListener);
browser.tabs.onUpdated.addListener(ctrl.updatedListener);

// pageAction
browser.pageAction.onClicked.addListener(ctrl.handleClick);
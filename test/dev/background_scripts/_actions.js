console.log("import ACTIONS");

let handleClick = function(tab){
    console.log("handleClick");
}

function activatedListener(info){
    console.log("activatedListener");
    browser.pageAction.show(info.tabId);
}

function updatedListener(tabId, info){
    console.log("updatedListener");
    browser.pageAction.show(tabId);
}

module.exports = {
    handleClick: handleClick,
    activatedListener: activatedListener,
    updatedListener: updatedListener
}
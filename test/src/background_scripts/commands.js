import ctrl from './_actions'

console.log("import COMMANDS");

browser.commands.onCommand.addListener(function(command) {
  if (command == "run") {
    browser.tabs.query({currentWindow: true, active: true}).then(
		function(tabs){
			for(let tab of tabs){
				ctrl.handleClick(tab);
				break;
			}
		}
	);
  }
});
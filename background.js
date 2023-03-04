chrome.commands.onCommand.addListener((command) => {
  if (command === 'send-continue-message') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'send-message' }, (response) => {
        console.log(response.message);
      });
    });
  }
});

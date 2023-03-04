function sendMessage() {
  const textarea = document.querySelector('textarea[tabindex="0"]');
  if (textarea) {
    textarea.focus();
    document.execCommand('insertText', false, '続き');
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true,
      cancelable: true,
    });
    textarea.dispatchEvent(event);
  }
}

window.addEventListener('load', () => {
  const button = document.createElement('button');
  button.innerText = '続き';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '9999';
  button.addEventListener('click', sendMessage);

  const body = document.body || document.documentElement;
  body.appendChild(button);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'send-message') {
    sendMessage();
    sendResponse({ message: 'メッセージを送信しました。' });
  }
});

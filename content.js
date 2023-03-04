import hotreload from 'crx-hotreload';

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
  const textarea = document.querySelector('textarea[tabindex="0"]');
  const textareaRect = textarea.getBoundingClientRect();

  const button = document.createElement('button');
  button.innerText = '続き';
  button.style.position = 'absolute';
  button.style.left = `${textareaRect.left + textarea.offsetWidth - 40}px`; // textareaの右側に配置する
  button.style.top = `${textareaRect.top - 40}px`; // textareaと同じ高さに配置する
  button.style.zIndex = '9999';

  const body = document.body || document.documentElement;
  body.appendChild(button);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'send-message') {
    sendMessage();
    sendResponse({ message: 'メッセージを送信しました。' });
  }
});

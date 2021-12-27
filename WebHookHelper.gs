const token = '2065838989:AAGZICmfIwS5zj9tlVlrgkxP-JCinM828Jc'; // Токен телеграм бота
const tgBotUrl = 'https://api.telegram.org/bot' + token; // бот юрл
const hookUrl = 'https://script.google.com/macros/s/AKfycbwncvPnOVdAUdQ81d_T6H1s1AYsXwJFTcjRTU7oIUMZUFIB_bcj/exec'; // мой хук
const sheetLogId = '1VP8PyxbuMns5BrIRK7Sg97E0LReip_-yJODr7JHx-bc'; // ид таблицы


function setWebHook() { // ВебХук
  let response = UrlFetchApp.fetch(tgBotUrl + "/setWebhook?url=" + hookUrl);
  Logger.log('telegram response status is ' + response.getResponseCode());
}

function getWebHook() {  // ВебХук получает уведомдение о событии. Так можно всегда обрабатывать сообщения от бота
  let response = UrlFetchApp.fetch(tgBotUrl + "/getWebhookInfo");
  if (response.getResponseCode() == 200) {
    let data = JSON.parse(response.getContentText())
    Logger.log('current webhook url is ' + data.result.url);
  } else {
    Logger.log('telegram response status is ' + response.getResponseCode());
  }
}

function doGet(e) { //получить
  return HtmlService.createHtmlOutput('hello');
}

function doPost(e) { // отправить сообщение
  let content = JSON.parse(e.postData.contents); // то что получил

  var text = content.message.text; // текст того что получил

  var file = SpreadsheetApp.openById(sheetLogId); // таблица
  var sheet = file.getSheets()[0]; //нужный лист

  var lastRow = sheet.getLastRow(); // получаю последнюю ячеку с информацией для цикла
  var studentGrate = ''; // для рейтинга

  for(var index = 1; index <= lastRow; index = index + 1) // прохожусь по всему столбку А
    {
      var studentName = sheet.getRange(index,1).getValue(); // получаю каждое имя
      if(studentName == text) // если совпало с тем что пришло от пользователя
        {
          studentGrate = sheet.getRange(index,2).getValue(); // присвоить рейтинг с соседнего столбца
        }
    }
  if(studentGrate == '') // для проверки если ничего не нашло
  {
      var finalText = 'Такого студента нет!';
  }
  else
  {
      var finalText = 'Рейтинг ' + text + ' - ' + studentGrate;
  }


  let payload = { //сообщение отпрвить
      chat_id: content.message.chat.id,
      text: finalText
    }

    sendMessage(payload); // отправить
    return HtmlService.createHtmlOutput();
 }

function saveMessage(message) {

}

function sendMessage(payload){ // отправить
  let options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  }
  return UrlFetchApp.fetch(tgBotUrl + "/sendMessage", options);
}

export function urlWinFormater(urlWin) {
  var text = ''
  text = urlWin.replaceAll('\\', '/');
  text = text.replaceAll('"', "");
  return text
}
export function firstChOfEachWord(str) {
  return str
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '')
    .toUpperCase()
}

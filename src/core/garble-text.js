import wordShift from "@/core/word-shift";

//Blatantly stolen code
export function makeGarbledTemplate(input) {
  const text = `${input}`;
  let garbled = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") garbled += " ";
    else {
      const n = text[i].charCodeAt();
      garbled += String.fromCharCode(33 + ((n * n + i * i) % 93));
    }
  }
  return garbled;
}

export function processText(unmodified, garbledTemplate, condition=false) {
  if(condition) return unmodified;
  const raw = wordShift.randomCrossWords(garbledTemplate);
  let modified = "";
  for (let i = 0; i < raw.length; i++) {
    if (garbledTemplate[i] === " ") modified += " ";
    else modified += raw[i];
  }
  return modified;
}
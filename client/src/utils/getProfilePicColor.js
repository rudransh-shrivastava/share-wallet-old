export default function getProfilePicColor(word) {
  let hue = 0;
  for (let index = 0; index < word.length; index++) {
    const char = word[index];
    hue += word.charCodeAt(index);
  }
  hue = hue % 360;
  return `hsl(${hue},35%,50%)`;
}

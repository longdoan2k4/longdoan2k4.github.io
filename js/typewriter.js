// Typewriter effect for hero subtitle
const words = ["Front-End Developer", "Student", "Ho Chi Minh City University of Technology"];
const typewriter = document.getElementById("typewriter");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typewriter) return;
  const current = words[wordIndex];
  if (isDeleting) {
    charIndex--;
    typewriter.textContent = current.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    } else {
  setTimeout(type, Math.floor(Math.random() * 20) + 25); // Xóa mượt hơn
    }
  } else {
    charIndex++;
    typewriter.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else {
  setTimeout(type, Math.floor(Math.random() * 30) + 70); // Gõ mượt hơn
    }
  }
}
if (typewriter) type();

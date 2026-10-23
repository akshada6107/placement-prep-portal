// practicals.js - plain JavaScript (no React) for practicals.html

// ---------- Practical 11: DOM manipulation + events ----------
const topicInput = document.getElementById('topicInput');
const topicList = document.getElementById('topicList');
const message = document.getElementById('message');

// Click "Add topic": validate, then create a new <li> and add it to the list
document.getElementById('addBtn').addEventListener('click', function () {
  const text = topicInput.value.trim();
  if (text.length < 2) {
    message.textContent = 'Topic must be at least 2 characters'; // textContent is safe from XSS
    return;
  }
  message.textContent = '';

  const li = document.createElement('li');
  li.textContent = text;
  // Click on a topic to cross it out (toggle a CSS class)
  li.addEventListener('click', function () {
    li.classList.toggle('done');
  });
  topicList.appendChild(li);
  topicInput.value = '';
});

// ---------- Practical 6: array functions ----------
const scores = [2, 5, 3, 4, 1];
const arrayOutput = document.getElementById('arrayOutput');

document.getElementById('scores').textContent = scores.join(', ');

// forEach-style loop result shown with reduce: add all numbers together
document.getElementById('total').textContent = scores.reduce(function (sum, s) {
  return sum + s;
}, 0);

// filter: keep only scores that are 3 or more
document.getElementById('passBtn').addEventListener('click', function () {
  arrayOutput.textContent = scores.filter((s) => s >= 3).join(', ');
});

// map: make a new array with each score written as "x / 10"
document.getElementById('doubleBtn').addEventListener('click', function () {
  arrayOutput.textContent = scores.map((s) => s + ' / 10').join(', ');
});

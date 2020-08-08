var quotes = ["Very little is needed to make a happy life; it is all within yourself, in your way of thinking - Marcus Aurelius",
              "The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius",
              "We suffer more often in imagination than in reality. - Seneca"]

function newQuote() {
  var randomNumber = Math.floor(Math.random() * (quotes.length));
  document.getElementById('quote').innerHTML = quotes[randomNumber];
}
newQuote();

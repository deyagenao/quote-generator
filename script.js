// Element variables 
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader')

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote 
function newQuote(){
  showLoadingSpinner();
  let {text, author} = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
   // Check quote length to determine style 
  text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
  quoteText.innerText= text;
  // Check for author
  author ? authorText.innerText= author : authorText.innerText = 'Unknown';
  hideLoadingSpinner();
}

// Get Quotes from API 
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error){
    // Error Handling
    console.log(error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// On Load
getQuotes();

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

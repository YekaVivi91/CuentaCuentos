let currentlySpeaking = false;
    
function speakText(text) {
  if (currentlySpeaking) {
    // Si ya se está hablando, detén la síntesis de voz actual
    window.speechSynthesis.cancel();
    currentlySpeaking = false;
  } else {
    // Si no se está hablando, inicia una nueva síntesis de voz
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'es-ES';
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    currentlySpeaking = true;
  }
}

function speakFocusedElement() {
  const focusedElement = document.activeElement;
  if (focusedElement && focusedElement.tagName !== 'BODY') {
    const text = focusedElement.innerText || focusedElement.value || focusedElement.alt || focusedElement.ariaLabel;
    if (text) {
      speakText(text);
    }
  }
}

function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
}

// Add event listener to read aloud focused elements and handle tab navigation
document.addEventListener('keydown', function(event) {
  if (event.key === 'Tab') {
    setTimeout(speakFocusedElement, 0);
  }
});

function filterStories() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const stories = document.querySelectorAll('.cuento-card');
  let found = false;
  
  stories.forEach(story => {
    const title = story.querySelector('.cuento-title').innerText.toLowerCase();
    if (title.includes(query)) {
      story.scrollIntoView({ behavior: 'smooth', block: 'start' });
      found = true;
    }
  });
  
  if (!found) {
    alert('Cuento no encontrado');
  }
}
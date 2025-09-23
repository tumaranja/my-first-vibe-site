// JavaScript used to set randomness for particles.
// Could be done via SSR

const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const PARTICLES = document.querySelectorAll('.particle')
PARTICLES.forEach(P => {
  P.setAttribute('style', `
    --x: ${RANDOM(20, 80)};
    --y: ${RANDOM(20, 80)};
    --duration: ${RANDOM(6, 20)};
    --delay: ${RANDOM(1, 10)};
    --alpha: ${RANDOM(40, 90) / 100};
    --origin-x: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
    --origin-y: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
    --size: ${RANDOM(40, 90) / 100};
  `)
})

// Fetch random sheep image on button click
document.querySelector('.sparkle-button button')?.addEventListener('click', async () => {
  const container = document.getElementById('sheep-container');
  
  // Show loading state
  container.innerHTML = '<p style="color: #c4b5fd; text-align: center;">Finding your sheep...</p>';
  
  try {
    // Using a sheep image API (this one provides random sheep images)
    const response = await fetch('https://api.unsplash.com/photos/random?query=sheep&client_id=YOUR_UNSPLASH_ACCESS_KEY');
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    const imageUrl = data.urls.regular;
    
    container.innerHTML = `
      <img src="${imageUrl}" 
           alt="Random sheep" 
           style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" 
           onerror="this.parentElement.innerHTML='<p style=\'color: #ff6b6b; text-align: center;\'>Failed to load sheep. Try again!</p>'">
    `;
  } catch (error) {
    // Fallback to a placeholder sheep image service
    const fallbackUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
    container.innerHTML = `
      <img src="${fallbackUrl}" 
           alt="Random sheep" 
           style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" 
           onerror="this.parentElement.innerHTML='<p style=\'color: #ff6b6b; text-align: center;\'>Failed to load sheep. Try again!</p>'">
    `;
  }
});



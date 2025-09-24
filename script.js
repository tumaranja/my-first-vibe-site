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

// Function to create a new particle
function createParticle() {
    const particlePen = document.querySelector('.particle-pen');
    const newParticle = document.createElement('svg');
    newParticle.className = 'particle';
    newParticle.setAttribute('viewBox', '0 0 15 15');
    newParticle.setAttribute('fill', 'none');
    newParticle.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Randomly choose one of the existing particle paths
    const paths = [
        'M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z',
        'M3.5 7.125L3.241 8.16C3.09267 8.7535 2.78579 9.2956 2.35319 9.7282C1.92059 10.1608 1.37853 10.4677 0.785 10.616L-0.25 10.875L0.785 11.134C1.37853 11.2823 1.92059 11.5892 2.35319 12.0218C2.78579 12.4544 3.09267 12.9965 3.241 13.59L3.5 14.625L3.759 13.59C3.90725 12.9966 4.21398 12.4546 4.64639 12.022C5.0788 11.5894 5.62065 11.2825 6.214 11.134L7.25 10.875L6.214 10.616C5.62065 10.4675 5.0788 10.1606 4.64639 9.728C4.21398 9.2954 3.90725 8.7534 3.759 8.16L3.5 7.125Z',
        'M3.25 2L3.053 2.5915C2.99777 2.75718 2.90472 2.90774 2.78123 3.03123C2.65774 3.15472 2.50718 3.24777 2.3415 3.303L1.75 3.5L2.3415 3.697C2.50718 3.75223 2.65774 3.84528 2.78123 3.96877C2.90472 4.09226 2.99777 4.24282 3.053 4.4085L3.25 5L3.447 4.4085C3.50223 4.24282 3.59528 4.09226 3.71877 3.96877C3.84226 3.84528 3.99282 3.75223 4.1585 3.697L4.75 3.5L4.1585 3.303C3.99282 3.24777 3.84226 3.15472 3.71877 3.03123C3.59528 2.90774 3.50223 2.75718 3.447 2.5915L3.25 2Z'
    ];
    
    const randomPath = paths[Math.floor(Math.random() * paths.length)];
    newParticle.innerHTML = `<path d="${randomPath}" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round" />`;
    
    // Start particles around the button (center area) and spread out
    const startX = RANDOM(40, 60); // Start around center
    const startY = RANDOM(40, 60); // Start around center
    const spreadX = RANDOM(0, 100); // Spread to anywhere
    const spreadY = RANDOM(0, 100); // Spread to anywhere
    
    newParticle.setAttribute('style', `
        --x: ${startX};
        --y: ${startY};
        --duration: ${RANDOM(2, 4)};
        --delay: 0;
        --alpha: 1;
        --origin-x: ${spreadX}%;
        --origin-y: ${spreadY}%;
        --size: ${RANDOM(50, 100) / 100};
        animation-play-state: running;
        opacity: 1;
    `);
    
    particlePen.appendChild(newParticle);
    
    // Fade out after 3 seconds
    setTimeout(() => {
        newParticle.style.transition = 'opacity 1s ease-out';
        newParticle.style.opacity = '0';
        setTimeout(() => {
            if (newParticle.parentNode) {
                newParticle.parentNode.removeChild(newParticle);
            }
        }, 1000);
    }, 3000);
}

// Button click handler - generate 50 stars around button
document.querySelector('.sparkle-button button')?.addEventListener('click', () => {
  // Generate exactly 50 new particles
  for (let i = 0; i < 50; i++) {
    setTimeout(() => createParticle(), i * 10); // Quick burst effect
  }
});



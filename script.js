// script.js
let currentGridSize = 16;
let isPainting = false;

// Initialize the grid when page loads
document.addEventListener('DOMContentLoaded', function() {
    createGrid(currentGridSize);
    setupNewGridButton();

    // Track mouse state globally
    document.body.addEventListener('mousedown', () => isPainting = true);
    document.body.addEventListener('mouseup', () => isPainting = false);
});

function createGrid(size) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    // Calculate square size based on container's computed size for responsiveness
    const containerSize = container.offsetWidth;
    const squareSize = containerSize / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.dataset.interactions = '0';

        // Paint on mouseenter (hover) only
        square.addEventListener('mouseenter', function() {
            handleSquareInteraction(this);
        });

        container.appendChild(square);
    }

    // Prevent default drag behavior
    container.onmousedown = (e) => e.preventDefault();

    console.log(`Grid created with ${size}x${size} squares`);
}

function handleSquareInteraction(square) {
    // Get current interaction count
    let interactions = parseInt(square.dataset.interactions);
    
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // Set random background color
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    
    // Progressive darkening effect (10% darker each interaction)
    interactions++;
    const opacity = Math.min(interactions * 0.1, 1); // Cap at 1 (fully opaque)
    
    // Create overlay for darkening effect
    square.style.position = 'relative';
    
    // Remove existing overlay if present
    const existingOverlay = square.querySelector('.darkening-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Add darkening overlay
    if (interactions <= 10) {
        const overlay = document.createElement('div');
        overlay.classList.add('darkening-overlay');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'black';
        overlay.style.opacity = (opacity * 0.7).toString(); // Make darkening more gradual
        overlay.style.pointerEvents = 'none';
        
        square.appendChild(overlay);
    }
    
    // Update interaction count
    square.dataset.interactions = interactions.toString();
    
    console.log(`Square interacted with ${interactions} times, opacity: ${opacity}`);
}

function setupNewGridButton() {
    const newGridBtn = document.getElementById('newGridBtn');
    
    newGridBtn.addEventListener('click', function() {
        let newSize = prompt('Enter the number of squares per side for the new grid (max 100):');
        
        // Validate input
        if (newSize === null) {
            // User cancelled
            return;
        }
        
        newSize = parseInt(newSize);
        
        if (isNaN(newSize) || newSize < 1 || newSize > 100) {
            alert('Please enter a valid number between 1 and 100.');
            return;
        }
        
        // Create new grid
        currentGridSize = newSize;
        createGrid(newSize);
        
        console.log(`New grid created: ${newSize}x${newSize}`);
    });
}
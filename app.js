// Initialize parking boxes (200 boxes, each can hold up to 10 cars)
let parkingBoxes = Array(200).fill().map(() => []); // 200 boxes, each empty initially

// Function to generate parking grid dynamically
document.addEventListener('DOMContentLoaded', () => {
    const parkingGrid = document.querySelector('.parking-grid');

    // Generate 200 parking boxes
    for (let i = 0; i < 200; i++) {
        const box = document.createElement('div');
        box.classList.add('parking-box');
        box.setAttribute('data-box', i + 1);  // Box number (1 to 200)
        box.innerHTML = `<p>Box ${i + 1}</p>`;
        parkingGrid.appendChild(box);
    }

    // Admin form for parking car
    const carEntryForm = document.getElementById('carEntryForm');
    carEntryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const boxNumber = document.getElementById('boxNumber').value - 1;
        const carNumber = document.getElementById('carNumber').value;

        // Check if the box is valid and not overfilled
        if (boxNumber < 0 || boxNumber > 199 || !carNumber) {
            alert('Invalid input');
            return;
        }

        if (parkingBoxes[boxNumber].length >= 10) {
            alert('This box is already full.');
            return;
        }

        // Add car number to the parking box
        parkingBoxes[boxNumber].push(carNumber);

        // Update the UI for this box
        const box = document.querySelector(`[data-box="${boxNumber + 1}"]`);
        box.classList.add('occupied');
        box.innerHTML = `<p>Box ${boxNumber + 1}</p><p>${parkingBoxes[boxNumber].join(', ')}</p>`;

        // Clear message
        document.getElementById('message').textContent = 'Car parked successfully';
    });
});

// Function for passengers to search their car
function searchCar() {
    const carNumber = document.getElementById('searchCar').value.trim().toUpperCase();

    if (!carNumber) {
        alert('Please enter a car number');
        return;
    }

    let found = false;
    parkingBoxes.forEach((box, index) => {
        if (box.includes(carNumber)) {
            alert(`Car ${carNumber} is parked in Box ${index + 1}`);
            found = true;
        }
    });

    if (!found) {
        alert(`Car ${carNumber} is not parked.`);
    }
}

// Reset all boxes every 30 minutes
setInterval(() => {
    parkingBoxes = Array(200).fill().map(() => []); // Clear all parking boxes
    document.querySelectorAll('.parking-box').forEach((box, index) => {
        box.classList.remove('occupied');
        box.innerHTML = `<p>Box ${index + 1}</p>`;
    });
    console.log('Parking reset every 30 minutes');
}, 30 * 60 * 1000);  // Reset every 30 minutes

// public/js/parking.js

let allParkings = [];

// Load all parking spots
async function loadParkings() {
  try {
    const res = await fetch('/api/parking');
    const data = await res.json();
    
    allParkings = data;
    displayParkings(data);
  } catch (err) {
    console.error(err);
  }
}

// Display parking cards
function displayParkings(parkings) {
  const container = document.getElementById('parkingList');
  container.innerHTML = '';

  if (parkings.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500 py-10">No parking spots found.</p>`;
    return;
  }

  parkings.forEach(parking => {
    const card = document.createElement('div');
    card.className = 'card bg-white rounded-2xl shadow overflow-hidden';
    card.innerHTML = `
      <div class="h-48 bg-gray-200 flex items-center justify-center text-6xl">
        🅿️
      </div>
      <div class="p-5">
        <h3 class="font-bold text-xl">${parking.name}</h3>
        <p class="text-gray-600 text-sm mt-1">${parking.address}</p>
        <div class="flex justify-between mt-4">
          <div>
            <span class="text-green-600 font-semibold">${parking.available_slots}</span>
            <span class="text-gray-500 text-sm">/${parking.total_slots} slots</span>
          </div>
          <div class="text-right">
            <span class="font-bold">₹${parking.price_per_hour}</span>
            <span class="text-gray-500 text-sm">/hr</span>
          </div>
        </div>
        <button onclick="bookParking(${parking.id})" 
                class="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
          Book Now
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allParkings.filter(p => 
    p.name.toLowerCase().includes(term) || 
    p.address.toLowerCase().includes(term) ||
    p.city.toLowerCase().includes(term)
  );
  displayParkings(filtered);
});

function bookParking(id) {
  localStorage.setItem('selectedParkingId', id);
  window.location.href = '/booking.html';
}

function logout() {
  localStorage.clear();
  window.location.href = '/login.html';
}

// Load parking when page loads
loadParkings();
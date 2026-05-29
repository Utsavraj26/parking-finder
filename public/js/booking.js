// public/js/booking.js

let selectedParking = null;

async function loadParkingDetails() {
  const parkingId = localStorage.getItem('selectedParkingId');
  if (!parkingId) {
    window.location.href = '/search.html';
    return;
  }

  try {
    const res = await fetch('/api/parking');
    const parkings = await res.json();
    selectedParking = parkings.find(p => p.id == parkingId);

    if (!selectedParking) return;

    const detailsHTML = `
      <h3 class="text-2xl font-bold">${selectedParking.name}</h3>
      <p class="text-gray-600 mt-2">${selectedParking.address}, ${selectedParking.city || ''}</p>
      
      <div class="mt-6 p-6 bg-gray-50 rounded-2xl">
        <div class="flex justify-between items-center">
          <div>
            <span class="text-green-600 font-bold text-3xl">${selectedParking.available_slots}</span>
            <span class="text-gray-500 text-lg"> slots left</span>
          </div>
          <div class="text-right">
            <span class="font-bold text-3xl">₹${selectedParking.price_per_hour}</span>
            <span class="text-gray-500"> / hour</span>
          </div>
        </div>
      </div>
    `;

    document.getElementById('parkingDetails').innerHTML = detailsHTML;

    // Disable button if no slots
    const bookBtn = document.querySelector('button[type="submit"]');
    if (bookBtn) {
      if (selectedParking.available_slots <= 0) {
        bookBtn.disabled = true;
        bookBtn.textContent = "❌ No Slots Available";
        bookBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Handle Booking Form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const booking_date = document.getElementById('booking_date').value;
    const start_time = document.getElementById('start_time').value;
    const end_time = document.getElementById('end_time').value;

    if (!selectedParking) return;

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parking_id: selectedParking.id,
          booking_date,
          start_time,
          end_time
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('🎉 Booking Confirmed Successfully!');
        localStorage.removeItem('selectedParkingId');
        setTimeout(() => window.location.href = '/dashboard.html', 1200);
      } else {
        alert('❌ ' + (data.error || 'Booking failed'));
      }
    } catch (err) {
      alert('❌ Something went wrong. Please try again.');
    }
  });
}

function logout() {
  localStorage.clear();
  window.location.href = '/login.html';
}

// Load details when page opens
loadParkingDetails();
// public/js/admin.js

const addParkingForm = document.getElementById('addParkingForm');

if (addParkingForm) {
  addParkingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const total_slots = document.getElementById('total_slots').value;
    const price_per_hour = document.getElementById('price_per_hour').value;

    try {
      const res = await fetch('/api/parking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          address,
          city,
          total_slots: parseInt(total_slots),
          price_per_hour: parseInt(price_per_hour)
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Parking location added successfully!');
        addParkingForm.reset();
      } else {
        alert('❌ ' + (data.error || 'Failed to add parking'));
      }
    } catch (err) {
      alert('❌ Something went wrong');
    }
  });
}

function logout() {
  localStorage.clear();
  window.location.href = '/login.html';
}
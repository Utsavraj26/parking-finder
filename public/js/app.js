// Basic App JavaScript
console.log("🚗 ParkFinder PWA Loaded Successfully!");

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker Registered'))
      .catch(err => console.log('Service Worker Error:', err));
  });
}
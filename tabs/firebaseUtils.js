import { firestore } from './firebaseConfig'; // Adjust path if necessary

// Function to calculate the distance between two coordinates
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Function to fetch nearby beaches
export const fetchNearbyBeaches = async (currentLocation) => {
  const { latitude, longitude } = currentLocation;

  // Get all beaches from Firestore
  const beachesRef = firestore.collection('beaches');
  const snapshot = await beachesRef.get();

  const nearbyBeaches = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    const distance = getDistance(
      latitude, longitude,
      data.latitude, data.longitude
    );

    if (distance <= 50) { // Example: within 50 km
      nearbyBeaches.push({ ...data, id: doc.id });
    }
  });

  return nearbyBeaches;
};
console.log('Firestore instance:', firestore);

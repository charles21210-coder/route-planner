// ============================================
// ROUTE PLANNER - Main Application
// ============================================

// Known locations with approximate coordinates (lat, lng)
// These are the Belgian postal/logistics hubs from your data
const LOCATIONS = {
  "NEW BRU X": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "NEW ANTWERPEN X": { lat: 51.2194, lng: 4.4025, city: "Antwerp" },
  "NEW GENT X": { lat: 51.0543, lng: 3.7174, city: "Ghent" },
  "NEW LIEGE X": { lat: 50.6292, lng: 5.5797, city: "Liège" },
  "NEW CHARLEROI X": { lat: 50.4108, lng: 4.4446, city: "Charleroi" },
  "NAL": { lat: 50.9311, lng: 5.3325, city: "Hasselt area" },
  "BRUCARGO710 (VAS)": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "EMC BRUSSELS 3": { lat: 50.9014, lng: 4.4844, city: "Brussels EMC" },
  "EMC - BUILDING 709": { lat: 50.9014, lng: 4.4844, city: "Brussels EMC" },
  "AALST MAIL": { lat: 50.9364, lng: 4.0355, city: "Aalst" },
  "ANTWERPEN CENTRUM MAIL": { lat: 51.2211, lng: 4.3997, city: "Antwerp Centre" },
  "ANTWERPEN ZUID MAIL": { lat: 51.1965, lng: 4.3944, city: "Antwerp South" },
  "ARLON MAIL": { lat: 49.6833, lng: 5.8167, city: "Arlon" },
  "ATH MAIL": { lat: 50.6292, lng: 3.7786, city: "Ath" },
  "BASTOGNE MAIL": { lat: 50.0000, lng: 5.7167, city: "Bastogne" },
  "BEAUMONT MAIL": { lat: 50.2333, lng: 4.1000, city: "Beaumont" },
  "BEERSEL": { lat: 50.7667, lng: 4.3000, city: "Beersel" },
  "BEVEREN MAIL": { lat: 51.2117, lng: 4.2544, city: "Beveren" },
  "BOUSSU MAIL": { lat: 50.4333, lng: 3.8000, city: "Boussu" },
  "BRAINE-L'ALLEUD MAIL": { lat: 50.6833, lng: 4.3667, city: "Braine-l'Alleud" },
  "BRUGGE MAIL": { lat: 51.2093, lng: 3.2247, city: "Bruges" },
  "BRUXELLES NORD MAIL": { lat: 50.8603, lng: 4.3617, city: "Brussels North" },
  "CHARLEROI": { lat: 50.4108, lng: 4.4446, city: "Charleroi" },
  "DENDERMONDE MAIL": { lat: 51.0281, lng: 4.1014, city: "Dendermonde" },
  "DEURNE MAIL": { lat: 51.2117, lng: 4.4611, city: "Deurne" },
  "DIEST MAIL": { lat: 50.9875, lng: 5.0514, city: "Diest" },
  "DINANT MAIL": { lat: 50.2611, lng: 4.9122, city: "Dinant" },
  "EEKLO MAIL": { lat: 51.1867, lng: 3.5567, city: "Eeklo" },
  "GEEL MAIL": { lat: 51.1625, lng: 4.9897, city: "Geel" },
  "GENT MAIL": { lat: 51.0543, lng: 3.7174, city: "Ghent" },
  "GENK MAIL": { lat: 50.9650, lng: 5.5003, city: "Genk" },
  "GERAARDSBERGEN": { lat: 50.7706, lng: 3.8808, city: "Geraardsbergen" },
  "HASSELT MAIL": { lat: 50.9311, lng: 5.3378, city: "Hasselt" },
  "IEPER MAIL": { lat: 50.8514, lng: 2.8861, city: "Ypres" },
  "KORTRIJK MAIL": { lat: 50.8278, lng: 3.2650, city: "Kortrijk" },
  "LA LOUVIERE MAIL": { lat: 50.4789, lng: 4.1889, city: "La Louvière" },
  "LEUVEN MAIL": { lat: 50.8798, lng: 4.7005, city: "Leuven" },
  "LIBRAMONT-CHEVIGNY MAIL": { lat: 49.9206, lng: 5.3936, city: "Libramont" },
  "LIER MAIL": { lat: 51.1314, lng: 4.5697, city: "Lier" },
  "MECHELEN MAIL": { lat: 51.0259, lng: 4.4776, city: "Mechelen" },
  "MOL MAIL": { lat: 51.1894, lng: 5.1142, city: "Mol" },
  "MONS MAIL": { lat: 50.4542, lng: 3.9514, city: "Mons" },
  "NAMUR MAIL": { lat: 50.4669, lng: 4.8675, city: "Namur" },
  "NEW OOSTKAMP": { lat: 51.1539, lng: 3.2350, city: "Oostkamp" },
  "OOSTENDE MAIL": { lat: 51.2256, lng: 2.9175, city: "Ostend" },
  "OUDENAARDE MAIL": { lat: 50.8464, lng: 3.6067, city: "Oudenaarde" },
  "ROESELARE MAIL": { lat: 50.9444, lng: 3.1258, city: "Roeselare" },
  "SINT NIKLAAS MAIL": { lat: 51.1564, lng: 4.1431, city: "Sint-Niklaas" },
  "TIELT MAIL": { lat: 51.0000, lng: 3.3256, city: "Tielt" },
  "TIENEN MAIL": { lat: 50.8072, lng: 4.9381, city: "Tienen" },
  "TONGEREN MAIL": { lat: 50.7806, lng: 5.4644, city: "Tongeren" },
  "TOURNAI MAIL": { lat: 50.6050, lng: 3.3883, city: "Tournai" },
  "TURNHOUT MAIL": { lat: 51.3225, lng: 4.9481, city: "Turnhout" },
  "WAVRE MAIL": { lat: 50.7167, lng: 4.6000, city: "Wavre" },
  "ANDERLECHT OBX": { lat: 50.8333, lng: 4.3167, city: "Anderlecht" },
  "HAVENDOKLAAN": { lat: 50.8667, lng: 4.3500, city: "Brussels Port" },
  "NEW SCHAERBEEK": { lat: 50.8667, lng: 4.3833, city: "Schaerbeek" },
  "TERNAT MAIL": { lat: 50.8667, lng: 4.1667, city: "Ternat" },
  "ZAVENTEM MAIL": { lat: 50.8833, lng: 4.4667, city: "Zaventem" },
  "LAKEN MAIL": { lat: 50.8750, lng: 4.3500, city: "Laeken" },
  "MARCHE-EN-FAMENNE MAIL": { lat: 50.2264, lng: 5.3444, city: "Marche" },
  "MOUSCRON MAIL": { lat: 50.7394, lng: 3.2139, city: "Mouscron" },
  "SANKT VITH MAIL": { lat: 50.2833, lng: 6.1333, city: "Sankt Vith" },
  "VILLERS-LE-BOUILLET MAIL": { lat: 50.5833, lng: 5.2833, city: "Villers-le-Bouillet" },
  "SERAING MAIL": { lat: 50.5833, lng: 5.5000, city: "Seraing" },
  "SPRIMONT MAIL": { lat: 50.5000, lng: 5.6667, city: "Sprimont" },
  "WAREMME MAIL": { lat: 50.6944, lng: 5.2569, city: "Waremme" },
  "VISE MAIL": { lat: 50.7333, lng: 5.7000, city: "Visé" },
  "THIMISTER-CLERMONT MAIL": { lat: 50.6500, lng: 5.8500, city: "Thimister" },
  "LONTZEN MAIL": { lat: 50.7000, lng: 6.0000, city: "Lontzen" }
};

// ============================================
// DISTANCE CALCULATION (Haversine formula)
// ============================================
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Check if a point is roughly "on the way" between two other points
function isOnRoute(routeFrom, routeTo, deliveryPoint, maxDetourKm = 25) {
  const fromCoords = LOCATIONS[routeFrom];
  const toCoords = LOCATIONS[routeTo];
  if (!fromCoords || !toCoords) return { onRoute: false };

  // Direct distance of the route
  const directDist = haversineDistance(
    fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng
  );

  // Distance via the delivery point
  const distViaPoint = 
    haversineDistance(fromCoords.lat, fromCoords.lng, deliveryPoint.lat, deliveryPoint.lng) +
    haversineDistance(deliveryPoint.lat, deliveryPoint.lng, toCoords.lat, toCoords.lng);

  const detourKm = distViaPoint - directDist;
  // Estimate additional time: assume average speed 50 km/h for detour
  const additionalMinutes = Math.round((detourKm / 50) * 60);

  return {
    onRoute: detourKm <= maxDetourKm,
    detourKm: Math.round(detourKm * 10) / 10,
    additionalMinutes: additionalMinutes,
    distanceFromStart: haversineDistance(
      fromCoords.lat, fromCoords.lng, deliveryPoint.lat, deliveryPoint.lng
    )
  };
}

// ============================================
// MAIN SEARCH FUNCTION
// ============================================
function findDeliveryOptions(request) {
  /*
    request = {
      pickupLocation: { lat, lng, name },
      deliveryLocation: { lat, lng, name },
      containersNeeded: number,
      earliestTime: "HH:MM",  (delivery window)
      latestTime: "HH:MM",
      dayOfWeek: number (0-6, 0=Sunday)
    }
  */

  const results = [];

  for (const route of ROUTES_DATA) {
    // 1. Check if route runs on the requested day
    const routeDays = parseDays(route.ospFrequency);
    if (!routeDays.includes(request.dayOfWeek)) continue;

    // 2. Check if pickup is near route origin OR on the route
    const pickupCheck = isOnRoute(
      route.from, route.to, request.pickupLocation, 30
    );

    // 3. Check if delivery is near route destination OR on the route
    const deliveryCheck = isOnRoute(
      route.from, route.to, request.deliveryLocation, 30
    );

    // At least one of pickup/delivery must be on or near the route
    if (!pickupCheck.onRoute && !deliveryCheck.onRoute) continue;

    // 4. Calculate timing
    const depMinutes = timeToMinutes(route.departure);
    const arrMinutes = timeToMinutes(route.arrival);
    if (depMinutes === null || arrMinutes === null) continue;

    const requestEarliest = timeToMinutes(request.earliestTime + ":00");
    const requestLatest = timeToMinutes(request.latestTime + ":00");

    // Estimate when the truck would pass the delivery point
    const routeDuration = arrMinutes >= depMinutes 
      ? arrMinutes - depMinutes 
      : (arrMinutes + 1440) - depMinutes;
    
    const totalRouteDist = route.plannedDistance;
    const fractionAlongRoute = deliveryCheck.distanceFromStart 
      ? Math.min(deliveryCheck.distanceFromStart / Math.max(totalRouteDist, 1), 1)
      : 0.5;
    
    const estimatedPassTime = depMinutes + (routeDuration * fractionAlongRoute);
    const estimatedDeliveryTime = estimatedPassTime + deliveryCheck.additionalMinutes;

    // Check if estimated delivery falls within the time window
    const withinWindow = estimatedDeliveryTime >= requestEarliest && 
                          estimatedDeliveryTime <= requestLatest;

    // 5. Check capacity
    const capacityWarning = request.containersNeeded > route.capacity;

    // 6. Calculate total additional time (detour for both pickup and delivery)
    const totalAdditionalMinutes = 
      (pickupCheck.onRoute ? pickupCheck.additionalMinutes : 0) +
      (deliveryCheck.onRoute ? deliveryCheck.additionalMinutes : 0);

    results.push({
      route: route,
      totalAdditionalMinutes: totalAdditionalMinutes,
      pickupDetourKm: pickupCheck.detourKm || 0,
      deliveryDetourKm: deliveryCheck.detourKm || 0,
      estimatedDeliveryTime: formatMinutes(estimatedDeliveryTime),
      withinTimeWindow: withinWindow,
      capacityWarning: capacityWarning,
      capacityAvailable: route.capacity,
      score: totalAdditionalMinutes + (withinWindow ? 0 : 60) + (capacityWarning ? 20 : 0)
    });
  }

  // Sort by score (lower = better), then take top 10
  results.sort((a, b) => a.score - b.score);
  return results.slice(0, 10);
}

function formatMinutes(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = Math.round(mins % 60);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

// ============================================
// UI RENDERING
// ============================================
function renderResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>⚠️ No existing routes can accommodate this delivery</h3>
        <p><strong>A NEW ROUTE is required.</strong></p>
      </div>`;
    return;
  }

  let html = '<h3>Top 10 Options (sorted by additional time)</h3>';
  html += '<table class="results-table">';
  html += `<tr>
    <th>#</th>
    <th>Service</th>
    <th>From → To</th>
    <th>Departure</th>
    <th>Est. Delivery</th>
    <th>Extra Time</th>
    <th>Extra KM</th>
    <th>Capacity</th>
    <th>Days</th>
    <th>Warnings</th>
  </tr>`;

  results.forEach((r, i) => {
    const dayNames = {'0':'Sun','1':'Mon','2':'Tue','3':'Wed','4':'Thu','5':'Fri','6':'Sat'};
    const days = r.route.ospFrequency.split('').map(d => dayNames[d] || d).join(', ');
    
    const warnings = [];
    if (r.capacityWarning) warnings.push('🟡 Bigger truck needed');
    if (!r.withinTimeWindow) warnings.push('🟠 Outside time window');

    html += `<tr class="${warnings.length ? 'has-warning' : 'good-match'}">
      <td>${i + 1}</td>
      <td><strong>${r.route.service}</strong><br><small>${r.route.trip}</small></td>
      <td>${r.route.from} → ${r.route.to}</td>
      <td>${r.route.departure}</td>
      <td>${r.estimatedDeliveryTime}</td>
      <td><strong>+${r.totalAdditionalMinutes} min</strong></td>
      <td>+${r.pickupDetourKm + r.deliveryDetourKm} km</td>
      <td>${r.capacityAvailable} containers</td>
      <td><small>${days}</small></td>
      <td>${warnings.join('<br>') || '✅ OK'}</td>
    </tr>`;
  });

  html += '</table>';
  container.innerHTML = html;
}
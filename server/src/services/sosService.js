export function buildMapsUrl(latitude, longitude) {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

export function buildEmergencyMessage(name, mapsUrl, customMessage) {
  return `${customMessage || 'Emergency SOS alert from OnePulse.'} ${name} needs assistance. Live location: ${mapsUrl}`;
}

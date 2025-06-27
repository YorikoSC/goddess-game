export function updateClock(element) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    element.textContent = `${hours}:${minutes}`;
}
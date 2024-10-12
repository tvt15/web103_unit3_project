// dates.js

/**
 * Formats a time value into a readable string (e.g., "12:00 PM").
 * @param {string | Date} time - The time to format.
 * @returns {string} - Formatted time string.
 */
export const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

/**
 * Calculates and formats the remaining time until an event.
 * @param {number} remaining - Remaining time in milliseconds.
 * @returns {string} - Formatted remaining time string.
 */
export const formatRemainingTime = (remaining) => {
    const seconds = Math.floor((remaining / 1000) % 60);
    const minutes = Math.floor((remaining / 1000 / 60) % 60);
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);

    let formattedTime = '';
    if (hours > 0) {
        formattedTime += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
        formattedTime += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
    formattedTime += `${seconds} second${seconds > 1 ? 's' : ''}`;

    return formattedTime.trim();
};

/**
 * Formats negative remaining time and performs any necessary actions based on it.
 * @param {string} remaining - Remaining time string to format.
 * @param {number} eventId - ID of the event to associate with this time.
 */
export const formatNegativeTimeRemaining = (remaining, eventId) => {
    // Perform any action needed when the remaining time is negative
    // For example, you might want to log or trigger a notification
    console.log(`Event ID ${eventId} has a negative remaining time: ${remaining}`);
};

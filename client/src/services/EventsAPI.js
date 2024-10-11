const API_URL = '/api/events';

export const getAllEvents = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const getEventById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
};

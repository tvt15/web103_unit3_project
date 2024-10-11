const API_URL = '/api/locations';

export const getAllLocations = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const getLocationById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
};

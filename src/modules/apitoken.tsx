// src/utils/api.ts
import axios, { AxiosResponse, AxiosError, Method } from 'axios';

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export const fetchCardDetailstoken = async (
  apiEndpoint: string,
  method: Method = 'get', // Default to 'get' if no method is provided
  data?: any,
  token?: string // Add token parameter for authorization
) => {
  try {
    const response: AxiosResponse = await axios({
      method,
      url: apiEndpoint,
      data,
      headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const response = axiosError.response;

      // Initialize error message with default text in case response or data is missing
      let errorMessage = 'An error occurred while fetching data from the API';

      // Check if response and data exist
      if (response && response.data !== undefined) {
        // If response.data is an object, convert it to JSON string
        if (typeof response.data === 'object') {
          errorMessage = JSON.stringify(response.data);
        } else if (typeof response.data === 'string') {
          // If response.data is a string, use it directly
          errorMessage = response.data;
        }
      }

      // Throw the ApiError with the message and status code
      throw new ApiError(errorMessage, response?.status || 500);
    } else {
      // Handle other types of errors
      throw new Error('An unknown error occurred while fetching data from the API');
    }
  }
};
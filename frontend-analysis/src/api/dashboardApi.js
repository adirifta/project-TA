import apiClient from './apiClient';

export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchChartData = async (chartType) => {
  try {
    const response = await apiClient.get(`/charts/${chartType}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
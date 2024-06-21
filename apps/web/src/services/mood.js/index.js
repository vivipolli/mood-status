import api from "../api";

class MoodService {
  async fetchMoods() {
    try {
      const response = await api.get('/moods');
      return response.data;
    } catch (error) {
      console.error('Error fetching moods:', error);
      throw new Error('Failed to fetch moods');
    }
  }

  async createMood(data) {
    try {
      const response = await api.post('/moods', data);
      return response.data;
    } catch (error) {
      console.error('Error creating mood:', error);
      throw new Error('Failed to create mood');
    }
  }
}

const moodService = new MoodService();
export default moodService;

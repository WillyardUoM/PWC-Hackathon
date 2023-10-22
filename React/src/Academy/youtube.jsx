import axios from "axios";

class Youtube {
  constructor() {
    this.headers = {
        'X-RapidAPI-Key': 'fc1cb2e3eamsh437dbbcfd02637cp156484jsn623cefc17583',
        'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    };
  }

  async searchPlayList(query) {
    try {
      const options = {
        method: "GET",
        url: "https://yt-api.p.rapidapi.com/search",
        params: {
          query,
          type: 'playlist',
        },
        headers: this.headers,
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getVideosFromPlaylist(query) {
    try {
      const options = {
        method: "GET",
        url: 'https://yt-api.p.rapidapi.com/playlist',
        params: {
          id:query,
        },
        headers: this.headers,
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default Youtube;

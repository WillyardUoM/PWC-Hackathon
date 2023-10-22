import axios from "axios";

class YoutubeRelatedVideos {
  constructor() {
    this.headers = {
      "X-RapidAPI-Key": "1920d81ca7msh9a68d528b0a0084p16d27ajsn5ac766993e7f",
      "X-RapidAPI-Host": "youtube-v3-lite.p.rapidapi.com",
    };
  }

  async findRelatedVideo(query) {
    try {
      const options = {
        method: "GET",
        url: "https://youtube-v3-lite.p.rapidapi.com/search",
        params: {
          relatedToVideoId: query,
          part: "id,snippet",
          type: "video",
        },
        headers: this.headers,
      };

      const response = await axios.request(options);
      return response.data.items;
    } catch (error) {
      throw error;
    }
  }
}

export default YoutubeRelatedVideos;

import axios from "axios";

class PalmAI {
  constructor() {
    this.API_KEY = "AIzaSyAXnP8DoQRNpUf8or0rVW_Zu-WQt9qoQXo"; // Replace with your actual API key
    this.apiUrl =
      "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText";
  }

  async getResponse(query) {
    try {
      const requestData = {
        prompt: {
          text: query,
        },
        temperature: 0.7,
        top_k: 40,
        top_p: 0.95,
        candidate_count: 1,
        max_output_tokens: 1024,
        stop_sequences: [],
        safety_settings: [
          { category: "HARM_CATEGORY_DEROGATORY", threshold: 1 },
          { category: "HARM_CATEGORY_TOXICITY", threshold: 1 },
          { category: "HARM_CATEGORY_VIOLENCE", threshold: 2 },
          { category: "HARM_CATEGORY_SEXUAL", threshold: 2 },
          { category: "HARM_CATEGORY_MEDICAL", threshold: 2 },
          { category: "HARM_CATEGORY_DANGEROUS", threshold: 2 },
        ],
      };
      const response = await axios
        .post(`${this.apiUrl}?key=${this.API_KEY}`, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      return response.data.candidates[0].output;
    } catch (error) {
      throw error;
    }
  }
  
}

export default PalmAI;

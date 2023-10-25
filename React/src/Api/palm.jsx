// import axios from "axios";

// class PalmAI {
//   constructor() {
//     this.API_KEY = "AIzaSyAXnP8DoQRNpUf8or0rVW_Zu-WQt9qoQXo"; // Replace with your actual API key
//     this.apiUrl =
//       "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText";
//   }

//   async getResponse(query) {
//     try {
//       const requestData = {
//         prompt: {
//           text: query,
//         },
//         temperature: 0.7,
//         top_k: 40,
//         top_p: 0.95,
//         candidate_count: 1,
//         max_output_tokens: 1024,
//         stop_sequences: [],
//         safety_settings: [
//           { category: "HARM_CATEGORY_DEROGATORY", threshold: 1 },
//           { category: "HARM_CATEGORY_TOXICITY", threshold: 1 },
//           { category: "HARM_CATEGORY_VIOLENCE", threshold: 2 },
//           { category: "HARM_CATEGORY_SEXUAL", threshold: 2 },
//           { category: "HARM_CATEGORY_MEDICAL", threshold: 2 },
//           { category: "HARM_CATEGORY_DANGEROUS", threshold: 2 },
//         ],
//       };
//       const response = await axios
//         .post(`${this.apiUrl}?key=${this.API_KEY}`, requestData, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//       return response.data.candidates[0].output;
//     } catch (error) {
//       throw error;
//     }
//   }
  
// }

// export default PalmAI;

import axios from "axios";

const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "test-362517";
const MODEL_ID = "code-bison";

const PalmAI = {
  async getResponse(query) {
    try {
      const response = await axios.post(
        `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict`,
        {
          instances: [
            {
              prefix: query,
            },
          ],
          parameters: {
            candidateCount: 1,
            maxOutputTokens: 1024,
            temperature: 0.2,
          },
        },
        {
          headers: {
            Authorization: "Bearer ya29.a0AfB_byAiIC2EAZqeZVyhtOijgqHTMer2lHolCTn8jL2GFW36JIKEqxnAvLNY4cUXy8QIMmh21EdF0ediPWzTtEo_iFSgf0u0wpg9uDVHAJSceGTkL_-SJ-BgRwxVMZFbDGYGxtXcwIEI2rOWTik06mZ-db5Q7W69oBatzLR_6ju01_aTfqYO00BzDby4uuwGyZ0zr_tx669aftiwegxW6nwi79ygt4JS7_uwxmkfTokE-tTeqgPX6Iq-2JO9fb5f3KraAQcZTHrkHJmVfoU7G_RyA0JJfMh9CnTQc0f8hN6_88UNdYHNHoDTa1md3-wGlBVsNZ27UJkQCKZM_1rJ9a4jxfJA9Uh1IiQ3N3hXBbEypYK_obS4_LghsHefxoXqvLTOCDkRr0ZK_scYaJvJ3OW5eCDPmGwaCgYKAZsSARMSFQGOcNnCIZRiqaf9ULFhSgIqGTP7UQ0422",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.predictions[0].text;
    } catch (error) {
      throw error;
    }
  },
};

export default PalmAI;
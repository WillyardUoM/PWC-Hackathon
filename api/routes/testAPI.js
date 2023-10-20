
const express = require('express');
const router = express.Router();
const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyAXnP8DoQRNpUf8or0rVW_Zu-WQt9qoQXo"; // Replace with your actual API key

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});


const stopSequences = [];

const messages = [];

router.post('/send-message', function(req, res, next) {
  const { content } = req.body;
  messages.push({ content });
  res.status(204).send(); // Set status to 204 (No Content) and send an empty response.
});

router.get('/', function(req, res, next) {
  
  const { content } = messages[messages.length - 1] || { content: '' }; // Get the latest message
 // console.log(content+promptString);
  
  client.generateText({
    model: MODEL_NAME,
    temperature: 0.7,
    candidateCount: 1,
    top_k: 40,
    top_p: 0.95,
    max_output_tokens: 1024,
    stop_sequences: stopSequences,
    safety_settings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
    prompt: {
      text: content, // Add the content to the prompt
    },
  }).then(result => {
    if (result && result.length > 0 && result[0].candidates && result[0].candidates.length > 0) {
      const outputText = result[0].candidates[0].output;
      res.send(outputText);
    } else {
      res.status(500).send("Error: Unable to retrieve output text");
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send("Error: An error occurred while generating the message"+err);
  });
});

module.exports = router;

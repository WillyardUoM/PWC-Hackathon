import React, { useState, useEffect } from 'react'
import axios from 'axios';
function Test() {
  const [members, setMembers] = useState([]);
  const [prompt, setPrompt] = useState("4 yearsJava, Spring Boot, MySQLProblem-solving, AdaptabilityInventory Management System, API DevelopmentDatabase Management, Backend DevelopmentJunior Software DeveloperAdvancing to Senior DeveloperObject-Oriented Programming (3.9), Software Testing (4.2), Code Refactoring (4.1).- Bachelor's in Computer Science (Rating: 4.5) - Advanced Java Programming (Rating: 4.2) - Database Design and Management (Rating: 4.4) - Software Development Best Practices (Rating: 4.3) - Design Patterns in Software Engineering (Rating: 4.0)"); // Set your prompt here

  useEffect(() => {
    // Define a function to fetch data with the prompt parameter
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/predict', {
          params: {
            prompt: prompt,
          },
        });
        console.log(response)
        setMembers(response.data); // Assuming the response is an array of members
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [prompt]);

  return (
    <div>{JSON.stringify(members)}</div>
  )
}

export default Test
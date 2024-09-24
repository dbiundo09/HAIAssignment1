const url = process.env.NODE_ENV === 'production' ? 'https://haiassignment1.onrender.com' : 'http://127.0.0.1:8000';

export default async function promptGPT (prompt, datas) {
  try {
    const response = await fetch(url + "/generateChart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        data: datas,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const cleanedResponse = data.response.replace(/```json|```/g, '');
    if (cleanedResponse == "no") { 
      return null;
    }
    console.log(cleanedResponse);
    return cleanedResponse; 
  } catch (error) {
    console.error("Error querying GPT:", error);
    throw error;
  }
};


export  async function getDescription (prompt, datas) {
  try {
    const response = await fetch("http://127.0.0.1:8000/getDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        data: datas,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const cleanedResponse = data.response.replace(/```json|```/g, '');
    if (cleanedResponse == "no") { 
      return null;
    }
    console.log(cleanedResponse);
    return cleanedResponse; 
  } catch (error) {
    console.error("Error querying GPT:", error);
    throw error;
  }
};




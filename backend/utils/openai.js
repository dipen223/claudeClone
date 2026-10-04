import dotenv from "dotenv"

dotenv.config()

// messages = the conversation so far, as [{ role, content }, ...]
const getOpenAIApiResponse = async(messages) =>{
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
    }),

});

 if(!response.ok){
    throw new Error(`OpenAI API error ${response.status}: ${await response.text()}`);
 }

 const data = await response.json();
 return data.choices[0].message.content;


}


export default getOpenAIApiResponse;
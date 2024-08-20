/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "npm:@google/generative-ai@0.17.0";

  import { convert } from 'npm:html-to-text@9.0.5';
  
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an experienced site reliability engineer who is able to rate incident reviews based on how much can be generically learned from them",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {

    const res = await fetch("https://slack.engineering/the-query-strikes-again/");
    const html = await res.text();
    // console.log(html);
    const pageText = convert(html); //TODO - trim hrefs out to further limit size
    // console.log(pageText);

    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
  
    const result = await chatSession.sendMessage(`Rate the following incident by how much can be generically learned from it on a scale of 1 to 10, without giving a summary:${pageText}`);

    console.log(result.response.text());
  }
  
  run();
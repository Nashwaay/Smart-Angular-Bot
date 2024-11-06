import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Replace with your actual API key from https://makersuite.google.com/app/apikey
    this.genAI = new GoogleGenerativeAI('AIzaSyD3CKVD7z1UF58PdpQEG3eLKegwx3mGTQg');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(prompt: string, language: string): Promise<string> {
    try {
      const result = await this.model.generateContent(`
        Act as a helpful chatbot assistant. 
        Respond to the following message in ${language} language: "${prompt}"
        Keep the response concise and friendly.
      `);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return 'I apologize, but I encountered an error. Please try again.';
    }
  }
}
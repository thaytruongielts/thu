
import { GoogleGenAI } from "@google/genai";
import { SuggestionField } from '../types';

const getPrompt = (field: SuggestionField, studentName: string, letterContent: string): string => {
  const commonInstruction = `Bạn là một giáo viên chuyên nghiệp và tận tâm. Dựa vào các thông tin sau:\n- Tên học sinh: ${studentName || 'học sinh'}\n- Chủ đề thư: ${letterContent || 'tình hình học tập chung'}\n\nHãy viết một đoạn văn ngắn (2-3 câu) súc tích, mang tính xây dựng để gửi cho phụ huynh.`;

  if (field === 'progress') {
    return `${commonInstruction}\n\nNội dung cần tập trung vào "Tiến bộ đạt được" của học sinh, sử dụng ngôn từ khích lệ và tích cực. Chỉ trả về nội dung đoạn văn, không thêm lời chào hay các phần không liên quan.`;
  }
  
  if (field === 'areasForImprovement') {
    return `${commonInstruction}\n\nNội dung cần tập trung vào "Điểm cần tiến bộ hơn" của học sinh, sử dụng ngôn từ nhẹ nhàng, mang tính gợi ý và định hướng giúp học sinh phát triển. Chỉ trả về nội dung đoạn văn, không thêm lời chào hay các phần không liên quan.`;
  }

  return '';
};

export const generateSuggestion = async (
  field: SuggestionField,
  studentName: string,
  letterContent: string
): Promise<string> => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API key is not configured.");
  }

  const prompt = getPrompt(field, studentName, letterContent);
  if (!prompt) {
    return "";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating suggestion:", error);
    return "Đã xảy ra lỗi khi tạo gợi ý. Vui lòng thử lại.";
  }
};

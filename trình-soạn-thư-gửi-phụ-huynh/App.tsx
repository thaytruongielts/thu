
import React, { useState, useMemo, useCallback } from 'react';
import { InputGroup } from './components/InputGroup';
import { LetterPreview } from './components/LetterPreview';
import { generateSuggestion } from './services/geminiService';
import { LetterData, SuggestionField } from './types';

const INITIAL_FORM_DATA: LetterData = {
  parentSalutation: 'mẹ',
  parentName: 'Lê Trinh',
  studentName: 'Bảo Khuê',
  letterContent: 'tiến trình học của bạn Bảo Khuê',
  progress: 'Đã làm bài ngữ pháp thành thạo, tập trung hơn khi làm bài tập trên lớp. Bạn có năng lượng cao, tạo không khí vui vẻ và tích cực cho cả lớp.',
  areasForImprovement: 'Cần luyện tập thêm các công thức ngữ pháp nâng cao để ghi nhớ và áp dụng linh hoạt hơn.',
  tuitionFee: '3.000.000 VNĐ',
  paidUntilDate: '23/09/2025',
  nextTuitionPeriodStart: '24/09/2025',
  nextTuitionPeriodEnd: '24/11/2025',
  studentWishingPeriod: 'học kỳ 1 năm học 2025-2026',
  teacherTitle: 'Chuyên dạy lớp 6-12',
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<LetterData>(INITIAL_FORM_DATA);
  const [generatingField, setGeneratingField] = useState<SuggestionField | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleAISuggest = useCallback(async (field: SuggestionField) => {
    setGeneratingField(field);
    try {
      const suggestion = await generateSuggestion(field, formData.studentName, formData.letterContent);
      setFormData(prev => ({ ...prev, [field]: suggestion }));
    } catch (error) {
      console.error(`Failed to get AI suggestion for ${field}:`, error);
      // Optionally, show an error to the user
    } finally {
      setGeneratingField(null);
    }
  }, [formData.studentName, formData.letterContent]);

  const generatedLetter = useMemo(() => {
    const {
      parentSalutation, parentName, studentName, letterContent, progress,
      areasForImprovement, tuitionFee, paidUntilDate, nextTuitionPeriodStart,
      nextTuitionPeriodEnd, studentWishingPeriod, teacherTitle
    } = formData;

    // A simple check to avoid generating an empty letter
    if (!parentName.trim() && !studentName.trim()) {
        return "";
    }

    return `
Thầy Trường chào ${parentSalutation} ${parentName},

Thầy gửi ${parentSalutation} ${parentName} về ${letterContent}.

**Tiến bộ đạt được:**
${progress}

**Điểm cần tiến bộ hơn:**
${areasForImprovement}

**Về học phí:**
Bạn ${studentName} đã đóng tiền học đến ngày ${paidUntilDate}.
Vậy ${parentSalutation} ${parentName} vui lòng chuyển cho thầy Trường số tiền là ${tuitionFee} vào tài khoản BIDV 1690000157, chủ tài khoản Lê Hồng Trường, để bạn ${studentName} học từ ngày ${nextTuitionPeriodStart} đến ${nextTuitionPeriodEnd}.

Chúc bạn ${studentName} đạt kết quả cao trong ${studentWishingPeriod}.

Trân trọng,
Thầy Trường
${teacherTitle}
    `.trim();
  }, [formData]);


  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Trình Soạn Thư Gửi Phụ Huynh
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Điền thông tin vào biểu mẫu bên dưới để tạo thư nhanh chóng.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Cách xưng hô với PH" name="parentSalutation" value={formData.parentSalutation} onChange={handleInputChange} placeholder="VD: mẹ, ba, anh, chị..." />
                    <InputGroup label="Tên phụ huynh" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="VD: Lê Trinh" />
                </div>
                <InputGroup label="Tên học sinh" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="VD: Bảo Khuê" />
                <InputGroup label="Nội dung chính của thư" name="letterContent" value={formData.letterContent} onChange={handleInputChange} placeholder="VD: tiến trình học của bạn..." isTextarea />
                <InputGroup label="Tiến bộ đạt được" name="progress" value={formData.progress} onChange={handleInputChange} placeholder="Nhập nhận xét về tiến bộ..." isTextarea onAISuggest={() => handleAISuggest('progress')} isGeneratingAI={generatingField === 'progress'} />
                <InputGroup label="Điểm cần tiến bộ hơn" name="areasForImprovement" value={formData.areasForImprovement} onChange={handleInputChange} placeholder="Nhập nhận xét về điểm cần cải thiện..." isTextarea onAISuggest={() => handleAISuggest('areasForImprovement')} isGeneratingAI={generatingField === 'areasForImprovement'} />
                
                <h3 className="text-lg font-semibold text-slate-800 border-t pt-6">Thông tin học phí</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Số tiền học phí" name="tuitionFee" value={formData.tuitionFee} onChange={handleInputChange} placeholder="VD: 3.000.000 VNĐ" />
                    <InputGroup label="Đã đóng đến ngày" name="paidUntilDate" value={formData.paidUntilDate} onChange={handleInputChange} placeholder="VD: 23/09/2025" />
                    <InputGroup label="Thời gian học tiếp theo (Từ)" name="nextTuitionPeriodStart" value={formData.nextTuitionPeriodStart} onChange={handleInputChange} placeholder="VD: 24/09/2025" />
                    <InputGroup label="Thời gian học tiếp theo (Đến)" name="nextTuitionPeriodEnd" value={formData.nextTuitionPeriodEnd} onChange={handleInputChange} placeholder="VD: 24/11/2025" />
                </div>

                <h3 className="text-lg font-semibold text-slate-800 border-t pt-6">Lời chúc & Chữ ký</h3>
                <InputGroup label="Lời chúc cho học sinh" name="studentWishingPeriod" value={formData.studentWishingPeriod} onChange={handleInputChange} placeholder="VD: học kỳ 1 năm học 2025-2026" />
                <InputGroup label="Chức danh giáo viên" name="teacherTitle" value={formData.teacherTitle} onChange={handleInputChange} placeholder="VD: Chuyên dạy lớp 6-12" />

            </form>
          </div>
          
          <div className="lg:sticky lg:top-8 self-start">
             <LetterPreview letter={generatedLetter} />
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;

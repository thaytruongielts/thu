
export interface LetterData {
  parentSalutation: string;
  parentName: string;
  studentName: string;
  letterContent: string;
  progress: string;
  areasForImprovement: string;
  tuitionFee: string;
  paidUntilDate: string;
  nextTuitionPeriodStart: string;
  nextTuitionPeriodEnd: string;
  studentWishingPeriod: string;
  teacherTitle: string;
}

export type SuggestionField = 'progress' | 'areasForImprovement';

// AI feedback stub. Wire to Lovable's AI provider inside this function.
// Inputs are deliberately scoped so the prompt stays grounded in the current lesson.

export interface FeedbackInput {
  moduleTitle: string;
  sectionTitle?: string;
  prompt: string;
  studentResponse: string;
  correctResponse: string;
  baselineExplanation: string;
  isCorrect: boolean;
}

export async function getFeedback(input: FeedbackInput): Promise<string> {
  // MVP: return the baseline explanation. Replace this body with a Lovable
  // AI call that uses the fields above as a structured prompt.
  const lead = input.isCorrect
    ? 'Right. '
    : 'Not quite. ';
  return lead + input.baselineExplanation;
}

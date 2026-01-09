'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized typing lessons based on user performance.
 *
 * It includes:
 * - `generatePersonalizedLesson`:  A function that generates a personalized typing lesson.
 * - `PersonalizedTypingLessonInput`: The input type for the generatePersonalizedLesson function.
 * - `PersonalizedTypingLessonOutput`: The output type for the generatePersonalizedLesson function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTypingLessonInputSchema = z.object({
  typingSpeedWPM: z
    .number()
    .describe('The user\'s current typing speed in words per minute.'),
  accuracy: z.number().describe('The user\'s current typing accuracy (0-100).'),
  errorAnalysis: z
    .string()
    .describe(
      'A description of the user\'s common typing errors, such as specific keys or words they struggle with.'
    ),
  preferredLessonLength: z
    .string()
    .describe('The length of the lesson (short, medium, long).'),
});

export type PersonalizedTypingLessonInput = z.infer<
  typeof PersonalizedTypingLessonInputSchema
>;

const PersonalizedTypingLessonOutputSchema = z.object({
  lessonText: z
    .string()
    .describe(
      'A typing lesson tailored to the user\'s skill level and weaknesses, including phrases and paragraphs to practice.'
    ),
  lessonFocus: z
    .string()
    .describe(
      'A description of the specific skills or keys that the lesson focuses on improving.'
    ),
});

export type PersonalizedTypingLessonOutput = z.infer<
  typeof PersonalizedTypingLessonOutputSchema
>;

export async function generatePersonalizedLesson(
  input: PersonalizedTypingLessonInput
): Promise<PersonalizedTypingLessonOutput> {
  return personalizedTypingLessonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTypingLessonPrompt',
  input: {schema: PersonalizedTypingLessonInputSchema},
  output: {schema: PersonalizedTypingLessonOutputSchema},
  prompt: `You are an expert typing tutor. Generate a personalized typing lesson based on the user\'s current skill level and weaknesses.

User Typing Speed: {{typingSpeedWPM}} WPM
User Accuracy: {{accuracy}}%
Error Analysis: {{errorAnalysis}}
Preferred Lesson Length: {{preferredLessonLength}}

Focus on improving the user\'s specific weaknesses and provide a lesson that is challenging but not discouraging.

Consider the user's preferred lesson length when generating the lesson text.  A short lesson should be less than 100 words, a medium lesson should be 100-250 words, and a long lesson should be 250-400 words.

Output a lesson that helps the user improve their typing speed and accuracy.
`,
});

const personalizedTypingLessonFlow = ai.defineFlow(
  {
    name: 'personalizedTypingLessonFlow',
    inputSchema: PersonalizedTypingLessonInputSchema,
    outputSchema: PersonalizedTypingLessonOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

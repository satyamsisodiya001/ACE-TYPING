'use server';

/**
 * @fileOverview Adjusts the difficulty of practice texts based on the user's real-time performance.
 *
 * - adaptDifficulty - A function that adjusts the typing test parameters.
 * - AdaptDifficultyInput - The input type for the adaptDifficulty function.
 * - AdaptDifficultyOutput - The return type for the adaptDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptDifficultyInputSchema = z.object({
  typingSpeedWPM: z.number().describe('The user\u0027s current typing speed in words per minute.'),
  accuracy: z.number().describe('The user\u0027s current typing accuracy as a percentage (0-100).'),
  errorRate: z
    .number()
    .describe('The user\u0027s current typing error rate (number of errors per 100 characters).'),
  currentDifficulty: z
    .number()
    .describe('The current difficulty level of the practice text (e.g., 1-10).'),
});
export type AdaptDifficultyInput = z.infer<typeof AdaptDifficultyInputSchema>;

const AdaptDifficultyOutputSchema = z.object({
  suggestedTextLength: z
    .number()
    .describe('Suggested length of the practice text in characters, based on user performance.'),
  suggestedWPM: z
    .number()
    .describe('Suggested typing speed in words per minute for the next practice text.'),
  suggestedDifficulty: z
    .number()
    .describe('Suggested difficulty level for the next practice text (e.g., 1-10).'),
  reasoning: z.string().describe('Explanation of why the parameters were adjusted.'),
});
export type AdaptDifficultyOutput = z.infer<typeof AdaptDifficultyOutputSchema>;

export async function adaptDifficulty(input: AdaptDifficultyInput): Promise<AdaptDifficultyOutput> {
  return adaptDifficultyFlow(input);
}

const adaptDifficultyPrompt = ai.definePrompt({
  name: 'adaptDifficultyPrompt',
  input: {schema: AdaptDifficultyInputSchema},
  output: {schema: AdaptDifficultyOutputSchema},
  prompt: `You are an AI typing tutor that adjusts the difficulty of practice texts based on the user\u0027s performance.

  Analyze the user\u0027s performance data and provide suggestions for the next practice text.

  Current Typing Speed (WPM): {{{typingSpeedWPM}}}
  Accuracy: {{{accuracy}}}%
  Error Rate: {{{errorRate}}}
  Current Difficulty: {{{currentDifficulty}}}

  Consider the following when adjusting difficulty:

  - If the user\u0027s accuracy is high (above 95%) and typing speed is good, gradually increase the difficulty and text length.
  - If the user\u0027s accuracy is low (below 85%) or error rate is high, decrease the difficulty and text length.
  - Make small adjustments to WPM. It should not deviate more than +/- 10 WPM from the current speed.

  Provide the following in the output:
  - suggestedTextLength: The suggested length of the next practice text.
  - suggestedWPM: The suggested typing speed in WPM for the next practice text.
  - suggestedDifficulty: The suggested difficulty level (1-10) for the next practice text.
  - reasoning: A brief explanation of why the parameters were adjusted.
  `,
});

const adaptDifficultyFlow = ai.defineFlow(
  {
    name: 'adaptDifficultyFlow',
    inputSchema: AdaptDifficultyInputSchema,
    outputSchema: AdaptDifficultyOutputSchema,
  },
  async input => {
    const {output} = await adaptDifficultyPrompt(input);
    return output!;
  }
);

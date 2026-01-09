"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generatePersonalizedLesson,
  type PersonalizedTypingLessonOutput,
} from "@/ai/flows/personalized-typing-lessons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import TypingTest from "../typing/typing-test";

const formSchema = z.object({
  typingSpeedWPM: z.coerce
    .number()
    .min(0, "WPM must be positive")
    .max(300, "WPM seems too high"),
  accuracy: z.coerce
    .number()
    .min(0, "Accuracy must be between 0 and 100")
    .max(100, "Accuracy must be between 0 and 100"),
  errorAnalysis: z
    .string()
    .min(10, "Please describe your errors in more detail.")
    .max(500, "Description is too long."),
  preferredLessonLength: z.enum(["short", "medium", "long"]),
});

export default function LessonGenerator() {
  const [lesson, setLesson] = useState<PersonalizedTypingLessonOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typingSpeedWPM: 60,
      accuracy: 95,
      errorAnalysis: "I often mistype 'the' as 'teh' and struggle with keys on the top row like 'q' and 'p'.",
      preferredLessonLength: "medium",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLesson(null);
    try {
      const result = await generatePersonalizedLesson(values);
      setLesson(result);
    } catch (error) {
      console.error("Failed to generate lesson:", error);
      // Here you could use a toast to show an error message
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="typingSpeedWPM"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Typing Speed (WPM)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accuracy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accuracy (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="errorAnalysis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Common Errors</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I struggle with the 's' key, often hitting 'a' or 'd' instead."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the keys or words you often mistype.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredLessonLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Length</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a lesson length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="long">Long</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Lesson
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="lg:col-span-1">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="font-headline">Your Custom Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">
                  Our AI is crafting your personalized lesson...
                </p>
              </div>
            )}
            {!isLoading && lesson && (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold">Lesson Focus:</h3>
                  <p className="text-muted-foreground">{lesson.lessonFocus}</p>
                </div>
                <TypingTest initialPhrase={lesson.lessonText} />
              </div>
            )}
            {!isLoading && !lesson && (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Sparkles className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Your generated lesson will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

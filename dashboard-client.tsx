"use client";

import React from "react";
import StatsCard from "./stats-card";
import { BarChart3, Bot, Calendar, Clock, GitCommit, Zap } from "lucide-react";
import ProgressChart from "./progress-chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const MOCK_DATA = {
  bestWpm: 85,
  avgWpm: 72,
  avgAcc: 96,
  testsTaken: 128,
  timeTyping: "12h 34m",
  lessonsCompleted: 15,
};

const MOCK_CHART_DATA = [
    { date: "Jan", wpm: 45, accuracy: 92 },
    { date: "Feb", wpm: 52, accuracy: 94 },
    { date: "Mar", wpm: 60, accuracy: 95 },
    { date: "Apr", wpm: 68, accuracy: 96 },
    { date: "May", wpm: 72, accuracy: 96 },
    { date: "Jun", wpm: 75, accuracy: 97 },
];


export default function DashboardClient() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="grid grid-cols-2 gap-6 lg:col-span-3">
        <StatsCard
          title="Best WPM"
          value={MOCK_DATA.bestWpm}
          icon={Zap}
          description="Your personal best"
        />
        <StatsCard
          title="Average WPM"
          value={MOCK_DATA.avgWpm}
          icon={BarChart3}
          description="Across all tests"
        />
        <StatsCard
          title="Average Accuracy"
          value={`${MOCK_DATA.avgAcc}%`}
          icon={GitCommit}
          description="Precision is key"
        />
        <StatsCard
          title="Tests Taken"
          value={MOCK_DATA.testsTaken}
          icon={Calendar}
          description="Practice makes perfect"
        />
      </div>

      <div className="lg:col-span-3">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <ProgressChart data={MOCK_CHART_DATA} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

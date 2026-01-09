"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Timer, Target, AlertCircle, Zap } from "lucide-react";
import type { TypingStats } from "@/lib/types";

interface StatsDisplayProps {
  stats: TypingStats;
}

const StatItem = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
}) => (
  <div className="flex flex-col items-center gap-2 rounded-lg bg-secondary/50 p-4 text-secondary-foreground">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <span className="font-headline text-3xl font-bold">{value}</span>
    </div>
    <span className="text-sm uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
  </div>
);

export default function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="grid grid-cols-2 gap-4 p-0 md:grid-cols-4">
        <StatItem icon={Zap} value={stats.wpm} label="WPM" />
        <StatItem icon={Target} value={`${stats.acc}%`} label="Accuracy" />
        <StatItem icon={Timer} value={stats.time} label="Time" />
        <StatItem icon={AlertCircle} value={stats.errors} label="Errors" />
      </CardContent>
    </Card>
  );
}

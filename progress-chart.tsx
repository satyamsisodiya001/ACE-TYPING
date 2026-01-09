"use client"

import * as React from "react"
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
  wpm: {
    label: "WPM",
    color: "hsl(var(--chart-1))",
  },
  accuracy: {
    label: "Accuracy",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function ProgressChart({ data }: { data: any[] }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis 
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={6}
            domain={[0, 'dataMax + 20']}
        />
        <YAxis 
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={6}
            domain={[80, 100]}
            tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="wpm"
          type="monotone"
          stroke="var(--color-wpm)"
          strokeWidth={2}
          dot={false}
          yAxisId="left"
        />
        <Line
          dataKey="accuracy"
          type="monotone"
          stroke="var(--color-accuracy)"
          strokeWidth={2}
          dot={false}
          yAxisId="right"
        />
      </LineChart>
    </ChartContainer>
  )
}

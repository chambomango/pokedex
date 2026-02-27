"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A horizontal bar chart";

const chartConfig = {
  value: {
    label: "value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function PokemonStatsChart({
  chartData,
  barColor,
  footerText,
}: {
  chartData: { key: string; value: number }[];
  barColor: string;
  footerText: string;
}) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Base Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="value" domain={[0, 255]} />
              <YAxis
                dataKey="key"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Bar
                dataKey="value"
                fill={barColor}
                radius={2}
                barSize={20}
                label={{ position: "right" }}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      {footerText ? (
        <CardFooter className="text-sm text-muted-foreground">
          {footerText}
        </CardFooter>
      ) : null}
    </Card>
  );
}

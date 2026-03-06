import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge = ({ score }: ScoreGaugeProps) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 10 - score },
  ];

  let color = '#ef4444'
  if (score >= 7) color = '#eab308'
  if (score >= 8.5) color = '#22c55e'

  return (
    <div className="h-48 w-full relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={180}
            endAngle={0}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell key="score" fill={color} />
            <Cell key="remaining" fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-0 text-center">
        <div className="text-4xl font-bold text-slate-800">{score}</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Match Score</div>
      </div>
    </div>
  )
}
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { MdOutlinePending } from "react-icons/md"
import { AiOutlineIssuesClose } from "react-icons/ai"
import { TiTick } from "react-icons/ti"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const cards = [
    {
      title: "Projects Completed",
      value: "$1,250.00",
      trend: "Trending up",
      trendIcon: <TiTick />,
      description: "Updated 5m ago",
      color: "from-emerald-500/10"
    },
    {
      title: "Projects Pending",
      value: "1,234",
      trend: "Down 20%",
      trendIcon: <MdOutlinePending />,
      description: "Last 30 days",
      color: "from-blue-500/10"
    },
    {
      title: "Number of Issues",
      value: "45,678",
      trend: "High retention",
      trendIcon: <AiOutlineIssuesClose />,
      description: "Across platforms",
      color: "from-purple-500/10"
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {cards.map((card, index) => (
        <Card key={index} className="group relative overflow-hidden border-none shadow-xl bg-linear-to-br from-card/80 to-card/30 backdrop-blur-xl py-4">
          {/* Decorative highlight */}
          <div className={`absolute top-0 left-0 w-24 h-24 bg-linear-to-br ${card.color} to-transparent blur-2xl -ml-12 -mt-12 transition-opacity group-hover:opacity-100 opacity-50`} />

          <div className="flex items-center gap-4 px-5 relative z-10">
            <div id="trendIcon" className="flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 text-2xl text-primary">
              {card.trendIcon}
            </div>

            <CardHeader id="cardHeader" className="p-0 gap-0">
              <CardDescription className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground/80 whitespace-nowrap">
                {card.title}
              </CardDescription>
              <CardTitle className="text-3xl font-black tracking-tighter tabular-nums mt-1 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
                {card.value}
              </CardTitle>
            </CardHeader>
          </div>
        </Card>
      ))}
    </div>
  )
}

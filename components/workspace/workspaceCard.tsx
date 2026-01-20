import React from "react"
import { Users, Layout, Clock, ChevronRight, MoreHorizontal, Settings2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const workspaces = [
    {
        id: 1,
        name: "Product Design Hub",
        description: "Central workspace for the UX research and UI design team.",
        members: [
            { name: "Alice", image: "https://i.pravatar.cc/150?u=alice", fallback: "AL" },
            { name: "Bob", image: "https://i.pravatar.cc/150?u=bob", fallback: "BO" },
            { name: "Charlie", image: "https://i.pravatar.cc/150?u=charlie", fallback: "CH" },
        ],
        taskCount: 12,
        progress: 65,
        lastUpdate: "2h ago",
        status: "Active",
        color: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-500",
    },
    {
        id: 2,
        name: "Engineering Core",
        description: "Backend development and system architecture planning.",
        members: [
            { name: "David", image: "https://i.pravatar.cc/150?u=david", fallback: "DA" },
            { name: "Eve", image: "https://i.pravatar.cc/150?u=eve", fallback: "EV" },
        ],
        taskCount: 8,
        progress: 40,
        lastUpdate: "5h ago",
        status: "In Progress",
        color: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-500",
    },
    {
        id: 3,
        name: "Marketing & Growth",
        description: "Global campaign management and analytics dashboard.",
        members: [
            { name: "Frank", image: "https://i.pravatar.cc/150?u=frank", fallback: "FR" },
            { name: "Grace", image: "https://i.pravatar.cc/150?u=grace", fallback: "GR" },
            { name: "Hank", image: "https://i.pravatar.cc/150?u=hank", fallback: "HA" },
            { name: "Ivy", image: "https://i.pravatar.cc/150?u=ivy", fallback: "IV" },
        ],
        taskCount: 24,
        progress: 92,
        lastUpdate: "Just now",
        status: "Optimizing",
        color: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-500",
    },
]

interface WorkspaceCardProps {
    onAddClick?: () => void;
}

const WorkspaceCard = ({ onAddClick }: WorkspaceCardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {workspaces.map((workspace) => (
                <Card
                    key={workspace.id}
                    className="group relative overflow-hidden border-none shadow-lg bg-linear-to-br from-card/80 to-card/30 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 border border-white/5"
                >
                    {/* Decorative Background Gradient */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${workspace.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

                    <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                            <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                <Layout className={`size-6 ${workspace.iconColor}`} />
                            </div>
                            <Button variant="ghost" size="icon" className="size-8 rounded-full">
                                <MoreHorizontal className="size-4 text-muted-foreground" />
                            </Button>
                        </div>
                        <div className="mt-4 space-y-1">
                            <CardTitle className="text-xl font-bold tracking-tight text-black">
                                {workspace.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                {workspace.description}
                            </p>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-4">
                        {/* Progress Section */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-muted-foreground uppercase tracking-wider">Project Health</span>
                                <span className="text-black">{workspace.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-linear-to-r ${workspace.color} rounded-full transition-all duration-1000`}
                                    style={{ width: `${workspace.progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Members & Tasks Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-3 overflow-hidden">
                                {workspace.members.map((member, i) => (
                                    <Avatar key={i} className="inline-block size-8 border-2 border-background ring-2 ring-transparent group-hover:ring-primary/10 transition-all">
                                        <AvatarImage src={member.image} />
                                        <AvatarFallback className="text-[10px] bg-muted">{member.fallback}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Clock className="size-3.5" />
                                    <span>{workspace.lastUpdate}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="pt-0 border-t border-white/5 mt-2">
                        <div className="flex items-center justify-between w-full pt-4">
                            <Badge variant="secondary" className="bg-white/5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 border-none text-black">
                                {workspace.status}
                            </Badge>
                            <Button variant="ghost" size="sm" className="group/btn text-xs font-bold gap-1 hover:bg-primary/10 hover:text-primary transition-all">
                                Open Hub <ChevronRight className="size-3.5 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}

            {/* Empty State / Add Card (Optional decorative one) */}
            <Card id="new-card"
                onClick={onAddClick}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group min-h-[300px]"
            >
                <div className="size-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                    <Plus className="size-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-bold text-muted-foreground/50">New Hub</h3>
                <p className="text-xs text-muted-foreground/30 mt-1 uppercase tracking-widest">Connect Project</p>
            </Card>
        </div>
    )
}

import { Plus } from "lucide-react"

export default WorkspaceCard
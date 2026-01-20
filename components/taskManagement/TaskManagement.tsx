"use client";

import React, { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    MoreVertical,
    Plus,
    Calendar,
    Flag,
    CheckCircle2,
    Clock,
    AlertCircle,
    MessageSquare,
    Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Task, INITIAL_TASKS, WORKSPACES } from '@/constants/constants';

export interface Column {
    id: string;
    title: string;
}

const DEFAULT_COLUMNS: Column[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
];


// Components
const TaskCard = ({ task, isOverlay }: { task: Task; isOverlay?: boolean }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const priorityColors = {
        low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        high: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    };

    const priorityIcons = {
        low: <Clock className="w-3 h-3" />,
        medium: <AlertCircle className="w-3 h-3" />,
        high: <Flag className="w-3 h-3" />,
    };

    if (isDragging && !isOverlay) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-slate-100 dark:bg-slate-800/50 h-[120px] rounded-xl mb-3 border-2 border-dashed border-slate-300 dark:border-slate-700"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-3 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-all cursor-grab active:cursor-grabbing",
                isOverlay && "shadow-2xl ring-2 ring-blue-500 border-transparent rotate-2 scale-105"
            )}
        >
            <div className="flex justify-between items-start mb-3">
                <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 uppercase tracking-wider",
                    priorityColors[task.priority]
                )}>
                    {priorityIcons[task.priority]}
                    {task.priority}
                </span>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>

            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {task.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                {task.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border-2 border-white dark:border-slate-900">
                        <AvatarImage src={task.assignee.image} />
                        <AvatarFallback className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {task.assignee.initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{task.dueDate}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    {task.commentsCount > 0 && (
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {task.commentsCount}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const KanbanColumn = ({ column, tasks }: { column: Column; tasks: Task[] }) => {
    const { setNodeRef } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className="flex flex-col w-80 min-w-[320px] h-full bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800/50 transition-colors"
        >
            <div className="flex items-center justify-between mb-4 px-1 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {column.title}
                    </h2>
                    <span className="bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full font-bold shadow-sm">
                        {tasks.length}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-xl bg-slate-50/30 dark:bg-slate-900/10">
                            <Layout className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                            <p className="text-[10px] font-medium text-slate-400 dark:text-slate-600">No tasks yet</p>
                        </div>
                    )}
                </SortableContext>
            </div>
        </div>
    );
};

export default function TaskManagement() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>(WORKSPACES[0].id);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleNewTask = () => {
        toast.success("New task creation", {
            description: "Opening task creation modal...",
        });
    };

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task);
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === 'Task';
        const isOverATask = over.data.current?.type === 'Task';

        if (!isActiveATask) return;

        // Moving between columns while dragging
        if (isOverATask) {
            setTasks((prev) => {
                const activeIndex = prev.findIndex((t) => t.id === activeId);
                const overIndex = prev.findIndex((t) => t.id === overId);

                if (prev[activeIndex].columnId !== prev[overIndex].columnId) {
                    const newTasks = [...prev];
                    newTasks[activeIndex] = {
                        ...newTasks[activeIndex],
                        columnId: prev[overIndex].columnId
                    };
                    return arrayMove(newTasks, activeIndex, overIndex);
                }

                return arrayMove(prev, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === 'Column';

        if (isOverAColumn) {
            setTasks((prev) => {
                const activeIndex = prev.findIndex((t) => t.id === activeId);
                if (prev[activeIndex].columnId !== overId) {
                    const newTasks = [...prev];
                    newTasks[activeIndex] = {
                        ...newTasks[activeIndex],
                        columnId: overId as string
                    };
                    return arrayMove(newTasks, activeIndex, activeIndex);
                }
                return prev;
            });
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const isActiveATask = active.data.current?.type === 'Task';
        const isOverATask = over.data.current?.type === 'Task';
        const isOverAColumn = over.data.current?.type === 'Column';

        if (isActiveATask) {
            setTasks((prev) => {
                const activeIndex = prev.findIndex((t) => t.id === activeId);
                let targetIndex = activeIndex;
                let targetColumnId = prev[activeIndex].columnId;

                if (isOverATask) {
                    const overIndex = prev.findIndex((t) => t.id === overId);
                    targetIndex = overIndex;
                    targetColumnId = prev[overIndex].columnId;
                } else if (isOverAColumn) {
                    targetColumnId = overId as string;
                }

                const newTasks = [...prev];
                const oldColumnId = prev[activeIndex].columnId;
                newTasks[activeIndex] = {
                    ...newTasks[activeIndex],
                    columnId: targetColumnId
                };

                if (oldColumnId !== targetColumnId) {
                    toast.success(`Task moved to ${DEFAULT_COLUMNS.find(c => c.id === targetColumnId)?.title}`);
                }

                return arrayMove(newTasks, activeIndex, targetIndex);
            });
        }
    }

    const filteredTasks = tasks.filter(t => t.workspaceId === selectedWorkspaceId);

    return (
        <div className="p-8 h-screen flex flex-col bg-white dark:bg-[#020617] overflow-hidden">
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-5">
                    <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-500/20 rotate-3">
                        <Layout className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Task Management
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                Drag and drop to organize your workflow
                            </p>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-bold">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{filteredTasks.filter(t => t.columnId === 'done').length} Completed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-1.5 pr-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="flex -space-x-2">
                            {INITIAL_TASKS.slice(0, 4).map((t, i) => (
                                <Avatar key={i} className="w-8 h-8 ring-4 ring-white dark:ring-slate-900 border border-slate-100 dark:border-slate-800">
                                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 text-[10px] font-bold">
                                        {t.assignee.initials}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">+12 more</span>
                    </div>
                    <button
                        onClick={handleNewTask}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 active:scale-95 group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        Add Task
                    </button>
                </div>
            </div>

            {/* Workspace Selection Bar */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                {WORKSPACES.map((workspace) => (
                    <button
                        key={workspace.id}
                        onClick={() => setSelectedWorkspaceId(workspace.id)}
                        className={cn(
                            "px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap border-2",
                            selectedWorkspaceId === workspace.id
                                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 active:scale-95"
                                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400"
                        )}
                    >
                        {workspace.name}
                        <span className={cn(
                            "ml-2 px-1.5 py-0.5 rounded-md text-[10px]",
                            selectedWorkspaceId === workspace.id
                                ? "bg-blue-500 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                        )}>
                            {tasks.filter(t => t.workspaceId === workspace.id).length}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex-1 min-h-0">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDragEnd={onDragEnd}
                >
                    <div className="flex gap-8 h-full overflow-x-auto pb-8 scrollbar-hide select-none">
                        {DEFAULT_COLUMNS.map((column) => (
                            <KanbanColumn
                                key={column.id}
                                column={column}
                                tasks={filteredTasks.filter((t) => t.columnId === column.id)}
                            />
                        ))}
                    </div>

                    <DragOverlay
                        dropAnimation={{
                            sideEffects: defaultDropAnimationSideEffects({
                                styles: {
                                    active: {
                                        opacity: '0.4',
                                    },
                                },
                            }),
                        }}
                    >
                        {activeTask ? (
                            <TaskCard task={activeTask} isOverlay />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}
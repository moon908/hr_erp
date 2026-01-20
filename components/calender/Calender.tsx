"use client";

import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    Settings,
    HelpCircle,
    Menu,
    Calendar as CalendarIcon,
    ChevronDown,
    Clock,
    MoreVertical,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { INITIAL_MEETINGS, INITIAL_TASKS, CalendarEvent } from '@/constants/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const Calender = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)); // Set to May 2024 to match mock data
    const [selectedView, setSelectedView] = useState<'Day' | 'Week' | 'Month' | 'Schedule'>('Month');
    const [activeCalendars, setActiveCalendars] = useState(['Meetings', 'Tasks']);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Generate days for the grid (including padding from prev/next months)
    const calendarDays = [];

    // Padding from previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        calendarDays.push({
            day: prevMonthDays - i,
            month: month - 1,
            year: year,
            isCurrentMonth: false
        });
    }

    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            month: month,
            year: year,
            isCurrentMonth: true
        });
    }

    // Padding for next month to fill 6 rows (42 days)
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
        calendarDays.push({
            day: i,
            month: month + 1,
            year: year,
            isCurrentMonth: false
        });
    }

    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    const getEventsForDay = (day: number, m: number, y: number) => {
        const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const meetings = INITIAL_MEETINGS.filter(meeting => meeting.start.startsWith(dateStr));
        const tasks = INITIAL_TASKS.filter(task => task.dueDate === dateStr);

        return {
            meetings: activeCalendars.includes('Meetings') ? meetings : [],
            tasks: activeCalendars.includes('Tasks') ? tasks : []
        };
    };

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 mr-4">
                        <CalendarIcon className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-medium tracking-tight">Calendar</span>
                    </div>
                    <Button
                        variant="outline"
                        onClick={goToToday}
                        className="rounded-md px-4 font-medium border-slate-200 dark:border-slate-800"
                    >
                        Today
                    </Button>
                    <div className="flex items-center gap-1 ml-2">
                        <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-full h-8 w-8">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-full h-8 w-8">
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                    <h2 className="text-xl font-medium ml-4">
                        {MONTHS[month]} {year}
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-1 mr-4">
                        {['Day', 'Week', 'Month'].map((view) => (
                            <button
                                key={view}
                                onClick={() => setSelectedView(view as any)}
                                className={cn(
                                    "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                                    selectedView === view
                                        ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600"
                                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                                )}
                            >
                                {view}
                            </button>
                        ))}
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800 p-4 gap-8">
                    <Button className="w-full justify-start gap-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm h-12 rounded-full px-6 group transition-all">
                        <Plus className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Create</span>
                        <ChevronDown className="w-4 h-4 ml-auto text-slate-400" />
                    </Button>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-2">
                            My Calendars
                        </h3>
                        <div className="space-y-1">
                            {[
                                { id: 'Meetings', color: 'bg-blue-500' },
                                { id: 'Tasks', color: 'bg-emerald-500' },
                                { id: 'Reminders', color: 'bg-purple-500' },
                                { id: 'Birthdays', color: 'bg-orange-500' }
                            ].map((cal) => (
                                <label key={cal.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer group transition-colors">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={activeCalendars.includes(cal.id)}
                                            onChange={() => {
                                                if (activeCalendars.includes(cal.id)) {
                                                    setActiveCalendars(activeCalendars.filter(id => id !== cal.id));
                                                } else {
                                                    setActiveCalendars([...activeCalendars, cal.id]);
                                                }
                                            }}
                                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cal.id}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto mb-12 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Next Meeting</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Team Sync</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">10:00 AM - 11:30 AM</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">
                        {DAYS.map((day) => (
                            <div key={day} className="py-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="flex-1 grid grid-cols-7 grid-rows-6 auto-rows-fr overflow-y-auto scrollbar-hide">
                        {calendarDays.map((date, idx) => {
                            const { meetings, tasks } = getEventsForDay(date.day, date.month, date.year);
                            const isToday = new Date().toDateString() === new Date(date.year, date.month, date.day).toDateString();

                            return (
                                <div
                                    key={idx}
                                    className={cn(
                                        "border-r border-b border-slate-100 dark:border-slate-800/50 p-2 min-h-[120px] transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/20",
                                        !date.isCurrentMonth && "bg-slate-50/30 dark:bg-slate-900/10"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className={cn(
                                            "w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all",
                                            isToday
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-115"
                                                : date.isCurrentMonth ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"
                                        )}>
                                            {date.day}
                                        </div>
                                    </div>

                                    <div className="space-y-1 overflow-hidden">
                                        {meetings.map((meeting) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={meeting.id}
                                                className={cn(
                                                    "px-2 py-1 rounded text-[10px] font-bold truncate transition-all cursor-pointer hover:brightness-110",
                                                    meeting.color,
                                                    "text-white shadow-sm"
                                                )}
                                            >
                                                {meeting.title}
                                            </motion.div>
                                        ))}
                                        {tasks.map((task) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={task.id}
                                                className="px-2 py-1 bg-emerald-500 dark:bg-emerald-600 rounded text-[10px] font-bold text-white truncate shadow-sm cursor-pointer hover:brightness-110 flex items-center gap-1"
                                            >
                                                <CheckCircle2 className="w-2.5 h-2.5" />
                                                {task.title}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Calender;
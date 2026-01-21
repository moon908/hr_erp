"use client"
import React from 'react'
import { motion } from 'framer-motion'
import {
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    Award,
    Edit,
    Github,
    Twitter,
    Linkedin,
    Globe,
    Star,
    ExternalLink,
    ShieldCheck,
    Link
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Profile = () => {
    const user = {
        name: "Siddharth Chaudhary",
        role: "Senior Product Designer",
        email: "siddharth.chaudhary@example.com",
        phone: "+91 98765 43210",
        location: "New Delhi, India",
        department: "Product & Design",
        joinDate: "January 2023",
        bio: "Passionate about creating user-centric designs and building seamless digital experiences. Expertise in UI/UX design, brand identity, and design systems. Currently leading the design team at HR ERP.",
        skills: ["UI/UX Design", "Figma", "React", "Design Systems", "Prototyping", "User Research", "Adobe Suite", "Tailwind CSS"],
        stats: [
            { label: "Projects Completed", value: "5", icon: <Briefcase className="w-4 h-4" /> },
            { label: "Active Task", value: "12", icon: <Star className="w-4 h-4 text-yellow-500" /> },
            { label: "Experience", value: "5yr+", icon: <Award className="w-4 h-4 text-blue-500" /> }
        ],
        socials: {
            github: "github.com/siddharth",
            linkedin: "linkedin.com/in/siddharth",
            twitter: "twitter.com/siddharth"
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50/50 text-zinc-900 p-4 md:p-8 selection:bg-indigo-500/30">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto space-y-8"
            >
                {/* Header Section */}
                <div className="relative rounded-[2rem] overflow-hidden bg-white border border-zinc-200 shadow-xl">
                    {/* Header Background */}
                    <div className="h-48 md:h-64 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500" />
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]" />
                        <div className="absolute inset-0 bg-grid-black/[0.05]" />
                    </div>

                    <div className="px-6 pb-8 md:px-10 md:pb-10">
                        <div className="relative -mt-20 md:-mt-24 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <Avatar className="w-40 h-40 md:w-48 md:h-48 border-4 border-white rounded-3xl shadow-xl">
                                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop" alt={user.name} />
                                    <AvatarFallback className="text-4xl bg-zinc-100 text-zinc-900 font-bold">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>

                            <div className="flex-1 space-y-3 pb-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-3">
                                    <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">{user.name}</h1>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-zinc-600">
                                    <span className="flex items-center gap-2 text-lg font-medium text-indigo-600">
                                        <Briefcase className="w-5 h-5" />
                                        {user.role}
                                    </span>
                                    <span className="hidden md:block w-1 h-1 rounded-full bg-zinc-300" />
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-zinc-400" />
                                        {user.location}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full md:w-auto">
                                <Button variant="outline" className="flex-1 md:flex-none border-zinc-200 hover:bg-zinc-50 text-zinc-700 cursor-pointer">
                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                </Button>
                                <Button className="flex-1 md:flex-none bg-zinc-900 text-white hover:bg-zinc-800 font-semibold px-8 shadow-lg shadow-zinc-200 cursor-pointer">
                                    Connect
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {user.stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="bg-white border border-zinc-200 p-6 rounded-2xl flex items-center gap-5 hover:border-indigo-300 hover:shadow-lg transition-all group"
                        >
                            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-500 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                                <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Story/Bio */}
                        <Card className="bg-white border-zinc-200 rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-zinc-900">About Me</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-600 leading-relaxed text-lg">
                                    {user.bio}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Expertise */}
                        <Card className="bg-white border-zinc-200 rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    Core Expertise
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, idx) => (
                                        <Badge
                                            key={idx}
                                            variant="secondary"
                                            className="bg-zinc-100 hover:bg-indigo-50 text-zinc-700 hover:text-indigo-600 border-transparent hover:border-indigo-100 px-4 py-1.5 rounded-lg transition-all cursor-default"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        {/* Organization Info */}
                        <Card className="bg-white border-zinc-200 rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-zinc-900">Organization</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {[
                                    { icon: Globe, label: "Department", value: user.department },
                                    { icon: Calendar, label: "Member Since", value: user.joinDate },
                                    { icon: Mail, label: "Work Email", value: user.email },
                                    { icon: Phone, label: "Direct Phone", value: user.phone },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-zinc-50 text-indigo-500 mt-1">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{item.label}</p>
                                            <p className="text-sm font-semibold text-zinc-700 mt-0.5 break-all">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Social Connect */}
                        <Card className="bg-white border-zinc-200 rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-zinc-900">Social Presence</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-3 text-zinc-400">
                                {[
                                    { icon: Github, label: "GitHub" },
                                    { icon: Linkedin, label: "LinkedIn" },
                                    { icon: Twitter, label: "Twitter" },
                                ].map((social, idx) => (
                                    <Button key={idx} variant="outline" className="h-12 border-zinc-200 hover:bg-zinc-50 hover:text-indigo-600 transition-all">
                                        <social.icon className="w-5 h-5" />
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Profile


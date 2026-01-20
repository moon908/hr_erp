
export type Priority = 'low' | 'medium' | 'high';

export interface Workspace {
    id: string;
    name: string;
    icon?: string;
}

export interface Task {
    id: string;
    columnId: string;
    workspaceId: string;
    title: string;
    description: string;
    priority: Priority;
    assignee: {
        name: string;
        image?: string;
        initials: string;
    };
    dueDate: string;
    commentsCount: number;
}

export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    start: string; // ISO string or YYYY-MM-DD HH:mm
    end: string;
    type: 'meeting' | 'task' | 'deadline';
    color: string;
}

export const WORKSPACES: Workspace[] = [
    { id: 'engineering', name: 'Engineering' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'design', name: 'Design' },
    { id: 'product', name: 'Product' },
];

export const INITIAL_TASKS: Task[] = [
    // Engineering
    {
        id: '1',
        columnId: 'todo',
        workspaceId: 'engineering',
        title: 'Design System Update',
        description: 'Update the primary color palette and component tokens.',
        priority: 'high',
        assignee: { name: 'Alex Doe', initials: 'AD' },
        dueDate: '2024-05-20',
        commentsCount: 3,
    },
    {
        id: '2',
        columnId: 'todo',
        workspaceId: 'engineering',
        title: 'Auth Integration',
        description: 'Implement Clerk authentication for the dashboard.',
        priority: 'medium',
        assignee: { name: 'Sam Smith', initials: 'SS' },
        dueDate: '2024-05-22',
        commentsCount: 1,
    },
    // Marketing
    {
        id: '3',
        columnId: 'in-progress',
        workspaceId: 'marketing',
        title: 'Landing Page Revamp',
        description: 'Create a more engaging hero section with animations.',
        priority: 'high',
        assignee: { name: 'Jane Wilson', initials: 'JW' },
        dueDate: '2024-05-18',
        commentsCount: 8,
    },
    {
        id: '4',
        columnId: 'review',
        workspaceId: 'engineering',
        title: 'Bug: Sidebar Layout',
        description: 'Fix the overflow issue on mobile devices.',
        priority: 'low',
        assignee: { name: 'Bob Brown', initials: 'BB' },
        dueDate: '2024-05-15',
        commentsCount: 2,
    },
    {
        id: '5',
        columnId: 'done',
        workspaceId: 'engineering',
        title: 'Project Setup',
        description: 'Initialize Next.js project with Tailwind CSS.',
        priority: 'medium',
        assignee: { name: 'Jane Wilson', initials: 'JW' },
        dueDate: '2024-05-10',
        commentsCount: 0,
    },
    // Design
    {
        id: '6',
        columnId: 'todo',
        workspaceId: 'design',
        title: 'Logo Redesign',
        description: 'Explore new concepts for the company logo.',
        priority: 'high',
        assignee: { name: 'Aditi Sharma', initials: 'AS' },
        dueDate: '2024-06-01',
        commentsCount: 5,
    },
    {
        id: '7',
        columnId: 'in-progress',
        workspaceId: 'design',
        title: 'Mobile App Mockups',
        description: 'Finalize the UI mockups for the new mobile companion app.',
        priority: 'medium',
        assignee: { name: 'Aditi Sharma', initials: 'AS' },
        dueDate: '2024-06-05',
        commentsCount: 2,
    },
    // Product
    {
        id: '8',
        columnId: 'todo',
        workspaceId: 'product',
        title: 'Roadmap Planning Q3',
        description: 'Define key milestones and features for the next quarter.',
        priority: 'high',
        assignee: { name: 'Raj Patel', initials: 'RP' },
        dueDate: '2024-06-15',
        commentsCount: 10,
    }
];

export const INITIAL_MEETINGS: CalendarEvent[] = [
    {
        id: 'm1',
        title: 'Team Sync',
        description: 'Weekly team synchronization meeting',
        start: '2024-05-20T10:00:00',
        end: '2024-05-20T11:00:00',
        type: 'meeting',
        color: 'bg-blue-500'
    },
    {
        id: 'm2',
        title: 'Design Review',
        description: 'Reviewing new UI mockups',
        start: '2024-05-21T14:00:00',
        end: '2024-05-21T15:30:00',
        type: 'meeting',
        color: 'bg-purple-500'
    },
    {
        id: 'm3',
        title: 'Product Roadmap',
        description: 'Planning for Q3 milestones',
        start: '2024-05-22T09:00:00',
        end: '2024-05-22T10:30:00',
        type: 'meeting',
        color: 'bg-emerald-500'
    },
    {
        id: 'm4',
        title: 'Client Demo',
        description: 'Showing the latest features to the client',
        start: '2024-05-18T16:00:00',
        end: '2024-05-18T17:00:00',
        type: 'meeting',
        color: 'bg-orange-500'
    },
    {
        id: 'm5',
        title: 'Engineering Sprint Planning',
        description: 'Setting goals for the next sprint',
        start: '2024-05-24T11:00:00',
        end: '2024-05-24T12:30:00',
        type: 'meeting',
        color: 'bg-blue-600'
    }
];

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    email: string;
    department: string;
    initials: string;
    image?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: '1',
        name: 'Alex Doe',
        role: 'Senior Frontend Developer',
        email: 'alex.doe@example.com',
        department: 'Engineering',
        initials: 'AD'
    },
    {
        id: '2',
        name: 'Jane Wilson',
        role: 'Marketing Lead',
        email: 'jane.wilson@example.com',
        department: 'Marketing',
        initials: 'JW'
    },
    {
        id: '3',
        name: 'Sam Smith',
        role: 'Backend Engineer',
        email: 'sam.smith@example.com',
        department: 'Engineering',
        initials: 'SS'
    },
    {
        id: '4',
        name: 'Aditi Sharma',
        role: 'UI/UX Designer',
        email: 'aditi.sharma@example.com',
        department: 'Design',
        initials: 'AS'
    },
    {
        id: '5',
        name: 'Raj Patel',
        role: 'Product Manager',
        email: 'raj.patel@example.com',
        department: 'Product',
        initials: 'RP'
    },
    {
        id: '6',
        name: 'Bob Brown',
        role: 'QA Engineer',
        email: 'bob.brown@example.com',
        department: 'Engineering',
        initials: 'BB'
    },
    {
        id: '7',
        name: 'John Doe',
        role: 'Senior Frontend Developer',
        email: 'john.doe@example.com',
        department: 'Product',
        initials: 'JD'
    },
    {
        id: '8',
        name: "Deepak Patel",
        role: "Marketing Manager",
        email: "deepak.patel@example.com",
        department: "Marketing",
        initials: "DP",
    },
    {
        id: '9',
        name: "Siddharth Chaudhary",
        role: "Senior Product Designer",
        email: "siddharth.chaudhary@example.com",
        department: "Product",
        initials: "SC",
    },
    {
        id: '10',
        name: "Rajesh Kumar",
        role: "Junior Designer",
        email: "rajesh.kumar@example.com",
        department: "Design",
        initials: "RK",
    }
];
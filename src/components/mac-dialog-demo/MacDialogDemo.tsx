'use client';

import { Button } from '@/components/ui/button';
import {
  MacDialog,
  MacDialogTrigger,
  MacDialogContent,
} from '@/components/ui/dialog';
import React from 'react';
import { VscFileCode } from 'react-icons/vsc';

interface ProjectFile {
  name: string;
  type: string;
}

interface Project {
  name: string;
  description: string;
  status: string;
  startDate: string;
  dueDate: string;
  completion: number;
  team: string[];
  technologies: string[];
  files: ProjectFile[];
}

interface Projects {
  [key: string]: Project;
}

interface SidebarItem {
  name: string;
  type: string;
  id?: string;
  icon?: string;
  active?: boolean;
  color?: string;
}


export function MacFinderDemo() {
  const [open, setOpen] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState('webApp');

  // Project data
  const projects: Projects = {
    webApp: {
      name: 'Web Application',
      description: 'E-commerce platform with user authentication and payment integration',
      status: 'In Progress',
      startDate: '2025-01-15',
      dueDate: '2025-04-30',
      completion: 65,
      team: ['Alex Kim', 'Maya Rodriguez', 'Sam Chen'],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      files: [
        { name: 'Frontend Mockups', type: 'folder' },
        { name: 'Backend API', type: 'folder' },
        { name: 'Database Schema', type: 'folder' },
        { name: 'project-requirements.pdf', type: 'file' },
        { name: 'sprint-planning.docx', type: 'file' },
        { name: 'api-documentation.txt', type: 'file' },
      ],
    },
    mobileApp: {
      name: 'Mobile Application',
      description: 'Fitness tracking app with social features and workout plans',
      status: 'Planning',
      startDate: '2025-03-10',
      dueDate: '2025-07-15',
      completion: 20,
      team: ['Jordan Taylor', 'Priya Patel', 'Liam Johnson'],
      technologies: ['React Native', 'Firebase', 'Redux', 'Google Fit API'],
      files: [
        { name: 'UI Concepts', type: 'folder' },
        { name: 'State Management', type: 'folder' },
        { name: 'app-wireframes.pdf', type: 'file' },
        { name: 'feature-roadmap.docx', type: 'file' },
        { name: 'user-journey.pages', type: 'file' },
      ],
    },
    aiModel: {
      name: 'AI Model Development',
      description: 'Natural language processing model for customer service automation',
      status: 'Completed',
      startDate: '2024-09-05',
      dueDate: '2025-01-20',
      completion: 100,
      team: ['Emma Wilson', 'David Garcia', 'Natalie Chang'],
      technologies: ['Python', 'TensorFlow', 'NLP', 'AWS SageMaker'],
      files: [
        { name: 'Training Data', type: 'folder' },
        { name: 'Model Versions', type: 'folder' },
        { name: 'Evaluation Results', type: 'folder' },
        { name: 'architecture-diagram.pdf', type: 'file' },
        { name: 'performance-metrics.docx', type: 'file' },
        { name: 'deployment-guide.txt', type: 'file' },
      ],
    },
    dataAnalytics: {
      name: 'Data Analytics Dashboard',
      description: 'Business intelligence dashboard for marketing performance metrics',
      status: 'In Review',
      startDate: '2024-11-12',
      dueDate: '2025-02-28',
      completion: 90,
      team: ['Oliver Brown', 'Sophia Martinez', 'Ethan Wright'],
      technologies: ['D3.js', 'Python', 'SQL', 'Tableau'],
      files: [
        { name: 'Data Sources', type: 'folder' },
        { name: 'Visualization Components', type: 'folder' },
        { name: 'dashboard-mockups.pdf', type: 'file' },
        { name: 'data-mapping.docx', type: 'file' },
        { name: 'user-feedback.txt', type: 'file' },
      ],
    },
    blockchainDapp: {
      name: 'Blockchain dApp',
      description: 'Decentralized application for secure document verification',
      status: 'Not Started',
      startDate: '2025-04-15',
      dueDate: '2025-08-30',
      completion: 0,
      team: ['Zoe Thompson', 'Ryan Lee', 'Ava Patel'],
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      files: [
        { name: 'Smart Contracts', type: 'folder' },
        { name: 'Frontend', type: 'folder' },
        { name: 'project-proposal.pdf', type: 'file' },
        { name: 'technical-specs.docx', type: 'file' },
      ],
    },
  };

  const sidebar: SidebarItem[] = [
    { name: 'Projects', type: 'header' },
    { name: 'Web Application', id: 'webApp', type: 'project', icon: 'web', active: activeProject === 'webApp' },
    {
      name: 'Mobile Application',
      id: 'mobileApp',
      type: 'project',
      icon: 'mobile',
      active: activeProject === 'mobileApp',
    },
    { name: 'AI Model Development', id: 'aiModel', type: 'project', icon: 'ai', active: activeProject === 'aiModel' },
    {
      name: 'Data Analytics Dashboard',
      id: 'dataAnalytics',
      type: 'project',
      icon: 'analytics',
      active: activeProject === 'dataAnalytics',
    },
    {
      name: 'Blockchain dApp',
      id: 'blockchainDapp',
      type: 'project',
      icon: 'blockchain',
      active: activeProject === 'blockchainDapp',
    },
    { name: 'Status', type: 'header' },
    { name: 'In Progress', type: 'status', color: 'blue' },
    { name: 'Completed', type: 'status', color: 'green' },
    { name: 'In Review', type: 'status', color: 'yellow' },
    { name: 'Planning', type: 'status', color: 'purple' },
    { name: 'Not Started', type: 'status', color: 'gray' },
  ];

  // Function to render the appropriate icon
  const renderIcon = (type: string, name: string, icon?: string) => {
    if (type === 'folder') {
      return (
        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd" />
        </svg>
      );
    } else if (type === 'file') {
      let iconColor = 'text-gray-400';
      if (name.endsWith('.pdf')) iconColor = 'text-red-500';
      else if (name.endsWith('.docx') || name.endsWith('.txt')) iconColor = 'text-blue-400';
      else if (name.endsWith('.pages')) iconColor = 'text-green-500';

      return (
        <svg className={`w-5 h-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd" />
        </svg>
      );
    } else if (type === 'header') {
      return null;
    } else if (type === 'project') {
      // Handle project icons
      switch (icon) {
        case 'web':
          return (
            <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    clipRule="evenodd" />
            </svg>
          );
        case 'mobile':
          return (
            <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd" />
            </svg>
          );
        case 'ai':
          return (
            <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd" />
            </svg>
          );
        case 'analytics':
          return (
            <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          );
        case 'blockchain':
          return (
            <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                    clipRule="evenodd" />
            </svg>
          );
        default:
          return (
            <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          );
      }
    }
    return null;
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-500';
      case 'Completed':
        return 'bg-green-500';
      case 'In Review':
        return 'bg-yellow-500';
      case 'Planning':
        return 'bg-purple-500';
      case 'Not Started':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get completion bar color
  const getCompletionColor = (completion: number): string => {
    if (completion >= 80) return 'bg-green-500';
    if (completion >= 50) return 'bg-blue-500';
    if (completion >= 20) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <MacDialog
      initialPosition={{ x: 100, y: 50 }}
      initialSize={{ width: 900, height: 600 }}
      title="Project Manager"
      className="z-[1000]"
      open={open}
      onOpenChange={setOpen}
    >
      <MacDialogTrigger asChild>
        <Button
          variant="none"
          className="flex gap-2 items-center"
          onClick={() => setOpen(true)}
        >
          <VscFileCode size={18} />
        </Button>
      </MacDialogTrigger>

      {open && (
        <div className="flex flex-col h-full w-full select-none">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-secondary text-primary-foreground border-b">
            <div className="flex space-x-2">
              <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="flex space-x-2">
              <button className="p-1 rounded hover:bg-mainOrange">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-secondary p-2 flex flex-col gap-1 overflow-y-auto border-r">
              {sidebar.map((item, index) => (
                <div key={index} className="mt-1">
                  {item.type === 'header' ? (
                    <div className="text-xs font-semibold text-gray-500 uppercase px-2 mt-2">{item.name}</div>
                  ) : item.type === 'status' ? (
                    <div className={`flex items-center px-2 py-1 rounded hover:bg-background text-sm cursor-pointer`}>
                      <div className={`w-3 h-3 rounded-full bg-${item.color}-500 mr-2`}></div>
                      <span>{item.name}</span>
                    </div>
                  ) : (
                    <div
                      className={`flex items-center px-2 py-1 rounded ${item.active ? 'bg-mainOrange text-white' : 'hover:bg-background '} text-sm cursor-pointer`}
                      onClick={() => setActiveProject(item?.id ?? '')}
                    >
                      <span className="w-5 h-5 flex items-center justify-center">
                        {renderIcon(item.type, item.name, item.icon)}
                      </span>
                      <span className="ml-2">{item.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Project details area */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-primary">
              {activeProject && (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-primary-foreground">{projects[activeProject].name}</h2>
                      <p className="text-primary-foreground/20 mt-1">{projects[activeProject].description}</p>
                    </div>
                    <div
                      className={`${getStatusColor(projects[activeProject].status)} text-white px-3 py-1 rounded-full text-sm`}>
                      {projects[activeProject].status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-background shadow p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-primary-foreground mb-3">Timeline</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="font-medium">{projects[activeProject].startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Due Date</p>
                          <p className="font-medium">{projects[activeProject].dueDate}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm text-gray-500">Completion</p>
                          <p className="text-sm font-medium">{projects[activeProject].completion}%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${getCompletionColor(projects[activeProject].completion)} h-2 rounded-full`}
                               style={{ width: `${projects[activeProject].completion}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background shadow p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-primary-foreground mb-3">Team Members</h3>
                      <div className="space-y-2">
                        {projects[activeProject].team.map((member, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                              {member.split(' ').map(name => name[0]).join('')}
                            </div>
                            <span className="ml-2 text-primary-foreground">{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary-foreground mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeProject].technologies.map((tech, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary-foreground mb-3">Project Files</h3>
                    <div className="bg-background shadow rounded-lg overflow-hidden">
                      {projects[activeProject].files.map((file, index) => (
                        <div key={index} className="flex items-center p-3 hover:bg-background border-b last:border-b-0">
                          {renderIcon(file.type, file.name)}
                          <span className="ml-3 text-primary-foreground">{file.name}</span>
                          {file.type === 'folder' && (
                            <svg className="w-4 h-4 ml-auto text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MacDialog>
  );
}

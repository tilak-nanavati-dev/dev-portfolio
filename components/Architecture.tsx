
import React from 'react';
import Section from './Section';

const DiagramNode: React.FC<{ label: string; icon: string; className?: string }> = ({ label, icon, className }) => (
    <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 text-accent flex items-center justify-center border-2 border-accent/50">
            <i className={`fas ${icon} text-2xl`}></i>
        </div>
        <p className="mt-2 text-sm font-semibold max-w-[100px]">{label}</p>
    </div>
);

const Arrow: React.FC<{ right?: boolean; down?: boolean; className?: string }> = ({ right, down, className }) => {
    let iconClass = 'fa-arrow-right';
    if(down) iconClass = 'fa-arrow-down';
    
    return (
        <div className={`text-gray-400 dark:text-gray-500 text-2xl flex items-center justify-center ${className}`}>
            <i className={`fas ${iconClass}`}></i>
        </div>
    );
};


const Architecture: React.FC = () => {
  return (
    <Section id="architecture">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Core Architecture Expertise</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Designing robust and scalable systems for AI and data analytics.</p>
      </div>
      <div className="space-y-20">
        
        {/* Data Ingestion Pipeline */}
        <div>
            <h3 className="text-xl font-semibold text-center mb-8">Scalable Data Ingestion & Analytics Pipeline</h3>
            <div className="p-6 bg-light-card dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                 <div className="grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-items-center">
                    <DiagramNode label="70+ Data Sources" icon="fa-sitemap" />
                    <Arrow right className="hidden md:flex"/>
                    <Arrow down className="md:hidden col-span-3"/>
                    <DiagramNode label="Ingestion & Processing" icon="fa-gears" />
                    <Arrow right className="hidden md:flex"/>
                    <Arrow down className="md:hidden col-span-3"/>
                    <DiagramNode label="Optimized SQL Data Warehouse" icon="fa-server" />
                    <Arrow right className="hidden md:flex"/>
                    <Arrow down className="md:hidden col-span-3"/>
                    <DiagramNode label="Spring Boot APIs" icon="fa-bolt" />
                    <Arrow right className="hidden md:flex"/>
                    <Arrow down className="md:hidden col-span-3"/>
                    <DiagramNode label="Next.js Dashboards" icon="fa-chart-line" />
                </div>
            </div>
        </div>

        {/* RAG Architecture */}
        <div>
            <h3 className="text-xl font-semibold text-center mb-8">AI & Retrieval-Augmented Generation (RAG) Pipeline</h3>
            <div className="p-6 bg-light-card dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-items-center">
                    <DiagramNode label="User Query" icon="fa-comment-dots" />
                    <Arrow right className="hidden md:flex"/>
                    <Arrow down className="md:hidden col-span-3"/>
                    <DiagramNode label="Embed & Search" icon="fa-magnifying-glass" />
                    <Arrow right className="hidden md:flex"/>
                    <Arrow down className="md:hidden col-span-3"/>
                    <DiagramNode label="Vector Database" icon="fa-database" />
                    <Arrow right className="hidden md:flex"/>
                    <Arrow down className="md:hidden col-span-3"/>
                    <DiagramNode label="Context-Aware LLM" icon="fa-robot" />
                    <Arrow right className="hidden md:flex"/>
                    <Arrow down className="md:hidden col-span-3"/>
                    <DiagramNode label="Intelligent Response" icon="fa-lightbulb" />
                </div>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default Architecture;

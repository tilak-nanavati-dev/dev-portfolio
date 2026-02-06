
import React from 'react';
import Section from './Section';
import { CERTIFICATIONS } from '../constants';

const Certifications: React.FC = () => {
  return (
    <Section id="certifications">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight sm:text-4xl">Certifications</h2>
        <div className="max-w-2xl mx-auto space-y-4">
            {CERTIFICATIONS.map((cert, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-light-card dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-accent text-3xl">
                    <i className="fas fa-award"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{cert.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                </div>
              </div>
            ))}
        </div>
    </Section>
  );
};

export default Certifications;

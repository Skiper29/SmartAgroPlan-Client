import React from 'react';

interface FieldFormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FieldFormSection: React.FC<FieldFormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 lg:col-span-1">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default FieldFormSection;

import React from 'react';
import { parseIrrigationNotes, type ParsedNote } from '../utils/noteParser';
import { cn } from '@/lib/utils';

interface RecommendationNotesProps {
  notes: string;
  className?: string;
}

const NoteItem: React.FC<{ note: ParsedNote }> = ({ note }) => {
  const baseClasses = 'flex items-start gap-3 p-3 rounded-lg text-sm';
  const bgClasses = {
    critical: 'bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500',
    warning: 'bg-orange-50 dark:bg-orange-900/30 border-l-4 border-orange-500',
    info: 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500',
    success: 'bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500',
    weather: 'bg-sky-50 dark:bg-sky-900/30 border-l-4 border-sky-500',
  };

  return (
    <div
      className={cn(
        baseClasses,
        bgClasses[note.type] || bgClasses.info,
        'text-pretty',
      )}
    >
      <note.icon
        className={cn('h-5 w-5 flex-shrink-0 mt-0.5', note.colorClassName)}
        aria-hidden="true"
      />
      <p
        className={cn('flex-1', note.colorClassName.replace('text-', 'text-'))}
      >
        {note.text}
      </p>
    </div>
  );
};

const RecommendationNotes: React.FC<RecommendationNotesProps> = ({
  notes,
  className,
}) => {
  const parsedNotes = parseIrrigationNotes(notes);

  return (
    <div className={cn('space-y-3', className)}>
      {parsedNotes.map((note, index) => (
        <NoteItem key={index} note={note} />
      ))}
    </div>
  );
};

export default RecommendationNotes;

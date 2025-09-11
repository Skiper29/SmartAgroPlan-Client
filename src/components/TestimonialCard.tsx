import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  highlight: string;
  className?: string;
}

export default function TestimonialCard({
  name,
  role,
  location,
  avatar,
  rating,
  quote,
  highlight,
  className,
}: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        'relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full',
        className,
      )}
    >
      <CardContent className="p-8 flex flex-col h-full">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 text-green-200 dark:text-green-400">
          <Quote className="h-8 w-8" />
        </div>

        {/* Avatar and Info */}
        <div className="flex items-center mb-6">
          <div className="text-4xl mr-4 bg-green-50 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center">
            {avatar}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">
              {name}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">{role}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {location}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
          "{quote}"
        </blockquote>

        {/* Highlight Badge - always at the bottom */}
        <div className="mt-auto pt-4">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            {highlight}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

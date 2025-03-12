
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Event } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
  className?: string;
  featured?: boolean;
}

export function EventCard({ 
  event, 
  className,
  featured = false
}: EventCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden card-hover h-full",
        featured && "border-sunflower-200 dark:border-sunflower-900",
        className
      )}
    >
      <div className="aspect-w-16 aspect-h-9 w-full">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover"
        />
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-sunflower-500 text-white hover:bg-sunflower-600">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-spectrum-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-spectrum-500" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-spectrum-500" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="mt-auto pt-2">
          <Link to={`/events/${event.id}`}>
            <Button className="w-full" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

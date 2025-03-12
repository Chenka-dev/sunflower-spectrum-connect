
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Center } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CenterCardProps {
  center: Center;
  className?: string;
  featured?: boolean;
}

export function CenterCard({ 
  center, 
  className,
  featured = false
}: CenterCardProps) {
  return (
    <Link to={`/directory/center/${center.id}`}>
      <Card 
        className={cn(
          "overflow-hidden card-hover h-full",
          featured && "border-sunflower-200 dark:border-sunflower-900",
          className
        )}
      >
        <div className="aspect-w-16 aspect-h-9 w-full">
          <img
            src={center.image}
            alt={center.name}
            className="object-cover transition-all duration-300 hover:scale-105"
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
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{center.name}</h3>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {center.specialties.slice(0, 3).map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {center.description}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground mt-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{center.location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

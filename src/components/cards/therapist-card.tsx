
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Therapist } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TherapistCardProps {
  therapist: Therapist;
  className?: string;
  featured?: boolean;
}

export function TherapistCard({ 
  therapist, 
  className,
  featured = false
}: TherapistCardProps) {
  return (
    <Link to={`/directory/therapist/${therapist.id}`}>
      <Card 
        className={cn(
          "overflow-hidden card-hover h-full",
          featured && "border-sunflower-200 dark:border-sunflower-900",
          className
        )}
      >
        <div className="aspect-w-3 aspect-h-2 w-full">
          <img
            src={therapist.image}
            alt={therapist.name}
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
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{therapist.name}</h3>
          <p className="text-muted-foreground text-sm mb-2">{therapist.title}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {therapist.specialty.slice(0, 3).map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">{therapist.location}</div>
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-sunflower-400 text-sunflower-400 mr-1" />
              <span className="text-sm font-medium">{therapist.rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

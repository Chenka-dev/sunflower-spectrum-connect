
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { BlogPost } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

export function BlogCard({ 
  post, 
  className,
  featured = false
}: BlogCardProps) {
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
    <Link to={`/blog/${post.slug}`}>
      <Card 
        className={cn(
          "overflow-hidden card-hover h-full",
          featured && "border-sunflower-200 dark:border-sunflower-900",
          className
        )}
      >
        <div className="aspect-w-16 aspect-h-9 w-full">
          <img
            src={post.image}
            alt={post.title}
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
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(post.date)}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{post.title}</h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

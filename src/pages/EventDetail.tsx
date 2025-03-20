
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/data";
import { Calendar, Clock, MapPin, User, ArrowLeft, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState(events.find(e => e.id === id));
  const { toast } = useToast();
  
  useEffect(() => {
    // Set document title
    document.title = event ? `${event.title} | Sunflower Spectrum` : "Event Not Found | Sunflower Spectrum";
    
    // Get event data
    const foundEvent = events.find(e => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this event with others"
      });
    }
  };

  if (!event) {
    return (
      <Layout>
        <Container className="py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/events">
              <Button>
                <ArrowLeft className="mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-8 md:py-12">
        {/* Back button and share */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/events">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2" />
              Back to Events
            </Button>
          </Link>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2" />
            Share
          </Button>
        </div>

        {/* Event header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              {event.featured && (
                <Badge className="bg-sunflower-500 text-white hover:bg-sunflower-600 mb-3">
                  Featured
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
            </div>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-spectrum-500" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div>{formatDate(event.date)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-spectrum-500" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div>{event.time}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-spectrum-500" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div>{event.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-spectrum-500" />
                  <div>
                    <div className="font-medium">Organizer</div>
                    <div>{event.organizer}</div>
                  </div>
                </div>

                {event.price && (
                  <div className="pt-2 border-t">
                    <div className="font-medium">Price</div>
                    <div>{event.price}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {event.registrationLink && (
              <div className="pt-4">
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">Register for this Event</Button>
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Event description */}
        <div className="prose prose-lg max-w-full dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4">About this Event</h2>
          <p className="whitespace-pre-line">{event.description}</p>
        </div>
        
        {/* Related events section could be added here */}
      </Container>
    </Layout>
  );
};

export default EventDetail;

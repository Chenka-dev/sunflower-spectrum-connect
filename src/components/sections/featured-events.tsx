
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { events } from "@/lib/data";
import { EventCard } from "@/components/cards/event-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function FeaturedEvents() {
  const featuredEvents = events.filter(e => e.featured);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 fade-in-section bg-muted/50"
    >
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl">
              Join our community events designed to support, educate, and connect the neurodivergent community.
            </p>
          </div>
          
          <Link to="/events" className="mt-4 md:mt-0">
            <Button variant="ghost" className="group">
              View all events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`transition-all duration-500 ease-in-out-cubic ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <EventCard 
                event={event} 
                featured={event.featured} 
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

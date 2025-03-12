
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { EventCard } from "@/components/cards/event-card";
import { events } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Set document title
  useEffect(() => {
    document.title = "Events | Sunflower Spectrum";
  }, []);

  // Handle search
  useEffect(() => {
    const results = events.filter(event => 
      searchTerm === "" || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredEvents(results);
  }, [searchTerm]);

  // Sort events by date (closest first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Layout>
      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12 fade-in-section">
            <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-lg text-muted-foreground">
              Join our community events designed to support, educate, and connect
            </p>
          </div>

          {/* Search */}
          <div className="mb-10 max-w-xl mx-auto fade-in-section">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10 py-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Events listing */}
          <div className="fade-in-section">
            {sortedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    featured={event.featured}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No events found matching your search.
                </p>
                <Button 
                  variant="link" 
                  onClick={() => setSearchTerm("")}
                  className="mt-2"
                >
                  View all events
                </Button>
              </div>
            )}
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Events;

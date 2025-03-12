
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { therapists } from "@/lib/data";
import { TherapistCard } from "@/components/cards/therapist-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function FeaturedTherapists() {
  const featuredTherapists = therapists.filter(t => t.featured);
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
      className="py-16 fade-in-section"
    >
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Therapists</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover specialized therapists with expertise in supporting neurodivergent individuals.
            </p>
          </div>
          
          <Link to="/directory" className="mt-4 md:mt-0">
            <Button variant="ghost" className="group">
              View all therapists
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTherapists.map((therapist, index) => (
            <div
              key={therapist.id}
              className={`transition-all duration-500 ease-in-out-cubic ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <TherapistCard 
                therapist={therapist} 
                featured={therapist.featured} 
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

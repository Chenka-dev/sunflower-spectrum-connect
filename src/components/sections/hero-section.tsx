
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] bg-sunflower-100 dark:bg-sunflower-900/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[70%] bg-spectrum-100 dark:bg-spectrum-900/20 rounded-full blur-3xl opacity-60"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 ease-in-out-cubic ${
              isLoaded 
                ? "opacity-100 transform-none" 
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 bg-sunflower-100 text-sunflower-800 dark:bg-sunflower-900/30 dark:text-sunflower-300 rounded-full">
                <span className="w-2 h-2 rounded-full bg-sunflower-500"></span>
                <span>Supporting Neurodiversity</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              <span className="block">Connecting the</span>
              <span className="text-sunflower-500">Neurodivergent</span> 
              <span className="block">Community</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
              Find therapists, centers, and resources specialized in supporting neurodivergent 
              individuals and their families.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/directory">
                <Button size="lg" className="w-full sm:w-auto">
                  Find a Therapist
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] -left-[5%] w-[30%] h-[60%] bg-sunflower-100 dark:bg-sunflower-900/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[40%] bg-spectrum-100 dark:bg-spectrum-900/20 rounded-full blur-3xl opacity-60"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Sunflower Spectrum Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl">
            Whether you're a therapist who specializes in neurodivergent care or someone seeking support,
            we're here to connect you with resources that make a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/directory">
              <Button size="lg" className="w-full sm:w-auto">
                Find Support
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

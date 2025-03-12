
import { useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  // Set document title
  useEffect(() => {
    document.title = "About Us | Sunflower Spectrum";
  }, []);

  return (
    <Layout>
      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto mb-16 fade-in-section">
            <h1 className="text-4xl font-bold mb-6 text-center">Our Mission</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground text-center mb-8">
                Sunflower Spectrum is dedicated to connecting the neurodivergent community 
                with specialized support, resources, and education to foster understanding and inclusion.
              </p>
              
              <div className="my-12 p-8 rounded-xl bg-muted/50">
                <blockquote className="italic text-xl text-center">
                  "We believe in a world where neurodiversity is recognized not as a deficit, 
                  but as a natural and valuable form of human diversity."
                </blockquote>
              </div>
              
              <h2 className="text-2xl font-bold mt-12 mb-4">Who We Are</h2>
              <p>
                Sunflower Spectrum was founded in 2020 by a group of therapists, educators, 
                and advocates who recognized the need for better resources and connections 
                for the neurodivergent community. Our team includes neurodivergent individuals, 
                family members, and professionals dedicated to improving access to quality care.
              </p>
              
              <h2 className="text-2xl font-bold mt-12 mb-4">What We Do</h2>
              <p>
                We provide a comprehensive directory of therapists and centers specializing 
                in neurodivergent care, making it easier for individuals and families to find 
                the support they need. Additionally, we organize community events and create 
                educational resources to promote understanding and acceptance of neurodiversity.
              </p>
              
              <h2 className="text-2xl font-bold mt-12 mb-4">Our Values</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Neurodiversity Affirmation:</strong> We recognize and celebrate the natural 
                  variations in the human brain and nervous system.
                </li>
                <li>
                  <strong>Accessibility:</strong> We strive to make information and resources accessible 
                  to everyone, regardless of their neurological makeup.
                </li>
                <li>
                  <strong>Community Connection:</strong> We believe in the power of community and 
                  shared experiences to foster growth and understanding.
                </li>
                <li>
                  <strong>Evidence-Based Approach:</strong> We are committed to sharing accurate, 
                  up-to-date information based on current research and best practices.
                </li>
                <li>
                  <strong>Inclusivity:</strong> We welcome and respect all individuals across the 
                  spectrum of neurodiversity and neurotypicality.
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center py-12 fade-in-section">
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our mission to support the neurodivergent community through connection and education.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/directory">
                <Button size="lg" className="w-full sm:w-auto">
                  Find Support
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default About;

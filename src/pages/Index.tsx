
import { useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedTherapists } from "@/components/sections/featured-therapists";
import { FeaturedEvents } from "@/components/sections/featured-events";
import { FeaturedPosts } from "@/components/sections/featured-posts";
import { CTASection } from "@/components/sections/cta-section";

const Index = () => {
  // Set document title
  useEffect(() => {
    document.title = "Sunflower Spectrum | Supporting the Neurodivergent Community";
  }, []);

  return (
    <Layout>
      <HeroSection />
      <FeaturedTherapists />
      <FeaturedEvents />
      <FeaturedPosts />
      <CTASection />
    </Layout>
  );
};

export default Index;

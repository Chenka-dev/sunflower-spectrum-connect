
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Mail, Phone, Globe, Calendar, ArrowLeft } from "lucide-react";
import { Therapist, therapists } from "@/lib/data";
import { cn } from "@/lib/utils";

const TherapistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set document title
    document.title = therapist 
      ? `${therapist.name} | Sunflower Spectrum` 
      : "Therapist Profile | Sunflower Spectrum";
  }, [therapist]);

  useEffect(() => {
    // Find therapist by ID
    const foundTherapist = therapists.find(t => t.id === id);
    setTherapist(foundTherapist || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Container className="py-12">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-pulse text-lg">Loading profile...</div>
          </div>
        </Container>
      </Layout>
    );
  }

  if (!therapist) {
    return (
      <Layout>
        <Container className="py-12">
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-4">Therapist Not Found</h2>
            <p className="text-muted-foreground mb-8">
              We couldn't find the therapist you're looking for.
            </p>
            <Button asChild>
              <Link to="/directory">Return to Directory</Link>
            </Button>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/40 py-12">
        <Container>
          <Link 
            to="/directory" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <Card className="overflow-hidden mb-6">
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 fill-sunflower-400 text-sunflower-400 mr-1" />
                        <span className="font-medium">{therapist.rating}</span>
                        <span className="text-muted-foreground ml-1">({therapist.reviews} reviews)</span>
                      </div>
                      
                      {therapist.featured && (
                        <Badge className="bg-sunflower-500 text-white">Featured</Badge>
                      )}
                    </div>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
                        <span>{therapist.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                        <a href={`mailto:${therapist.contactInfo.email}`} className="hover:text-primary">
                          {therapist.contactInfo.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-muted-foreground mr-3" />
                        <a href={`tel:${therapist.contactInfo.phone}`} className="hover:text-primary">
                          {therapist.contactInfo.phone}
                        </a>
                      </div>
                      
                      {therapist.contactInfo.website && (
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-muted-foreground mr-3" />
                          <a 
                            href={therapist.contactInfo.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <Button className="w-full mt-6">
                      Contact
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-3">Availability</h3>
                    <div className="flex flex-wrap gap-2">
                      {therapist.availability.map(day => (
                        <div
                          key={day}
                          className="flex items-center"
                        >
                          <Calendar className="w-4 h-4 mr-1 text-primary" />
                          <span>{day}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-2">{therapist.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{therapist.title}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {therapist.specialty.map(spec => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
              
              <div className={cn(
                "prose prose-lg max-w-none dark:prose-invert mb-12",
                "prose-headings:font-medium prose-headings:tracking-tight",
                "prose-a:text-primary hover:prose-a:text-primary/80"
              )}>
                <h2>About</h2>
                <p>{therapist.bio}</p>
                
                <h2>Approach</h2>
                <p>
                  As a dedicated {therapist.title} specializing in {therapist.specialty.join(", ")}, 
                  I'm committed to providing personalized care that addresses the unique needs of 
                  each individual I work with. My approach combines evidence-based methodologies 
                  with compassionate understanding of neurodivergent experiences.
                </p>
                
                <h2>Education & Training</h2>
                <ul>
                  <li>PhD in Psychology, University of California</li>
                  <li>Certified in Cognitive Behavioral Therapy</li>
                  <li>Specialized training in Neurodivergent Care</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default TherapistProfile;

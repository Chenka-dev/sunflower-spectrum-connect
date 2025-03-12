
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Globe, Users, ListChecks, ArrowLeft } from "lucide-react";
import { Center, Therapist, centers, therapists } from "@/lib/data";
import { cn } from "@/lib/utils";
import { TherapistCard } from "@/components/cards/therapist-card";

const CenterProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [center, setCenter] = useState<Center | null>(null);
  const [centerTherapists, setCenterTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set document title
    document.title = center 
      ? `${center.name} | Sunflower Spectrum` 
      : "Therapy Center Profile | Sunflower Spectrum";
  }, [center]);

  useEffect(() => {
    // Find center by ID
    const foundCenter = centers.find(c => c.id === id);
    setCenter(foundCenter || null);
    
    // Find therapists associated with this center
    if (foundCenter) {
      const associatedTherapists = therapists.filter(
        therapist => foundCenter.therapists.includes(therapist.id)
      );
      setCenterTherapists(associatedTherapists);
    }
    
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

  if (!center) {
    return (
      <Layout>
        <Container className="py-12">
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-4">Therapy Center Not Found</h2>
            <p className="text-muted-foreground mb-8">
              We couldn't find the therapy center you're looking for.
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

          {/* Center Header */}
          <div className="relative rounded-lg overflow-hidden mb-10">
            <div className="aspect-w-3 aspect-h-1 w-full">
              <img
                src={center.image}
                alt={center.name}
                className="object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 sm:p-10 text-white w-full">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                    {center.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {center.specialties.map(spec => (
                      <Badge key={spec} variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{center.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2">
              <div className={cn(
                "prose prose-lg max-w-none dark:prose-invert mb-12",
                "prose-headings:font-medium prose-headings:tracking-tight",
                "prose-a:text-primary hover:prose-a:text-primary/80"
              )}>
                <h2>About the Center</h2>
                <p>{center.description}</p>
                
                <h2>Our Approach</h2>
                <p>
                  At {center.name}, we're dedicated to providing comprehensive care 
                  for neurodivergent individuals and their families. Our multidisciplinary 
                  team works collaboratively to create personalized treatment plans that 
                  address each client's unique needs and strengths.
                </p>
                
                <h2>Our Team</h2>
                <p>
                  Our center brings together experienced professionals across multiple 
                  disciplines, creating a collaborative environment where clients receive 
                  comprehensive support for their diverse needs.
                </p>
              </div>
              
              {/* Team members */}
              {centerTherapists.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Meet Our Therapists</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {centerTherapists.map(therapist => (
                      <TherapistCard
                        key={therapist.id}
                        therapist={therapist}
                        featured={false}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
                        <span>{center.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                        <a href={`mailto:${center.contactInfo.email}`} className="hover:text-primary">
                          {center.contactInfo.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-muted-foreground mr-3" />
                        <a href={`tel:${center.contactInfo.phone}`} className="hover:text-primary">
                          {center.contactInfo.phone}
                        </a>
                      </div>
                      
                      {center.contactInfo.website && (
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-muted-foreground mr-3" />
                          <a 
                            href={center.contactInfo.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <Button className="w-full mt-6">
                      Schedule a Consultation
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      <span>Staff Size</span>
                    </h3>
                    <p>{centerTherapists.length} specialists</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <ListChecks className="w-5 h-5 mr-2" />
                      <span>Services Offered</span>
                    </h3>
                    <ul className="space-y-2">
                      {center.services.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default CenterProfile;

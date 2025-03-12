
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { TherapistCard } from "@/components/cards/therapist-card";
import { CenterCard } from "@/components/cards/center-card";
import { therapists, centers } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredTherapists, setFilteredTherapists] = useState(therapists);
  const [filteredCenters, setFilteredCenters] = useState(centers);

  // Set document title
  useEffect(() => {
    document.title = "Therapist & Center Directory | Sunflower Spectrum";
  }, []);

  // All possible specialties for filtering
  const allSpecialties = Array.from(
    new Set(
      [
        ...therapists.flatMap(t => t.specialty),
        ...centers.flatMap(c => c.specialties)
      ]
    )
  ).sort();

  // Handle search and filter
  useEffect(() => {
    // Filter therapists
    const therapistResults = therapists.filter(therapist => {
      const matchesSearch = searchTerm === "" || 
        therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapist.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        therapist.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = filters.length === 0 || 
        filters.some(filter => therapist.specialty.includes(filter));
      
      return matchesSearch && matchesFilters;
    });
    
    // Filter centers
    const centerResults = centers.filter(center => {
      const matchesSearch = searchTerm === "" || 
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        center.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = filters.length === 0 || 
        filters.some(filter => center.specialties.includes(filter));
      
      return matchesSearch && matchesFilters;
    });
    
    setFilteredTherapists(therapistResults);
    setFilteredCenters(centerResults);
  }, [searchTerm, filters]);

  // Toggle filter
  const toggleFilter = (specialty: string) => {
    setFilters(prev => 
      prev.includes(specialty)
        ? prev.filter(f => f !== specialty)
        : [...prev, specialty]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilters([]);
  };

  return (
    <Layout>
      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12 fade-in-section">
            <h1 className="text-4xl font-bold mb-4">Find Your Support</h1>
            <p className="text-lg text-muted-foreground">
              Discover therapists and centers specializing in neurodivergent care
            </p>
          </div>

          {/* Search and filters */}
          <div className="mb-10 fade-in-section">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, specialty, or location..."
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

            <div className="flex flex-wrap gap-2 mb-4">
              {allSpecialties.map(specialty => (
                <Badge
                  key={specialty}
                  variant={filters.includes(specialty) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter(specialty)}
                >
                  {specialty}
                  {filters.includes(specialty) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>

            {(searchTerm || filters.length > 0) && (
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-muted-foreground">
                  {filteredTherapists.length} therapists and {filteredCenters.length} centers found
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Tabs for Therapists and Centers */}
          <Tabs defaultValue="therapists" className="fade-in-section">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="therapists">Therapists</TabsTrigger>
              <TabsTrigger value="centers">Centers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="therapists" className="mt-6">
              {filteredTherapists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTherapists.map(therapist => (
                    <TherapistCard
                      key={therapist.id}
                      therapist={therapist}
                      featured={therapist.featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No therapists found with the current filters.
                  </p>
                  <Button 
                    variant="link" 
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="centers" className="mt-6">
              {filteredCenters.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCenters.map(center => (
                    <CenterCard
                      key={center.id}
                      center={center}
                      featured={center.featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No centers found with the current filters.
                  </p>
                  <Button 
                    variant="link" 
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Container>
      </section>
    </Layout>
  );
};

export default Directory;

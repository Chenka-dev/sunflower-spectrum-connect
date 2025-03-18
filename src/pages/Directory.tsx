
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { TherapistCard } from "@/components/cards/therapist-card";
import { CenterCard } from "@/components/cards/center-card";
import { Therapist, Center } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Loader2 } from "lucide-react";
import { fetchTherapists, fetchCenters } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Set document title
  useEffect(() => {
    document.title = "Therapist & Center Directory | Sunflower Spectrum";
  }, []);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [therapistsData, centersData] = await Promise.all([
          fetchTherapists(),
          fetchCenters()
        ]);
        
        setTherapists(therapistsData);
        setCenters(centersData);
        setFilteredTherapists(therapistsData);
        setFilteredCenters(centersData);
        
        toast({
          title: "Data loaded successfully",
          description: `Found ${therapistsData.length} therapists and ${centersData.length} centers`,
          duration: 3000
        });
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load directory data",
          variant: "destructive",
          duration: 4000
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

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
  }, [searchTerm, filters, therapists, centers]);

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
                disabled={loading}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {!loading && allSpecialties.length > 0 && (
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
            )}

            {(searchTerm || filters.length > 0) && !loading && (
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

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 fade-in-section">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-lg text-muted-foreground">Loading directory data...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16 fade-in-section">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}

          {/* Content when data is loaded */}
          {!loading && !error && (
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
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default Directory;

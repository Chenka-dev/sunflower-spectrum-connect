
import { Therapist, Center } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TherapistCard } from "@/components/cards/therapist-card";
import { CenterCard } from "@/components/cards/center-card";
import { Button } from "@/components/ui/button";

interface DirectoryContentProps {
  filteredTherapists: Therapist[];
  filteredCenters: Center[];
  clearFilters: () => void;
}

export function DirectoryContent({
  filteredTherapists,
  filteredCenters,
  clearFilters
}: DirectoryContentProps) {
  return (
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
  );
}

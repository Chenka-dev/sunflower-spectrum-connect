
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterBadgesProps {
  allSpecialties: string[];
  filters: string[];
  toggleFilter: (specialty: string) => void;
  clearFilters: () => void;
  searchTerm: string;
  loading: boolean;
  filteredTherapistsCount: number;
  filteredCentersCount: number;
}

export function FilterBadges({
  allSpecialties,
  filters,
  toggleFilter,
  clearFilters,
  searchTerm,
  loading,
  filteredTherapistsCount,
  filteredCentersCount
}: FilterBadgesProps) {
  if (loading || allSpecialties.length === 0) return null;

  return (
    <>
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
            {filteredTherapistsCount} therapists and {filteredCentersCount} centers found
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </>
  );
}

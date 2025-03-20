
import { useState, useEffect } from "react";
import { Therapist, Center } from "@/lib/data";
import { fetchTherapists, fetchCenters } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

export interface DirectoryData {
  therapists: Therapist[];
  centers: Center[];
  filteredTherapists: Therapist[];
  filteredCenters: Center[];
  searchTerm: string;
  filters: string[];
  loading: boolean;
  error: string | null;
  allSpecialties: string[];
  setSearchTerm: (term: string) => void;
  toggleFilter: (specialty: string) => void;
  clearFilters: () => void;
}

export function useDirectoryData(): DirectoryData {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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

  return {
    therapists,
    centers,
    filteredTherapists,
    filteredCenters,
    searchTerm,
    filters,
    loading,
    error,
    allSpecialties,
    setSearchTerm,
    toggleFilter,
    clearFilters
  };
}

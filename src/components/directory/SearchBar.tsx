
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
}

export function SearchBar({ searchTerm, setSearchTerm, loading }: SearchBarProps) {
  return (
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
  );
}


import { useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { SearchBar } from "@/components/directory/SearchBar";
import { FilterBadges } from "@/components/directory/FilterBadges";
import { LoadingState } from "@/components/directory/LoadingState";
import { ErrorState } from "@/components/directory/ErrorState";
import { DirectoryContent } from "@/components/directory/DirectoryContent";
import { useDirectoryData } from "@/hooks/use-directory-data";

const Directory = () => {
  const {
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
  } = useDirectoryData();

  // Set document title
  useEffect(() => {
    document.title = "Therapist & Center Directory | Sunflower Spectrum";
  }, []);

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
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              loading={loading}
            />

            <FilterBadges
              allSpecialties={allSpecialties}
              filters={filters}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
              searchTerm={searchTerm}
              loading={loading}
              filteredTherapistsCount={filteredTherapists.length}
              filteredCentersCount={filteredCenters.length}
            />
          </div>

          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Error State */}
          {error && !loading && <ErrorState error={error} />}

          {/* Content when data is loaded */}
          {!loading && !error && (
            <DirectoryContent
              filteredTherapists={filteredTherapists}
              filteredCenters={filteredCenters}
              clearFilters={clearFilters}
            />
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default Directory;

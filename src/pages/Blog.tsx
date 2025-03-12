
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/cards/blog-card";
import { blogPosts } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Set document title
  useEffect(() => {
    document.title = "Educational Blog | Sunflower Spectrum";
  }, []);

  // All unique tags from blog posts
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).sort();

  // Handle search and tag filtering
  useEffect(() => {
    const results = blogPosts.filter(post => {
      const matchesSearch = searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = activeTag === null || post.tags.includes(activeTag);
      
      return matchesSearch && matchesTag;
    });
    
    // Sort by date (newest first)
    const sorted = [...results].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setFilteredPosts(sorted);
  }, [searchTerm, activeTag]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setActiveTag(null);
  };

  return (
    <Layout>
      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12 fade-in-section">
            <h1 className="text-4xl font-bold mb-4">Educational Resources</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of articles and resources about neurodiversity
            </p>
          </div>

          {/* Search and filters */}
          <div className="mb-10 fade-in-section">
            <div className="relative mb-6 max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
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

            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={activeTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                >
                  {tag}
                  {activeTag === tag && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>

            {(searchTerm || activeTag) && (
              <div className="flex justify-center items-center mb-6">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Blog posts */}
          <div className="fade-in-section">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    featured={post.featured}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No articles found matching your search.
                </p>
                <Button 
                  variant="link" 
                  onClick={clearFilters}
                  className="mt-2"
                >
                  View all articles
                </Button>
              </div>
            )}
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Blog;

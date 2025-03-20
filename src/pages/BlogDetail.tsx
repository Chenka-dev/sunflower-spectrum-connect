
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";
import { Calendar, ArrowLeft, Share2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(blogPosts.find(p => p.slug === slug));
  const { toast } = useToast();
  
  useEffect(() => {
    // Set document title
    document.title = post ? `${post.title} | Sunflower Spectrum` : "Blog Post Not Found | Sunflower Spectrum";
    
    // Get post data
    const foundPost = blogPosts.find(p => p.slug === slug);
    setPost(foundPost);
  }, [slug]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this article with others"
      });
    }
  };

  if (!post) {
    return (
      <Layout>
        <Container className="py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-8 md:py-12">
        {/* Back button and share */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </Link>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2" />
            Share
          </Button>
        </div>

        {/* Blog post header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            {post.featured && (
              <Badge className="bg-sunflower-500 text-white hover:bg-sunflower-600 mb-3">
                Featured
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-muted-foreground mb-6">
              <User className="h-4 w-4 mr-2" />
              <span className="mr-4">{post.author}</span>
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Blog content */}
        <div className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
          <p className="font-medium text-xl mb-6">{post.excerpt}</p>
          <div className="whitespace-pre-line">{post.content}</div>
        </div>
        
        {/* Related posts section could be added here */}
      </Container>
    </Layout>
  );
};

export default BlogDetail;

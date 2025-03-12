
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t mt-24">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-sunflower-400 flex items-center justify-center">
                <span className="font-bold text-white">SS</span>
              </div>
              <div className="font-semibold text-lg tracking-tight">
                Sunflower Spectrum
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Supporting the neurodivergent community through connection and education.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Directory</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/directory" className="text-muted-foreground hover:text-foreground transition-colors">
                  Search Therapists
                </Link>
              </li>
              <li>
                <Link to="/directory/centers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Treatment Centers
                </Link>
              </li>
              <li>
                <Link to="/directory/specialties" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse by Specialty
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Educational Blog
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Join Our Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sunflower Spectrum. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

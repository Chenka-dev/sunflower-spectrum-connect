
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="text-center py-16 fade-in-section">
      <p className="text-destructive mb-4">{error}</p>
      <Button onClick={() => window.location.reload()}>
        Try Again
      </Button>
    </div>
  );
}

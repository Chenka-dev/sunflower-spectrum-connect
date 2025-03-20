
import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 fade-in-section">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <p className="text-lg text-muted-foreground">Loading directory data...</p>
    </div>
  );
}

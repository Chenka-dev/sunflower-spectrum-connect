
import { Therapist, Center } from "@/lib/data";

const API_URL = "https://jsonplaceholder.typicode.com"; // Replace with your actual API URL

/**
 * Fetches therapists from the API
 */
export const fetchTherapists = async (): Promise<Therapist[]> => {
  try {
    // For demo purposes, we're using JSONPlaceholder API with a delayed response
    // In a real app, you'd replace this with your actual API endpoint
    const response = await fetch(`${API_URL}/users?_delay=1000`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the generic user data to match our Therapist type
    // In a real API, this mapping wouldn't be necessary if the API returns properly structured data
    return data.map((user: any, index: number): Therapist => ({
      id: user.id.toString(),
      name: user.name,
      title: ["Clinical Psychologist", "Family Therapist", "Neuropsychologist", "Occupational Therapist"][index % 4],
      specialty: [
        ["ADHD", "Autism", "Anxiety"],
        ["Family Therapy", "Autism", "Behavioral Issues"],
        ["ADHD", "Learning Disabilities", "Cognitive Assessment"],
        ["Sensory Processing", "Motor Skills", "Daily Living Skills"]
      ][index % 4],
      location: `${user.address.city}, ${user.address.zipcode}`,
      image: "/placeholder.svg",
      bio: user.company.catchPhrase,
      contactInfo: {
        email: user.email,
        phone: user.phone,
        website: user.website
      },
      availability: ["Monday", "Wednesday", "Friday"],
      rating: 4 + Math.random(),
      reviews: 20 + Math.floor(Math.random() * 100),
      featured: index < 3
    }));
    
  } catch (error) {
    console.error("Error fetching therapists:", error);
    throw error;
  }
};

/**
 * Fetches centers from the API
 */
export const fetchCenters = async (): Promise<Center[]> => {
  try {
    // We know companies endpoint doesn't exist in JSONPlaceholder, so use users directly
    const response = await fetch(`${API_URL}/users?_delay=1000`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the user data to match our Center type
    return data.slice(0, 5).map((user: any, index: number): Center => ({
      id: (index + 100).toString(), // Use different IDs from therapists
      name: user.company.name,
      specialties: [
        ["Autism", "ADHD", "Sensory Processing"],
        ["Learning Disabilities", "ADHD", "Executive Functioning"],
        ["Anxiety", "Depression", "Neurodivergent Support"]
      ][index % 3],
      location: `${user.address.city}, ${user.address.zipcode}`,
      image: "/placeholder.svg",
      description: user.company.catchPhrase + ". " + user.company.bs,
      contactInfo: {
        email: user.email,
        phone: user.phone,
        website: user.website
      },
      therapists: ["1", "2", "3"].slice(0, 1 + (index % 3)),
      services: [
        ["Individual Therapy", "Group Therapy", "Family Therapy", "Occupational Therapy"],
        ["Academic Assessment", "Tutoring", "Executive Function Coaching", "Parent Training"],
        ["Individual Therapy", "Art Therapy", "Mindfulness Programs", "Support Groups"]
      ][index % 3],
      featured: index < 2
    }));
  } catch (error) {
    console.error("Error fetching centers:", error);
    throw error;
  }
};

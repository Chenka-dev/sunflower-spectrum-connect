
export type Therapist = {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  location: string;
  image: string;
  bio: string;
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  availability: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
};

export type Center = {
  id: string;
  name: string;
  specialties: string[];
  location: string;
  image: string;
  description: string;
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  therapists: string[];
  services: string[];
  featured?: boolean;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  organizer: string;
  registrationLink?: string;
  price?: string;
  featured?: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured?: boolean;
};

export const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Emma Reynolds",
    title: "Clinical Psychologist",
    specialty: ["ADHD", "Autism", "Anxiety"],
    location: "New York, NY",
    image: "/placeholder.svg",
    bio: "Dr. Reynolds specializes in neurodivergent care with over 15 years of experience helping individuals with ADHD, Autism, and anxiety disorders.",
    contactInfo: {
      email: "emma.reynolds@example.com",
      phone: "(555) 123-4567",
      website: "www.emmareynolds.example.com"
    },
    availability: ["Monday", "Wednesday", "Friday"],
    rating: 4.9,
    reviews: 124,
    featured: true
  },
  {
    id: "2",
    name: "Michael Chen, LMFT",
    title: "Family Therapist",
    specialty: ["Family Therapy", "Autism", "Behavioral Issues"],
    location: "San Francisco, CA",
    image: "/placeholder.svg",
    bio: "Michael specializes in working with families affected by neurodivergent conditions, helping to create harmony and understanding within the family unit.",
    contactInfo: {
      email: "michael.chen@example.com",
      phone: "(555) 234-5678"
    },
    availability: ["Tuesday", "Thursday", "Saturday"],
    rating: 4.7,
    reviews: 89,
    featured: true
  },
  {
    id: "3",
    name: "Dr. Sarah Johnson",
    title: "Neuropsychologist",
    specialty: ["ADHD", "Learning Disabilities", "Cognitive Assessment"],
    location: "Chicago, IL",
    image: "/placeholder.svg",
    bio: "Dr. Johnson conducts comprehensive neuropsychological assessments and develops tailored intervention plans for individuals with diverse learning needs.",
    contactInfo: {
      email: "sarah.johnson@example.com",
      phone: "(555) 345-6789",
      website: "www.sarahjohnson.example.com"
    },
    availability: ["Monday", "Tuesday", "Thursday"],
    rating: 4.8,
    reviews: 72
  },
  {
    id: "4",
    name: "James Wilson, OT",
    title: "Occupational Therapist",
    specialty: ["Sensory Processing", "Motor Skills", "Daily Living Skills"],
    location: "Austin, TX",
    image: "/placeholder.svg",
    bio: "James helps individuals develop practical skills for daily living while addressing sensory processing challenges common in neurodivergent individuals.",
    contactInfo: {
      email: "james.wilson@example.com",
      phone: "(555) 456-7890"
    },
    availability: ["Wednesday", "Friday", "Saturday"],
    rating: 4.6,
    reviews: 56
  },
  {
    id: "5",
    name: "Dr. Maya Patel",
    title: "Child Psychiatrist",
    specialty: ["Medication Management", "ADHD", "Anxiety"],
    location: "Boston, MA",
    image: "/placeholder.svg",
    bio: "Dr. Patel provides thoughtful medication management for children and adolescents with neurodevelopmental and psychiatric conditions.",
    contactInfo: {
      email: "maya.patel@example.com",
      phone: "(555) 567-8901"
    },
    availability: ["Monday", "Wednesday", "Thursday"],
    rating: 4.9,
    reviews: 103
  }
];

export const centers: Center[] = [
  {
    id: "1",
    name: "Spectrum Wellness Center",
    specialties: ["Autism", "ADHD", "Sensory Processing"],
    location: "Seattle, WA",
    image: "/placeholder.svg",
    description: "A comprehensive treatment center offering integrative care for individuals across the neurodiversity spectrum.",
    contactInfo: {
      email: "info@spectrumwellness.example.com",
      phone: "(555) 987-6543",
      website: "www.spectrumwellness.example.com"
    },
    therapists: ["1", "3", "4"],
    services: ["Individual Therapy", "Group Therapy", "Family Therapy", "Occupational Therapy", "Speech Therapy"],
    featured: true
  },
  {
    id: "2",
    name: "Neurodiversity Support Hub",
    specialties: ["Learning Disabilities", "ADHD", "Executive Functioning"],
    location: "Denver, CO",
    image: "/placeholder.svg",
    description: "Focused on academic and cognitive support for neurodivergent individuals of all ages.",
    contactInfo: {
      email: "contact@ndshub.example.com",
      phone: "(555) 876-5432",
      website: "www.ndshub.example.com"
    },
    therapists: ["2", "5"],
    services: ["Academic Assessment", "Tutoring", "Executive Function Coaching", "Parent Training"],
    featured: true
  },
  {
    id: "3",
    name: "Harmony Therapeutic Center",
    specialties: ["Anxiety", "Depression", "Neurodivergent Support"],
    location: "Portland, OR",
    image: "/placeholder.svg",
    description: "A holistic center that integrates mental health care with neurodivergent-affirming practices.",
    contactInfo: {
      email: "hello@harmonytherapy.example.com",
      phone: "(555) 765-4321"
    },
    therapists: ["1", "2"],
    services: ["Individual Therapy", "Art Therapy", "Mindfulness Programs", "Support Groups"]
  }
];

export const events: Event[] = [
  {
    id: "1",
    title: "Neurodiversity in the Workplace",
    date: "2023-11-15",
    time: "1:00 PM - 4:00 PM",
    location: "Virtual Event",
    image: "/placeholder.svg",
    description: "Join us for an informative workshop on creating inclusive workplaces for neurodivergent individuals. Featuring guest speakers from leading companies with successful neurodiversity hiring programs.",
    organizer: "Sunflower Spectrum",
    registrationLink: "https://example.com/register",
    price: "Free",
    featured: true
  },
  {
    id: "2",
    title: "Parent Support Group: Navigating the School System",
    date: "2023-11-22",
    time: "7:00 PM - 8:30 PM",
    location: "Spectrum Wellness Center, Seattle, WA",
    image: "/placeholder.svg",
    description: "A monthly support group for parents of neurodivergent children, focusing on advocacy within educational systems.",
    organizer: "Spectrum Wellness Center",
    price: "Free"
  },
  {
    id: "3",
    title: "Sensory-Friendly Community Art Exhibit",
    date: "2023-12-05",
    time: "10:00 AM - 4:00 PM",
    location: "Community Art Space, Portland, OR",
    image: "/placeholder.svg",
    description: "An inclusive art exhibit featuring works by neurodivergent artists. The space will be sensory-friendly with quiet rooms available.",
    organizer: "Harmony Therapeutic Center",
    price: "$5 suggested donation",
    featured: true
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Executive Functioning in ADHD",
    slug: "understanding-executive-functioning-adhd",
    author: "Dr. Emma Reynolds",
    date: "2023-10-28",
    image: "/placeholder.svg",
    excerpt: "Executive functioning challenges are central to ADHD but are often misunderstood. Learn how these brain-based skills affect daily life and strategies to support them.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue.",
    tags: ["ADHD", "Executive Functioning", "Cognitive Skills"],
    featured: true
  },
  {
    id: "2",
    title: "The Autism Spectrum: Moving Beyond Stereotypes",
    slug: "autism-spectrum-beyond-stereotypes",
    author: "Michael Chen, LMFT",
    date: "2023-10-15",
    image: "/placeholder.svg",
    excerpt: "Exploring the diversity within autism and why understanding the spectrum is crucial for support and inclusion.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue.",
    tags: ["Autism", "Neurodiversity", "Inclusion"],
    featured: true
  },
  {
    id: "3",
    title: "Sensory Processing: When the World Feels Too Intense",
    slug: "sensory-processing-intensity",
    author: "James Wilson, OT",
    date: "2023-09-30",
    image: "/placeholder.svg",
    excerpt: "An occupational therapist's guide to understanding sensory processing differences and creating accommodating environments.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue.",
    tags: ["Sensory Processing", "Accommodation", "Neurodiversity"]
  }
];

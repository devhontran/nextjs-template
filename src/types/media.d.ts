interface MediaCardProps {
  image: string;
  tag: string;
  description?: string;
  moreLinks?: {
    type: string;
    link: string;
  }[];
}

interface PodcastCardProps {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  date: string;
  label: string;
  audio: string;
}

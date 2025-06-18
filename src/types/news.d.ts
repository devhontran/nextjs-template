interface CardBlogProps {
  id: string | number;
  src: string;
  heading?: string;
  note?: string;
  description?: string;
  logo?: string;
  label?: string;
  tag: string;
  date: string;
}

interface FilterTag {
  label: string;
  slug: string;
}

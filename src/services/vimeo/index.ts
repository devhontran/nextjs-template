'use server';

const baseUrl = process.env.NEXT_PUBLIC_VIMEO_URL;
const apiUrl = baseUrl;
const token = process.env.VIMEO_TOKEN;

interface StrapiFetchParam {
  url: string;
  options?: RequestInit;
}

const fetchVimeo = async <T>({ url, options }: StrapiFetchParam): Promise<T | null> => {
  try {
    const response = await fetch(`${apiUrl}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 3600,
      },
      ...options,
    });

    return (await response.json()) as T;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error fetchVimeo', error);
    return null;
  }
};

export default fetchVimeo;

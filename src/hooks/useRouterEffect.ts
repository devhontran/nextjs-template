import { usePathname, useRouter } from 'next/navigation';

export default function useRouterEffect(): {
  routerEffect: ({ url }: { url: string }) => void;
} {
  const router = useRouter();
  const pathName = usePathname();

  const routerEffect = ({ url }: { url: string }): void => {
    if (url === pathName) return;
    router.prefetch(url);
    // setPageUrl(url);
    // pageTransitionIn();
  };

  return { routerEffect };
}

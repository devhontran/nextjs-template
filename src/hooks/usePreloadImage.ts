import { CACHE_IMAGES_PRELOADER } from '@Constants/animation';
import { registerPreloader, unRegisterPreloader } from '@Layouts/Animation/usePreloader';
import { useLayoutEffect } from 'react';

export default function usePreloadImage(imageUrl: string): void {
  useLayoutEffect(() => {
    registerPreloader();
    caches
      .open(CACHE_IMAGES_PRELOADER)
      .then((cache) => {
        cache.match(imageUrl).then((response) => {
          if (!response) {
            return fetch(imageUrl)
              .then((fetchResponse) => {
                cache.put(imageUrl, fetchResponse.clone());
                unRegisterPreloader();
                return fetchResponse;
              })
              .catch((_error) => {
                unRegisterPreloader();
              });
          } else {
            unRegisterPreloader();
          }
        });
      })
      .catch((_error) => {
        unRegisterPreloader();
      });
  }, [imageUrl]);
}

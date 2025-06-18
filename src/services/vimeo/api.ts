import fetchVimeo from './index';

const _vimeoCache = new Map<string, VimeoVideo>();

const getVimeoById = async (id: string): Promise<VimeoVideo | null> => {
  if (_vimeoCache.has(id)) {
    return _vimeoCache.get(id) ?? null;
  }

  const url = `me/videos/${id}`;
  const response = await fetchVimeo<VimeoVideo>({ url });

  if (response) {
    _vimeoCache.set(id, response);
  }

  return response;
};

export const getVimeoFromCache = async (id: string): Promise<SimpleVimeo | null> => {
  const vimeo = await getVimeoById(id);
  if (!vimeo) return null;
  const { pictures, width, height, play } = vimeo;
  return { pictures, width, height, play };
};

import fs from 'node:fs/promises';

import { getPlaiceholder } from 'plaiceholder';

export async function getStaticBase64(imageUrl: string): Promise<string | undefined> {
  try {
    const file = await fs.readFile(imageUrl);

    const { base64 } = await getPlaiceholder(file);
    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export async function getDynamicBase64(imageUrl: string): Promise<string | undefined> {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export async function getStaticDataUrls(images: string[]): Promise<string[]> {
  const base64Results = await Promise.all(images.map((photo) => getStaticBase64(photo)));

  return base64Results.map((base64Result) => base64Result!);
}

export async function getDynamicDataUrls(images: string[]): Promise<string[]> {
  const base64Results = await Promise.all(images.map((photo) => getDynamicBase64(photo)));

  return base64Results.map((base64Result) => base64Result!);
}

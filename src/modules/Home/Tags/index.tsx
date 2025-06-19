import { chakra, Text } from '@chakra-ui/react';

export default function Tags({ tags }: { tags: string[] }): React.ReactElement {
  return (
    <chakra.ul display={'flex'} gap={'1rem'} flexWrap={'wrap'}>
      {tags.map((tag: string) => (
        <chakra.li key={tag} bg="#222" px="1.2rem" py=".4rem" borderRadius={'2.4rem'}>
          <Text fontSize={'1.2rem'} color={'#f2f2f2'}>
            {tag}
          </Text>
        </chakra.li>
      ))}
    </chakra.ul>
  );
}

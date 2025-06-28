import { ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig';
import { Box, GridItem, Link, Text } from '@chakra-ui/react';
import { type RefObject, useRef } from 'react';

import Tags from '../../Tags';
import ImageWorkWebgl from './ImageWorkWebgl';

export default function WorkItem({
  title,
  description,
  image,
  tags,
  awards,
  link,
}: {
  title: string;
  description: string;
  image: string;
  tags: string[];
  awards: string[];
  link: string;
}): React.ReactElement {
  const refImg = useRef<HTMLDivElement>(null);
  return (
    // <Link href={link} className={s.workItem}>
    //   <div className="grid grid-cols-10 gap-24">
    //     <div className={`${s.thumbnail} col-span-6`}>
    //       <div className={`${s.metadata} flex items-center justify-between`}>
    //         <Label size={12} className={s.year}>
    //           2024
    //         </Label>
    //         <Label size={12} className={s.type}>
    //           Personal
    //         </Label>
    //         <Label size={12} className={s.country}>
    //           Vietnam
    //         </Label>
    //       </div>
    //       <ImagePlaceHolder src={image} alt="work-1" width={1600} height={900} />
    //     </div>
    //     <div className={`${s.content} col-span-3 col-start-8`}>
    //       <Heading className={s.title} size={80}>
    //         {title}
    //       </Heading>
    //       <Tags tags={tags} />
    //       <div className={s.description}>
    //         <Paragraph size={18}>{description}</Paragraph>
    //       </div>
    //       <ul className={s.awardList}>
    //         {awards.map((award) => (
    //           <li className={s.awardItem} key={award}>
    //             <Label as="span" size={12} className={s.awardText}>
    //               {award}
    //             </Label>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </Link>
    <GridItem>
      <Box ref={refImg} w="100%" aspectRatio={'4/3'} />
      <Box>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Tags tags={tags} />
        <Text>{awards.join(', ')}</Text>
        <Link href={link}>{link}</Link>
      </Box>
      <UseCanvas>
        <ScrollScene track={refImg as RefObject<HTMLElement>}>
          {(props) => <ImageWorkWebgl url={image} props={props} />}
        </ScrollScene>
      </UseCanvas>
    </GridItem>
  );
}

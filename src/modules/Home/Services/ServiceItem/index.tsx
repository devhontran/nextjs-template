import ImagePlaceHolder from '@/components/ImagePlaceHolder';
import { Heading, Label, Paragraph } from '@/components/Typography';

import Tags from '../../Tags';
import s from './styles.module.scss';

interface ServiceItemProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export default function ServiceItem({
  title,
  description,
  image,
  tags,
}: ServiceItemProps): React.ReactElement {
  return (
    <div className={s.serviceItem}>
      <div className="grid grid-cols-10 gap-24">
        <div className={`${s.thumbnail} col-span-6`}>
          <div className="metadata flex justify-between">
            <Label size={12}>Projects</Label>
            <Label size={12}>10</Label>
          </div>
          <ImagePlaceHolder src={image} alt={title} width={1600} height={900} />
        </div>
        <div className={`${s.content} col-span-3 col-start-8`}>
          <Heading className={s.title} size={48}>
            {title}
          </Heading>
          <Tags tags={tags} />
          <div className={s.description}>
            <Paragraph size={18}>{description}</Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
}

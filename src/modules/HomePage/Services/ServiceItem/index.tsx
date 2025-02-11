import ImagePlaceHolder from '@/components/ImagePlaceHolder';
import { TypographyHeading, TypographyLabel, TypographyParagraph } from '@/components/Typography';

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
            <TypographyLabel size={12}>Projects</TypographyLabel>
            <TypographyLabel size={12}>10</TypographyLabel>
          </div>
          <ImagePlaceHolder src={image} alt={title} width={1600} height={900} />
        </div>
        <div className={`${s.content} col-span-3 col-start-8`}>
          <TypographyHeading className={s.title} size={48}>
            {title}
          </TypographyHeading>
          <Tags tags={tags} />
          <div className={s.description}>
            <TypographyParagraph size={18}>{description}</TypographyParagraph>
          </div>
        </div>
      </div>
    </div>
  );
}

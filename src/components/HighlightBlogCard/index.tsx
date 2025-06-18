import Image from 'next/image';

import { Color } from '@/enum/typo';

import Button from '../Button';
import ImagePlaceHolder from '../ImagePlaceHolder';
import Tag from '../Tag';
import { Paragraph } from '../Typography';
import Label from '../Typography/Label';
import s from './HighlightBlogCard.module.scss';

interface HighlightBlogCardProps {
  image: string;
  tag: string;
  date: string;
  logo?: string;
}

function HighlightBlogCard({ image, date, tag, logo }: HighlightBlogCardProps): React.ReactElement {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper_image}>
        <ImagePlaceHolder src={image} alt="blog-1" width={1392} height={808} />
      </div>
      <div className={s.wrapper_content}>
        <div className={s.wrapper_content_top}>
          <Tag label={tag} haveDot isDark />
          <div className={s.wrapper_content_top_date}>
            <div className={s.wrapper_content_top_date_ic}>
              <Image
                unoptimized
                src={'/icons/ic_calendar.svg'}
                alt={'calendar'}
                width={16}
                height={16}
              />
            </div>
            <Label size={14} color={Color.charcoal_100}>
              {date}
            </Label>
          </div>
        </div>
        {logo && (
          <div className={s.wrapper_content_logo}>
            <Image unoptimized src={logo} alt={'review'} width={362} height={82} />
          </div>
        )}
        <div className={s.wrapper_content_description}>
          <Paragraph
            size={32}
            fontWeight={'medium'}
            color={Color.white}
            className={s.wrapper_content_description_txt}
          >
            <span>
              Mark Woodland, believes in the value of taking on venture capital funding while a
              company is in its early stages of growth.
            </span>{' '}
            While some extol the virtues of raising no funds and attempting to “bootstrap” their
            company and self-fund growth.
          </Paragraph>
          <Button className={s.btn}>Read</Button>
        </div>
      </div>
    </div>
  );
}

export default HighlightBlogCard;

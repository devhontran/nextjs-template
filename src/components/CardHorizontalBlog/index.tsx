import cn from 'classnames';

import { Color } from '@/enum/typo';

import ImagePlaceHolder from '../ImagePlaceHolder';
import LinkEffect from '../LinkEffect';
import SvgInsert from '../SvgInsert';
import Tag from '../Tag';
import { Label } from '../Typography';
import s from './CardHorizontalBlog.module.scss';
interface Props extends CardBlogProps {
  className?: string;
}

function CardHorizontalBlog({ className, ...props }: Props): React.ReactElement {
  return (
    <LinkEffect href="/blogs/detail" className={cn(s.wrapper, className)}>
      <div className={s.wrapper_image}>
        <ImagePlaceHolder src={props.src} alt="blog" width={101} height={157} />
      </div>
      <div className={s.wrapper_content}>
        <Tag label={props.tag} />
        <Label className={s.wrapper_content_description}>{props.description}</Label>
        <div className={s.wrapper_content_date}>
          <div className={s.wrapper_content_date_icon}>
            <SvgInsert src="/icons/ic_calendar.svg" width={16} height={16} />
          </div>
          <Label size={14} color={Color.charcoal_300}>
            {props.date}
          </Label>
        </div>
      </div>
    </LinkEffect>
  );
}

export default CardHorizontalBlog;

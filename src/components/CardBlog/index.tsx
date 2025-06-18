'use client';

import gsap from 'gsap';
import Image from 'next/image';
import React, { useCallback, useRef } from 'react';

import { useLinesMask } from '@/animation/components/Typo/Lines/useLinesMask';
import ImagePlaceHolder from '@/components/ImagePlaceHolder';
import Tag from '@/components/Tag';
import Label from '@/components/Typography/Label';
import Paragraph from '@/components/Typography/Paragraph';
import { Color } from '@/enum/typo';

import LinkEffect from '../LinkEffect';
import s from './CardBlog.module.scss';

interface Props extends CardBlogProps {
  className?: string;
}

const CardBlog = ({
  src,
  description,
  heading,
  note,
  label,
  logo,
  tag,
  date,
  className,
}: Props): React.JSX.Element => {
  const topRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const { motionIn, motionOutLines } = useLinesMask({ refContent: contentRef });

  const animateDescription = useCallback((height: number, duration: number) => {
    if (descriptionRef.current) {
      gsap.killTweensOf(descriptionRef.current);
      gsap.to(descriptionRef.current, {
        height,
        duration,
        ease: 'power3.out',
      });
    }
  }, []);

  const onMouseEnter = useCallback((): void => {
    if (contentRef.current) {
      motionIn({ delay: 0.2 });
      animateDescription(contentRef.current.clientHeight, 1.2);
    }
  }, [motionIn, animateDescription]);

  const onMouseLeave = useCallback((): void => {
    motionOutLines();
    animateDescription(0, 0.5);
  }, [motionOutLines, animateDescription]);

  return (
    <LinkEffect
      href={`/blogs/${heading}`}
      className={`${s.wrapper} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={s.wrapper_img}>
        <ImagePlaceHolder src={src} alt={'blog_1'} width={453} height={744} />
      </div>
      <div className={s.wrapper_top} ref={topRef}>
        <Tag label={tag} />
        <div className={s.wrapper_top_date}>
          <div className={s.wrapper_top_date_ic}>
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
      <div className={s.wrapper_content}>
        <div className={s.wrapper_content_label}>
          {label && (
            <Label
              size={14}
              fontWeight={'medium'}
              textTransform={'uppercase'}
              color={Color.charcoal_100}
            >
              {label}
            </Label>
          )}
          {logo && (
            <div className={s.wrapper_content_label_logo}>
              <Image src={logo} alt={'logo'} width={300} height={300} />
            </div>
          )}
        </div>
        <Paragraph size={24} className={s.wrapper_content_heading}>
          {heading}
        </Paragraph>
        <Paragraph size={24} className={s.wrapper_content_heading} color={Color.charcoal_300}>
          {note}
        </Paragraph>
        {description && (
          <div className={s.wrapper_content_txt} ref={descriptionRef}>
            <Paragraph size={16} as="p" color={Color.charcoal_100} ref={contentRef}>
              {description}
            </Paragraph>
          </div>
        )}
      </div>
    </LinkEffect>
  );
};

export default CardBlog;

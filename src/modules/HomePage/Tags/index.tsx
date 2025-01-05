import { TypographyLabel } from '@/components/Typography';

import s from './styles.module.scss';

export default function Tags({ tags }: TagsProps): React.ReactElement {
  return (
    <div className={s.tags}>
      <ul className={s.tagsList}>
        {tags.map((tag) => (
          <li className={s.tag} key={tag}>
            <TypographyLabel size={14} className={s.tagText}>
              {tag}
            </TypographyLabel>
          </li>
        ))}
      </ul>
    </div>
  );
}

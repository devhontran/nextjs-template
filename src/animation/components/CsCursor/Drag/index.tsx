import Cursor from '../Cursor';
import styles from './Drag.module.scss';

export default function CursorDrag(): React.ReactElement {
  return (
    <Cursor>
      <div className={styles.cursor_drag}>
        <span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M11.875 4.375L6.25 10L11.875 15.625"
              stroke="black"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M8.125 4.375L13.75 10L8.125 15.625"
              stroke="black"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div className={styles.cursor_view}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 1.875V18.125"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.875 10H18.125"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Cursor>
  );
}

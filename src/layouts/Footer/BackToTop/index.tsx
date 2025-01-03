import s from './styles.module.scss';

export default function BackToTop(): React.ReactElement {
  return (
    <div className={s.backToTop}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="37"
        viewBox="0 0 16 37"
        fill="none"
      >
        <path
          d="M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928934 6.65685C0.538409 7.04738 0.538409 7.68054 0.928933 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 37L9 1L7 1L7 37L9 37Z"
          fill="#F5F5F5"
        />
      </svg>
    </div>
  );
}

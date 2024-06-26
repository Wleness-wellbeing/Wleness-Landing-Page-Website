export const StarIcon = ({ theme }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M6.71221 0.667969L7.29139 3.59759C7.70383 5.69562 10.7332 6.2956 13.1377 6.69994L13.3307 6.73046C10.7859 7.36369 7.75647 8.18491 7.3879 10.466L6.9316 13.3346L6.34364 10.0922C5.9663 8.01707 3.01584 7.41709 0.664063 6.95934L0.804471 6.92882C3.11238 6.39478 5.97509 5.74902 6.27345 3.68151L6.71221 0.667969Z"
        className={`${
          theme == "dark" ? "fill-primary-two" : "fill-primary-one"
        }`}
      />
    </svg>
  );
};

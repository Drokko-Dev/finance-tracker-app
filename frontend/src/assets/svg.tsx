interface Props {
  className?: string;
}

export const CoinsSVG = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className={`icon icon-tabler icons-tabler-outline icon-tabler-coins ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M9 14c0 1.657 2.686 3 6 3s6-1.343 6-3-2.686-3-6-3-6 1.343-6 3" />
    <path d="M9 14v4c0 1.656 2.686 3 6 3s6-1.344 6-3v-4M3 6c0 1.072 1.144 2.062 3 2.598s4.144.536 6 0c1.856-.536 3-1.526 3-2.598 0-1.072-1.144-2.062-3-2.598s-4.144-.536-6 0C4.144 3.938 3 4.928 3 6" />
    <path d="M3 6v10c0 .888.772 1.45 2 2" />
    <path d="M3 11c0 .888.772 1.45 2 2" />
  </svg>
);

export const MoonSVG = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    className={`icon icon-tabler icons-tabler-filled icon-tabler-moon ${className}`}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341-.82-.476-1.644-1.298-1.31a6.5 6.5 0 0 1-6.864-10.787l.077-.08c.551-.63.113-1.653-.758-1.653h-.266l-.068-.006-.06-.002z" />
  </svg>
);

export const LogoSVG = ({ className }: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-[#00E5FF] group-hover:opacity-80 transition-opacity ${className}`}
  >
    <path
      d="M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M18 18C18 20.2091 16.2091 22 14 22C11.7909 22 10 20.2091 10 18C10 15.7909 11.7909 14 14 14C16.2091 14 18 15.7909 18 18Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M6 18C6 20.2091 7.79086 22 10 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18 6C18 3.79086 16.2091 2 14 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M10 10L14 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

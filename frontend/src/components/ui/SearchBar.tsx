interface Props {
  // Forma corta y recomendada para props
  onSvgClick: React.MouseEventHandler<SVGSVGElement>;
  onchangeInput: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchBar({ onSvgClick, onchangeInput }: Props) {
  return (
    <div className="relative mt-4 min-w-55">
      <input
        onChange={onchangeInput}
        required
        type="text"
        name="text"
        autoComplete="off"
        className="peer w-full min-w-55 rounded-2xl border-[1.5px] border-[#9e9e9e] bg-transparent p-4 text-base text-white outline-none transition-all duration-150 ease-in-out focus:border-[#1a73e8] valid:border-[#1a73e8]"
      />
      <label
        className="pointer-events-none absolute left-3.75 top-4 origin-left translate-y-0 text-[#e8e8e8] transition-all duration-150 ease-in-out 
        peer-focus:-translate-y-[120%] peer-focus:scale-[0.8] peer-focus:bg-main-bg peer-focus:px-1 peer-focus:text-[#2196f3]
        peer-valid:-translate-y-[120%] peer-valid:scale-[0.8] peer-valid:bg-[#212121] peer-valid:px-1 peer-valid:text-[#2196f3]"
      >
        Palabra Clave
      </label>
      <svg
        onClick={onSvgClick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-search mt-1 mb-1 mr-2 absolute right-3.75 top-1 transition-transform duration-300 ease-in-out hover:scale-125 cursor-pointer"
        height={40}
        strokeWidth={2}
        width={40}
        viewBox="0 0 24 24"
      >
        <path fill="none" stroke="none" d="M0 0h24v24H0z" />
        <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0m18 11-6-6" />
      </svg>
    </div>
  );
}

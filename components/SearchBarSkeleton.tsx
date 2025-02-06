function SearchBar() {
  return (
    <div className="flex w-full max-w-[1624px] animate-pulse rounded-[100px] border border-primary bg-white p-5">
      <div className="relative mr-[18px] w-[40%] pr-4 after:absolute after:right-0 after:top-1/2 after:h-[46px] after:w-[1px] after:-translate-y-1/2 after:bg-[#C6C6C6]">
        <div className="flex items-center gap-[26px]">
          <div className="bg-gray-200 h-[22px] w-[22px] rounded-full" />
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            <div className="bg-gray-200 h-4 w-16 rounded" />
            <div className="bg-gray-200 h-4 w-full rounded" />
          </div>
        </div>
      </div>
      <div className="relative mr-[18px] flex-1 pr-4 after:absolute after:right-0 after:top-1/2 after:h-[46px] after:w-[1px] after:-translate-y-1/2 after:bg-[#C6C6C6]">
        <div className="flex items-center gap-[26px]">
          <div className="bg-gray-200 h-[22px] w-[22px] rounded-full" />
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            <div className="bg-gray-200 h-4 w-20 rounded" />
            <div className="bg-gray-200 h-4 w-full rounded" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 gap-[14px] pr-4">
        <div className="bg-gray-200 h-[29px] w-[29px] rounded-full" />
        <div className="flex flex-1 flex-col justify-center gap-2">
          <div className="bg-gray-200 h-4 w-12 rounded" />
          <div className="bg-gray-200 h-4 w-full rounded" />
        </div>
      </div>
      <div className="bg-gray-200 h-[60px] w-[140px] rounded-full" />
    </div>
  );
}

export default SearchBar;

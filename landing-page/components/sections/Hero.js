const Hero = () => (
  <section className="flex flex-col items-center px-4 py-16 bg-white lg:space-x-16 lg:items-end lg:justify-center lg:flex-row">
    <h1 className="flex flex-col text-6xl font-extrabold text-center md:text-7xl lg:text-8xl font-display">
      <span>Minimal Theme</span>
      <span>
        <span className="font-serif italic">for</span> Twitter
      </span>
    </h1>
    <div className="relative grid place-items-center w-[185px] h-[110px] mb-[0.905rem] mt-6 lg:mt-0">
      <hr className="absolute left-[-171px] border-t border-[#19A0FB] bottom-[41%] w-[174px] border-dashed lg:block hidden" />
      <hr className="absolute border-t border-[#19A0FB] w-[calc(50vw+2px)] left-[-50vw] border-dashed lg:hidden block" />
      <hr className="absolute border-r border-[#19A0FB] lg:h-[145px] border-dashed lg:top-[-142px] md:h-[38px] h-[36px] md:top-[-35px] top-[-33px] md:right-[48.5%] right-[49%] lg:right-auto" />
      <svg
        className="absolute pointer-events-none"
        width={185}
        height={110}
        viewBox="0 0 185 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M181.847 3.28H3.153v103.44h178.694V3.28zM2.346 2.425v105.15h180.308V2.425H2.346z"
          fill="#19A0FB"
        />
        <path
          d="M179.5.5h5v5h-5v-5zM179.5 104.5h5v5h-5v-5zM.5 104.5h5v5h-5v-5zM.5.5h5v5h-5v-5z"
          fill="#fff"
          stroke="#19A0FB"
        />
      </svg>
      <h2 className="text-xl font-display">
        Designed by
        <br />
        <a
          href="https://twitter.com/ThomasWang"
          className="text-twitterAccentThree hover:underline decoration-1"
        >
          @ThomasWang
        </a>
      </h2>
    </div>
  </section>
)

export default Hero

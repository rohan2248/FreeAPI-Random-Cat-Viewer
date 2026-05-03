import { useState, useEffect } from "react";

const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";
const options = { method: "GET", headers: { accept: "application/json" } };

const CornerOrnament = () => (
  <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
    <path d="M2 26 L2 2 L26 2" stroke="#b8860b" strokeWidth="1" opacity="0.7" />
    <path d="M2 14 L14 2" stroke="#b8860b" strokeWidth="0.5" opacity="0.3" />
    <circle cx="2" cy="2" r="1.5" fill="#b8860b" opacity="0.8" />
  </svg>
);

const StatBar = ({ label, value, max = 5 }) => (
  <div className="p-3 border border-[#1e1e1e] bg-white/[0.02] hover:border-[#2a1f0a] hover:bg-[#b8860b]/[0.03] transition-all duration-300">
    <p className="text-[9px] tracking-[0.18em] uppercase text-[#555] mb-1.5">
      {label}
    </p>
    <div className="w-full h-[2px] bg-[#1a1a1a] overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#4a3a10] to-[#b8860b] shadow-[0_0_6px_rgba(184,134,11,0.4)] transition-all duration-1000"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <p className="text-[9px] text-[#b8860b] mt-1 tabular-nums">
      {value}/{max}
    </p>
  </div>
);

function App() {
  const [cat, setCat] = useState({});

  useEffect(() => {
    async function fetchCat() {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setCat(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCat();
  }, []);

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <div
        className={`
          relative  w-[360px] bg-gradient-to-br from-[#111] to-[#0a0a0a]
          border border-[#2a2a2a] overflow-hidden cursor-pointer
          transition-all duration-700 ease-out
          shadow-[0_0_0_1px_#1a1a1a,0_30px_80px_rgba(0,0,0,0.9)]
          hover:-translate-y-2 hover:rotate-y-[-6deg] hover:rotate-x-[3deg]
          hover:shadow-[0_0_0_1px_#3a2a10,0_50px_100px_rgba(0,0,0,0.95),0_0_80px_rgba(180,140,60,0.12)]
          
        `}
        style={{ borderRadius: "2px", transformStyle: "preserve-3d" }}
      >
        {/* Corner ornaments */}
        {[
          "top-2.5 left-2.5",
          "top-2.5 right-2.5 scale-x-[-1]",
          "bottom-2.5 left-2.5 scale-y-[-1]",
          "bottom-2.5 right-2.5 scale-[-1]",
        ].map((pos, i) => (
          <div key={i} className={`absolute w-7 h-7 z-10 ${pos}`}>
            <CornerOrnament />
          </div>
        ))}

        {/* Image */}
        <div className="relative h-60 overflow-hidden">
          {cat.image && (
            <img
              src={cat.image}
              alt={cat?.name}
              className="w-full h-full object-cover transition-all duration-700 grayscale-[20%] contrast-110 brightness-85 hover:grayscale-0 hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black" />

          {cat?.rare === 1 && (
            <div className="absolute top-4 right-4 bg-gradient-to-br from-[#b8860b] via-[#daa520] to-[#b8860b] text-black font-bold text-[7px] tracking-[0.15em] uppercase px-2.5 py-1 shadow-[0_0_20px_rgba(218,165,32,0.4)]">
              ✦ Rare
            </div>
          )}

          <div className="absolute bottom-3 left-5 right-5">
            <h2
              className="text-white text-[26px] font-black leading-none tracking-wide drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              {cat?.name || "—"}
            </h2>
            <p className="text-[#b8860b] text-[11px] tracking-[0.25em] uppercase italic font-light mt-1">
              {cat?.origin || "—"}
            </p>
          </div>
        </div>

        {/* Gold divider */}
        <div className="flex items-center gap-2.5 px-5 my-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#b8860b] to-transparent" />
          <div className="w-1.5 h-1.5 bg-[#b8860b] rotate-45 shadow-[0_0_8px_rgba(184,134,11,0.5)]" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#b8860b] to-transparent" />
        </div>

        {/* Body */}
        <div className="px-5 pb-5">
          <p className="text-[11.5px] text-[#888] tracking-[0.12em] uppercase italic leading-relaxed mb-4 border-l border-[#2a1f0a] pl-3">
            {cat?.temperament || "—"}
          </p>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <StatBar label="Intelligence" value={cat?.intelligence || 0} />
            <StatBar label="Affection" value={cat?.affection_level || 0} />
            <StatBar label="Energy" value={cat?.energy_level || 0} />
            <StatBar label="Adaptability" value={cat?.adaptability || 0} />
          </div>

          <div className="flex gap-2.5 mb-4">
            {[
              ["Life Span", cat?.life_span + " yrs"],
              ["Weight", cat?.weight?.metric + " kg"],
            ].map(([label, val]) => (
              <div
                key={label}
                className="flex-1 text-center border border-[#1e1e1e] border-t-[#2a1f0a] p-2.5"
              >
                <p className="text-[8px] tracking-[0.2em] uppercase text-[#444] mb-1">
                  {label}
                </p>
                <p className="text-[13px] text-[#ccc] font-light tracking-wide">
                  {val}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#555] leading-relaxed font-light italic line-clamp-3">
            {cat?.description || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

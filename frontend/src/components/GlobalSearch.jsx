import { useState, useRef, useEffect } from "react";
import { Search, X, Wheat, Bug, Calculator, Building2, Calendar, BookOpen, ArrowRight, Leaf } from "lucide-react";
import { cropsData } from "../data/cropsData";
import { pestsData } from "../data/pestsData";
import { calendarData } from "../data/calendarData";
import { tutorialsData } from "../data/tutorialsData";

export default function GlobalSearch({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cleanQuery = query.toLowerCase().trim();

  // Search Results Aggregation
  const results = [];
  if (cleanQuery.length >= 2) {
    // 0. Urban Crop Advisor
    if ("urban crop advisor advice recommendation localized guide soil seeds watering".includes(cleanQuery)) {
      results.push({
        category: "Advisor",
        tab: "advisor",
        title: "Urban Crop Advisor • 🌱",
        desc: "Get localized guidelines across crops, soil, seeds, watering, pests, and seasonal care.",
        icon: Leaf
      });
    }
    // 1. Crops
    cropsData.forEach(c => {
      if (c.name.toLowerCase().includes(cleanQuery) || c.type.toLowerCase().includes(cleanQuery)) {
        results.push({
          category: "Crops & Herbs",
          tab: "catalog",
          title: c.name,
          desc: `Pot: ${c.potSize} · Sunlight: ${c.sunlight}`,
          icon: Wheat
        });
      }
    });

    // 2. Pests
    pestsData.forEach(p => {
      if (p.name.toLowerCase().includes(cleanQuery) || p.symptoms.toLowerCase().includes(cleanQuery) || p.affectedCrops.toLowerCase().includes(cleanQuery)) {
        results.push({
          category: "Pest Doctor",
          tab: "pests",
          title: p.name,
          desc: `Remedy: ${p.bioRemedy.recipeName}`,
          icon: Bug
        });
      }
    });

    // 3. Calculators
    if ("potting mix cocopeat vermicompost volume soil".includes(cleanQuery)) {
      results.push({
        category: "Calculators",
        tab: "calculators",
        title: "Potting Mix Calculator",
        desc: "Calculate exact liters of cocopeat, vermicompost, and red soil.",
        icon: Calculator
      });
    }
    if ("water drip irrigation timer minutes".includes(cleanQuery)) {
      results.push({
        category: "Calculators",
        tab: "calculators",
        title: "Water & Drip Irrigation Timer",
        desc: "Estimate daily hydration and timer runtimes for drippers.",
        icon: Calculator
      });
    }
    if ("neem spray soap oil emulsion ratio".includes(cleanQuery)) {
      results.push({
        category: "Calculators",
        tab: "calculators",
        title: "Neem Spray Emulsion Calculator",
        desc: "Accurate dosage of cold-pressed neem oil & soap emulsion.",
        icon: Calculator
      });
    }

    // 4. Engineering & Hydroponics
    if ("terrace structural load weight rcc slab waterproofing".includes(cleanQuery)) {
      results.push({
        category: "Engineering",
        tab: "engineering",
        title: "Terrace Load & Waterproofing",
        desc: "RCC slab live load safety limits (150-200 kg/m²) & membranes.",
        icon: Building2
      });
    }
    if ("hydroponics kratky nft ec ph ppm".includes(cleanQuery)) {
      results.push({
        category: "Hydroponics",
        tab: "engineering",
        title: "Zero-Electricity Kratky & NFT Hydroponics",
        desc: "Bucket setup & target pH/EC chart for balcony greens.",
        icon: Building2
      });
    }

    // 5. Tutorials
    tutorialsData.forEach(t => {
      if (t.title.toLowerCase().includes(cleanQuery) || t.overview.toLowerCase().includes(cleanQuery)) {
        results.push({
          category: "Tutorials",
          tab: "tutorials",
          title: t.title,
          desc: t.overview,
          icon: BookOpen
        });
      }
    });

    // 6. Calendar
    calendarData.forEach(cal => {
      if (cal.month.toLowerCase().includes(cleanQuery) || cal.season.toLowerCase().includes(cleanQuery) || cal.sow.some(s => s.toLowerCase().includes(cleanQuery))) {
        results.push({
          category: "Crop Calendar",
          tab: "calendar",
          title: `${cal.month} (${cal.season})`,
          desc: `Direct Sow: ${cal.sow.join(", ")}`,
          icon: Calendar
        });
      }
    });
  }

  function handleSelectResult(item) {
    onNavigate(item.tab);
    setIsOpen(false);
    setQuery("");
  }

  return (
    <div className="global-search-container" ref={containerRef}>
      <div className="search-box-wrap">
        <Search size={16} className="search-icon-left" />
        <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search crops, pests, calculators, calendar… (e.g. Palak, Neem, Kratky)"
          className="global-search-input"
        />
        {query && (
          <button className="search-clear-btn" onClick={() => setQuery("")}>
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && cleanQuery.length >= 2 && (
        <div className="search-dropdown-menu">
          {results.length === 0 ? (
            <div className="search-empty">
              No matching crops, pests, or tools found for “{query}”. Try searching for “Tomato”, “Neem”, or “Water”.
            </div>
          ) : (
            <div className="search-results-list">
              <div className="search-results-count">
                Found {results.length} result{results.length > 1 ? "s" : ""}
              </div>
              {results.slice(0, 8).map((res, i) => {
                const Icon = res.icon;
                return (
                  <div
                    key={i}
                    className="search-item"
                    onClick={() => handleSelectResult(res)}
                  >
                    <div className="search-item-icon">
                      <Icon size={16} />
                    </div>
                    <div className="search-item-info">
                      <div className="search-item-header">
                        <span className="search-item-title">{res.title}</span>
                        <span className="search-item-badge">{res.category}</span>
                      </div>
                      <p className="search-item-desc">{res.desc}</p>
                    </div>
                    <ArrowRight size={14} className="search-item-arrow" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

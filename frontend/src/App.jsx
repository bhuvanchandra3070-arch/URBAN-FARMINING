import { useState, useEffect } from "react";
import {
  Sprout,
  MapPin,
  Leaf,
  ArrowRight,
  LoaderCircle,
  CircleCheck,
  TriangleAlert,
  Sun,
  Droplets,
  Bug,
  Shovel,
  Wheat,
  Search,
  BookOpen,
  Clock,
  Sparkles,
  Calculator,
  Building2,
  Calendar,
  Camera,
  Code2,
  Languages,
  Moon,
  Heart,
  Sliders,
  CheckCircle2,
  User,
  LogOut,
  ShieldCheck
} from "lucide-react";

import { translations } from "./data/translations";
import { cropsData } from "./data/cropsData";
import { pestsData } from "./data/pestsData";
import { calendarData } from "./data/calendarData";
import { tutorialsData } from "./data/tutorialsData";
import Calculators from "./components/Calculators";
import TerraceEngineering from "./components/TerraceEngineering";
import Hydroponics from "./components/Hydroponics";
import CodeStudio from "./components/CodeStudio";
import AuthModal from "./components/AuthModal";
import GlobalSearch from "./components/GlobalSearch";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const icons = {
  "What to grow": Sprout,
  Soil: Shovel,
  "Seeds & planting": Wheat,
  Watering: Droplets,
  Pests: Bug,
  "Seasonal care": Sun
};

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState("dashboard");
  const [lang, setLang] = useState("en"); // 'en' | 'te'
  const [darkMode, setDarkMode] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("urbanfarm_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Recommendation Form State
  const [form, setForm] = useState({
    location: "",
    space: "",
    crop: "",
    question: ""
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // Community Guides History
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [historyLoading, setHistoryLoading] = useState(false);

  // Community Gallery State
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    authorName: currentUser ? currentUser.name : "",
    location: "",
    cropTitle: "",
    description: "",
    imageUrl: ""
  });
  const [gallerySubmitting, setGallerySubmitting] = useState(false);
  const [galleryMsg, setGalleryMsg] = useState("");

  // Crop Catalog Filter
  const [cropFilter, setCropFilter] = useState("all");

  // Tutorial Checkboxes State
  const [checkedSteps, setCheckedSteps] = useState({});

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetchCommunityGuides();
    fetchGallery();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setGalleryForm(prev => ({
        ...prev,
        authorName: prev.authorName || currentUser.name
      }));
    }
  }, [currentUser]);

  function handleLoginSuccess(user) {
    setCurrentUser(user);
    try {
      localStorage.setItem("urbanfarm_user", JSON.stringify(user));
    } catch {
      // ignore
    }
  }

  function handleLogout() {
    setCurrentUser(null);
    try {
      localStorage.removeItem("urbanfarm_user");
    } catch {
      // ignore
    }
  }

  async function fetchCommunityGuides(query = "") {
    setHistoryLoading(true);
    try {
      const endpoint = query.trim()
        ? `${API_URL}/api/recommendations/search?q=${encodeURIComponent(query.trim())}`
        : `${API_URL}/api/recommendations`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch {
      // Backend warming up
    } finally {
      setHistoryLoading(false);
    }
  }

  async function fetchGallery() {
    setGalleryLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      if (res.ok) {
        const data = await res.json();
        setGallery(data);
      }
    } catch {
      // Offline fallback
    } finally {
      setGalleryLoading(false);
    }
  }

  async function handleLikeGallery(id) {
    try {
      const res = await fetch(`${API_URL}/api/gallery/${id}/like`, { method: "POST" });
      if (res.ok) {
        const updated = await res.json();
        setGallery(prev => prev.map(item => (item.id === id ? updated : item)));
      }
    } catch {
      // Optimistic like
      setGallery(prev =>
        prev.map(item => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
      );
    }
  }

  async function handleGallerySubmit(e) {
    e.preventDefault();
    setGallerySubmitting(true);
    setGalleryMsg("");

    const payload = {
      ...galleryForm,
      authorName: galleryForm.authorName || (currentUser ? currentUser.name : "Anonymous Urban Grower")
    };

    try {
      const res = await fetch(`${API_URL}/api/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setGalleryMsg("Harvest story shared with the community!");
        setGalleryForm({
          authorName: currentUser ? currentUser.name : "",
          location: "",
          cropTitle: "",
          description: "",
          imageUrl: ""
        });
        fetchGallery();
      }
    } catch {
      setGalleryMsg("Unable to submit right now. Ensure backend is running.");
    } finally {
      setGallerySubmitting(false);
    }
  }

  function updateField(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  }

  function validate() {
    const errs = {};
    if (!form.location.trim()) errs.location = "Please enter your city/neighborhood.";
    if (!form.space.trim()) errs.space = "Please choose your growing space.";
    if (!form.crop.trim()) errs.crop = "Please specify a crop or plant.";
    if (!form.question.trim()) errs.question = "Please enter your gardening inquiry.";
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function submitForm(e) {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to generate recommendations.");
      }

      setResult(data);
      fetchCommunityGuides();
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to Spring Boot. Make sure the backend is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  }

  function toggleStep(tutId, stepIdx) {
    const key = `${tutId}-${stepIdx}`;
    setCheckedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const filteredCrops = cropFilter === "all"
    ? cropsData
    : cropsData.filter(c => c.type.toLowerCase().includes(cropFilter.toLowerCase()));

  return (
    <main className="app-container">
      {/* Top Navigation */}
      <nav className="nav">
        <div className="nav-left">
          <a className="brand" href="#top" onClick={() => setActiveTab("dashboard")}>
            <span className="brand-mark"><Sprout size={22} /></span>
            <div className="brand-text">
              <span className="brand-name">{t.brand}</span>
              <span className="brand-sub">{t.tagline}</span>
            </div>
          </a>
        </div>

        {/* Global Live Search Bar */}
        <div className="nav-center">
          <GlobalSearch onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} />
        </div>

        {/* Global Controls: User Auth, Language & Dark Mode */}
        <div className="nav-controls">
          {currentUser ? (
            <div className="user-profile-badge">
              <div className="user-avatar-circle" title={currentUser.email}>
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="user-info-text">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">
                  {currentUser.role === "ROLE_AGRONOMIST" ? "Agronomist" : "Urban Grower"}
                </span>
              </div>
              <button
                className="user-logout-btn"
                onClick={handleLogout}
                title="Log Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              className="control-pill auth-pill"
              onClick={() => setAuthModalOpen(true)}
            >
              <User size={14} />
              <span>Sign In</span>
            </button>
          )}

          <button
            className="control-pill"
            onClick={() => setLang(l => (l === "en" ? "te" : "en"))}
            title="Toggle English / తెలుగు"
          >
            <Languages size={15} />
            <span>{lang === "en" ? "తెలుగు" : "English"}</span>
          </button>

          <button
            className="control-pill"
            onClick={() => setDarkMode(d => !d)}
            title="Toggle Dark / Light Mode"
          >
            <Moon size={15} />
            <span>{darkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
      </nav>

      {/* Feature Navigation Bar */}
      <div className="tab-bar">
        <button
          className={`tab-link ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <Sprout size={15} /> {t.nav.dashboard}
        </button>
        <button
          className={`tab-link ${activeTab === "advisor" ? "active" : ""}`}
          onClick={() => setActiveTab("advisor")}
        >
          <Leaf size={15} /> {t.nav.advisor}
        </button>
        <button
          className={`tab-link ${activeTab === "catalog" ? "active" : ""}`}
          onClick={() => setActiveTab("catalog")}
        >
          <Wheat size={15} /> {t.nav.catalog}
        </button>
        <button
          className={`tab-link ${activeTab === "calculators" ? "active" : ""}`}
          onClick={() => setActiveTab("calculators")}
        >
          <Calculator size={15} /> {t.nav.calculators}
        </button>
        <button
          className={`tab-link ${activeTab === "engineering" ? "active" : ""}`}
          onClick={() => setActiveTab("engineering")}
        >
          <Building2 size={15} /> {t.nav.engineering}
        </button>
        <button
          className={`tab-link ${activeTab === "pests" ? "active" : ""}`}
          onClick={() => setActiveTab("pests")}
        >
          <Bug size={15} /> {t.nav.pests}
        </button>
        <button
          className={`tab-link ${activeTab === "calendar" ? "active" : ""}`}
          onClick={() => setActiveTab("calendar")}
        >
          <Calendar size={15} /> {t.nav.calendar}
        </button>
        <button
          className={`tab-link ${activeTab === "tutorials" ? "active" : ""}`}
          onClick={() => setActiveTab("tutorials")}
        >
          <BookOpen size={15} /> {t.nav.tutorials}
        </button>
        <button
          className={`tab-link ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          <Camera size={15} /> {t.nav.gallery}
        </button>
        <button
          className={`tab-link ${activeTab === "codeStudio" ? "active" : ""}`}
          onClick={() => setActiveTab("codeStudio")}
        >
          <Code2 size={15} /> {t.nav.codeStudio}
        </button>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === "dashboard" && (
        <div>
          <section className="hero" id="top">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                {t.hero.eyebrow}
              </div>

              <h1>
                {t.hero.title1}
                <br />
                <em>{t.hero.title2}</em>
              </h1>

              <p className="hero-text">{t.hero.description}</p>

              <div className="hero-note">
                <span className="note-icon"><Leaf size={16} /></span>
                {t.hero.subnote}
              </div>

              <div className="hero-cta-group">
                <button className="btn-primary" onClick={() => setActiveTab("advisor")}>
                  {t.nav.advisor} <ArrowRight size={16} />
                </button>
                <button className="btn-secondary" onClick={() => setActiveTab("calculators")}>
                  <Calculator size={16} /> {t.nav.calculators}
                </button>
              </div>
            </div>

            <div className="hero-showcase" aria-label="Seedling planting showcase">
              <div className="hero-floating-glass">
                <div className="floating-badge">
                  <span className="live-dot" /> SOIL & SEEDLING SPOTLIGHT
                </div>
                <div className="floating-title">Microclimate Rooting Zone</div>
                <div className="floating-stats-row">
                  <div className="stat-chip">
                    <span className="chip-label">Soil Condition</span>
                    <strong className="chip-val">Rich Humus + Cocopeat</strong>
                  </div>
                  <div className="stat-chip">
                    <span className="chip-label">Moisture</span>
                    <strong className="chip-val">65% Root Depth</strong>
                  </div>
                  <div className="stat-chip">
                    <span className="chip-label">Sunlight</span>
                    <strong className="chip-val">Direct Morning Sun</strong>
                  </div>
                </div>
                <div className="floating-caption">
                  🌱 <em>"Nurturing tender roots today feeds resilient harvests tomorrow."</em>
                </div>
              </div>
            </div>
          </section>

          {/* Seasonal Advisory Banner */}
          <div className="advisory-strip">
            <div className="advisory-badge">{t.advisory.badge}</div>
            <div className="advisory-content">
              <strong>{t.advisory.title}:</strong> {t.advisory.tip}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">4,280+</div>
              <div className="stat-label">{t.stats.growers}</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">12,650 kg</div>
              <div className="stat-label">{t.stats.harvests}</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">8,910</div>
              <div className="stat-label">{t.stats.guides}</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">1.4M L</div>
              <div className="stat-label">{t.stats.waterSaved}</div>
            </div>
          </div>

          {/* Quick Tools Launcher */}
          <div className="work-area">
            <div className="section-heading">
              <div>
                <div className="eyebrow muted">FAST URBAN TOOLS</div>
                <h2>Explore the Knowledge Hub Modules</h2>
              </div>
            </div>

            <div className="tools-grid">
              <div className="tool-tile" onClick={() => setActiveTab("catalog")}>
                <div className="tool-icon tone-0"><Wheat size={24} /></div>
                <h4>High-Yield Crop Catalog</h4>
                <p>Potting mixes and companion planting for Palak, Tomatoes, Coriander, Chilies, and Mint.</p>
              </div>

              <div className="tool-tile" onClick={() => setActiveTab("calculators")}>
                <div className="tool-icon tone-1"><Calculator size={24} /></div>
                <h4>Interactive Calculators</h4>
                <p>Compute exact liters of cocopeat, vermicompost, and daily drip irrigation timers.</p>
              </div>

              <div className="tool-tile" onClick={() => setActiveTab("engineering")}>
                <div className="tool-icon tone-2"><Building2 size={24} /></div>
                <h4>Terrace & Balcony Engineering</h4>
                <p>RCC slab weight allowances, waterproofing membranes, and vertical windbreak engineering.</p>
              </div>

              <div className="tool-tile" onClick={() => setActiveTab("pests")}>
                <div className="tool-icon tone-3"><Bug size={24} /></div>
                <h4>Organic Pest Diagnostics</h4>
                <p>Identify aphids, mealybugs, and leaf miners with natural DIY buttermilk and neem remedies.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOCALIZED ADVISOR */}
      {activeTab === "advisor" && (
        <section className="work-area">
          <div className="section-heading">
            <div>
              <div className="eyebrow muted">INTERACTIVE RECOMMENDATION ENGINE</div>
              <h2>{t.advisor.title}</h2>
            </div>
            <p>{t.advisor.subtitle}</p>
          </div>

          <div className="content-grid">
            <form className="form-card" onSubmit={submitForm} noValidate>
              <label className="field">
                <span><MapPin size={15} /> {t.advisor.locationLabel}</span>
                <input
                  name="location"
                  value={form.location}
                  onChange={updateField}
                  placeholder={t.advisor.locationPlaceholder}
                  maxLength="120"
                  required
                />
                {validationErrors.location && (
                  <small className="field-error">{validationErrors.location}</small>
                )}
              </label>

              <label className="field">
                <span><Sprout size={15} /> {t.advisor.spaceLabel}</span>
                <select name="space" value={form.space} onChange={updateField} required>
                  <option value="" disabled>Select your space</option>
                  <option>Balcony</option>
                  <option>Windowsill</option>
                  <option>Rooftop</option>
                  <option>Backyard</option>
                  <option>Community garden</option>
                  <option>Indoor pots</option>
                </select>
                {validationErrors.space && (
                  <small className="field-error">{validationErrors.space}</small>
                )}
              </label>

              <label className="field">
                <span><Wheat size={15} /> {t.advisor.cropLabel}</span>
                <input
                  name="crop"
                  value={form.crop}
                  onChange={updateField}
                  placeholder={t.advisor.cropPlaceholder}
                  maxLength="100"
                  required
                />
                {validationErrors.crop && (
                  <small className="field-error">{validationErrors.crop}</small>
                )}
              </label>

              <label className="field">
                <span><Leaf size={15} /> {t.advisor.questionLabel}</span>
                <textarea
                  name="question"
                  value={form.question}
                  onChange={updateField}
                  placeholder={t.advisor.questionPlaceholder}
                  rows="3"
                  maxLength="1000"
                  required
                />
                {validationErrors.question && (
                  <small className="field-error">{validationErrors.question}</small>
                )}
              </label>

              {error && (
                <div className="alert error" role="alert">
                  <TriangleAlert size={17} /> {error}
                </div>
              )}

              {result && (
                <div className="alert success" role="status">
                  <CircleCheck size={17} /> Recommendations calculated and stored to database!
                </div>
              )}

              <button className="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="spin" size={18} /> {t.advisor.generatingBtn}
                  </>
                ) : (
                  <>
                    {t.advisor.submitBtn} <ArrowRight size={17} />
                  </>
                )}
              </button>

              <div className="privacy-note">{t.advisor.communityNotice}</div>
            </form>

            <aside className="side-note">
              <div className="crop-spotlight-box">
                <div className="spotlight-header">
                  <span className="spotlight-tag">URBAN CROPS SPOTLIGHT</span>
                  <h4>Click photo to autofill advisor</h4>
                </div>
                
                <div className="spotlight-grid">
                  <div
                    className="spotlight-card"
                    onClick={() => {
                      setForm(prev => ({
                        ...prev,
                        crop: "Tomato (Cherry / Roma)",
                        question: "How deep should the container be and what organic pest protection is best?"
                      }));
                      if (!form.location) {
                        setForm(prev => ({ ...prev, location: "Hyderabad, Telangana", space: "Balcony" }));
                      }
                    }}
                    title="Click to fill Tomato in Advisor"
                  >
                    <img src="/images/ripe-tomatoes.webp" alt="Vine-Ripened Cluster Tomatoes" className="spotlight-thumb" />
                    <div className="spotlight-label">
                      <strong>Cluster Tomatoes 🍅</strong>
                      <span>Balcony Container Favorite</span>
                    </div>
                  </div>

                  <div
                    className="spotlight-card"
                    onClick={() => {
                      setForm(prev => ({
                        ...prev,
                        crop: "Sweet Basil / Tulsi",
                        question: "How often should I water and how to prune flowers for bushy fragrant leaves?"
                      }));
                      if (!form.location) {
                        setForm(prev => ({ ...prev, location: "Bengaluru, Karnataka", space: "Windowsill" }));
                      }
                    }}
                    title="Click to fill Basil in Advisor"
                  >
                    <img src="/images/fresh-basil.webp" alt="Fresh Aromatic Basil" className="spotlight-thumb" />
                    <div className="spotlight-label">
                      <strong>Aromatic Basil 🌱</strong>
                      <span>Windowsill & Herb Potting</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Every garden starts somewhere.</h3>
              <p>
                From a single windowsill herb to a shared rooftop patch, localized
                guidance ensures maximum yield and organic protection.
              </p>
              <div className="side-rule" />
              <div className="side-foot">
                <span><Sun size={17} /></span>
                6 Pillars: Crops · Soil · Seeds · Watering · Pests · Seasonal Care
              </div>
            </aside>
          </div>

          {/* Results Output */}
          {result && (
            <div className="results-wrapper" id="results-section">
              <div className="results-heading">
                <div>
                  <div className="eyebrow muted">YOUR PERSONAL GROWING GUIDE</div>
                  <h2>
                    Growing <em>{result.crop}</em> in {result.location}
                  </h2>
                  <p>
                    Space: <strong>{result.space}</strong> · Based on: “{result.question}”
                  </p>
                </div>
                <span className="ready-pill">
                  <CircleCheck size={15} /> 6 Pillars Generated
                </span>
              </div>

              <div className="advice-grid">
                {result.recommendations.map((item, index) => {
                  const Icon = icons[item.title] || Leaf;
                  return (
                    <article className="advice-card" key={item.title}>
                      <div className={`advice-icon tone-${index % 6}`}>
                        <Icon size={19} />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.advice}</p>
                    </article>
                  );
                })}
              </div>

              <div className="disclaimer">
                <Sparkles size={17} />
                <p>{result.note}</p>
              </div>
            </div>
          )}

          {/* Past Community Queries Feed */}
          <div className="community-subfeed">
            <div className="section-heading">
              <div>
                <div className="eyebrow muted">PERSISTED COMMUNITY INQUIRIES</div>
                <h2>Explore Past Community Queries</h2>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  fetchCommunityGuides(searchQuery);
                }}
                style={{ display: "flex", gap: "8px" }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter crop or city..."
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <Search size={14} /> Search
                </button>
              </form>
            </div>

            {historyLoading ? (
              <div className="loading-state">
                <LoaderCircle className="spin" size={24} />
                <p>Loading community inquiries...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="empty-state">No inquiries yet. Fill the form to create the first record!</div>
            ) : (
              <div className="history-cards-grid">
                {history.map(item => (
                  <div
                    key={item.id}
                    className="history-card"
                    onClick={() => {
                      setResult(item);
                      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <div className="history-meta">
                      <span className="crop-pill">🌱 {item.crop}</span>
                      <span className="loc-pill"><MapPin size={11} /> {item.location}</span>
                    </div>
                    <h4>{item.space} Garden</h4>
                    <p className="history-q">“{item.question}”</p>
                    <div className="history-foot">
                      <span>View 6 Localized Pillars →</span>
                      <span className="time-str">
                        <Clock size={11} /> {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 3: CROPS & HERB CATALOG */}
      {activeTab === "catalog" && (
        <section className="work-area">
          <div className="section-heading">
            <div>
              <div className="eyebrow muted">HIGH-YIELD CONTAINER CROPS</div>
              <h2>Urban Crop & Herb Directory</h2>
            </div>
            <div className="filter-pills">
              <button
                className={`filter-btn ${cropFilter === "all" ? "active" : ""}`}
                onClick={() => setCropFilter("all")}
              >
                All Crops
              </button>
              <button
                className={`filter-btn ${cropFilter === "leafy" ? "active" : ""}`}
                onClick={() => setCropFilter("leafy")}
              >
                Leafy Greens
              </button>
              <button
                className={`filter-btn ${cropFilter === "herb" ? "active" : ""}`}
                onClick={() => setCropFilter("herb")}
              >
                Herbs
              </button>
              <button
                className={`filter-btn ${cropFilter === "fruit" ? "active" : ""}`}
                onClick={() => setCropFilter("fruit")}
              >
                Fruiting Vegetables
              </button>
            </div>
          </div>

          <div className="crop-cards-grid">
            {filteredCrops.map(crop => (
              <div className="crop-card" key={crop.id}>
                <div className="crop-img-wrap">
                  <img src={crop.image} alt={crop.name} loading="lazy" />
                  <span className="crop-type-tag">{crop.type}</span>
                </div>
                <div className="crop-body">
                  <h3>{crop.name}</h3>
                  <div className="crop-scientific">{crop.scientificName}</div>

                  <div className="crop-specs">
                    <div><strong>Pot Size:</strong> {crop.potSize}</div>
                    <div><strong>Sunlight:</strong> {crop.sunlight}</div>
                    <div><strong>Germination:</strong> {crop.germination}</div>
                    <div><strong>Harvest:</strong> {crop.harvestTime}</div>
                  </div>

                  <div className="potting-recipe-box">
                    <strong>🪴 Potting Mix Recipe:</strong>
                    <div className="recipe-tags">
                      {Object.entries(crop.pottingMixRecipe).map(([k, v]) => (
                        <span key={k} className="recipe-tag">{k}: {v}</span>
                      ))}
                    </div>
                  </div>

                  <div className="companion-box">
                    <div><strong>🤝 Companions:</strong> {crop.companionPlants}</div>
                    {crop.avoidPlantingWith && (
                      <div className="avoid-text"><strong>🚫 Avoid:</strong> {crop.avoidPlantingWith}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE CALCULATORS */}
      {activeTab === "calculators" && (
        <section className="work-area">
          <div className="section-heading">
            <div>
              <div className="eyebrow muted">PRECISION URBAN CALCULATORS</div>
              <h2>Potting Mix, Drip Irrigation & Bio-Remedies</h2>
            </div>
          </div>
          <Calculators />
        </section>
      )}

      {/* TAB 5: TERRACE & BALCONY ENGINEERING + HYDROPONICS */}
      {activeTab === "engineering" && (
        <section className="work-area">
          <TerraceEngineering />
          <div style={{ margin: "50px 0 30px" }} />
          <Hydroponics />
        </section>
      )}

      {/* TAB 6: PEST DOCTOR */}
      {activeTab === "pests" && (
        <section className="work-area">
          <div className="section-heading">
            <div>
              <div className="eyebrow muted">ORGANIC BIO-REMEDIES</div>
              <h2>Urban Pest Diagnostics & Natural Control</h2>
            </div>
            <p>Diagnose soft-bodied insects and prepare safe DIY herbal concoctions with zero toxic residues.</p>
          </div>

          <div className="pests-grid">
            {pestsData.map(pest => (
              <div className="pest-card" key={pest.id}>
                <div className="pest-header">
                  <div>
                    <h3>{pest.name}</h3>
                    <div className="pest-affected">Targets: {pest.affectedCrops}</div>
                  </div>
                  <span className={`severity-tag ${pest.severity.toLowerCase()}`}>
                    {pest.severity}
                  </span>
                </div>

                <div className="pest-symptoms">
                  <strong>Symptoms:</strong> {pest.symptoms}
                </div>

                <div className="remedy-box">
                  <div className="remedy-title">
                    <Sparkles size={15} /> {pest.bioRemedy.recipeName}
                  </div>
                  <div className="remedy-ingredients">
                    <strong>Formula:</strong> {pest.bioRemedy.ingredients}
                  </div>
                  <div className="remedy-instructions">
                    <strong>Application:</strong> {pest.bioRemedy.instructions}
                  </div>
                  <div className="remedy-cultural">
                    <strong>Cultural Prevention:</strong> {pest.bioRemedy.culturalControl}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 7: 12-MONTH CROP CALENDAR */}
      {activeTab === "calendar" && (
        <section className="work-area">
          <div className="section-heading">
            <div>
              <div className="eyebrow muted">SEASONAL SOWING TIMELINE</div>
              <h2>12-Month Urban Crop Calendar (Kharif, Rabi & Zaid)</h2>
            </div>
          </div>

          <div className="calendar-grid">
            {calendarData.map(cal => (
              <div className="calendar-card" key={cal.month}>
                <div className="cal-header">
                  <h3>{cal.month}</h3>
                  <span className="cal-season">{cal.season}</span>
                </div>

                <div className="cal-section">
                  <div className="cal-label">🌱 Direct Sow:</div>
                  <div className="cal-tags">
                    {cal.sow.map(item => (
                      <span key={item} className="cal-tag sow">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="cal-section">
                  <div className="cal-label">🪴 Transplant:</div>
                  <div className="cal-tags">
                    {cal.transplant.map(item => (
                      <span key={item} className="cal-tag transplant">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="cal-section">
                  <div className="cal-label">🧺 Harvest:</div>
                  <div className="cal-tags">
                    {cal.harvest.map(item => (
                      <span key={item} className="cal-tag harvest">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="cal-tip">
                  <strong>Advice:</strong> {cal.advisory}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 8: TUTORIAL BLUEPRINTS */}
      {activeTab === "tutorials" && (
        <section className="work-area">
          <div className="section-heading">
            <div>
              <div className="eyebrow muted">STEP-BY-STEP BLUEPRINTS</div>
              <h2>Interactive Urban Farming Tutorials</h2>
            </div>
            <p>Check off each action step as you build your apartment garden.</p>
          </div>

          <div className="tutorials-grid">
            {tutorialsData.map(tut => (
              <div className="tutorial-card" key={tut.id}>
                <div className="tut-header">
                  <span className="tut-diff">{tut.difficulty}</span>
                  <span className="tut-time">{tut.timeRequired}</span>
                </div>
                <h3>{tut.title}</h3>
                <p className="tut-overview">{tut.overview}</p>

                <div className="tut-checklist">
                  {tut.steps.map((step, idx) => {
                    const isDone = !!checkedSteps[`${tut.id}-${idx}`];
                    return (
                      <label key={idx} className={`step-check-item ${isDone ? "done" : ""}`}>
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleStep(tut.id, idx)}
                        />
                        <span>{step}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 9: COMMUNITY GALLERY */}
      {activeTab === "gallery" && (
        <section className="work-area">
          <div className="section-heading">
            <div>
              <div className="eyebrow muted">SHARED COMMUNITY STORIES</div>
              <h2>Urban Harvests & Garden Stories</h2>
            </div>
            <p>Celebrate harvests from city balconies, windowsills, and rooftops across the community.</p>
          </div>

          {/* Submit Harvest Story Form */}
          <form className="gallery-submit-card" onSubmit={handleGallerySubmit}>
            <h4>📸 Share Your Own Harvest Story</h4>
            <div className="form-row-2">
              <label className="field">
                <span>Your Name {currentUser && <span style={{ color: "var(--accent-secondary)" }}>(Signed in as {currentUser.name})</span>}</span>
                <input
                  value={galleryForm.authorName}
                  onChange={e => setGalleryForm({ ...galleryForm, authorName: e.target.value })}
                  placeholder="e.g. Ramesh K."
                  required
                />
              </label>
              <label className="field">
                <span>City & Space</span>
                <input
                  value={galleryForm.location}
                  onChange={e => setGalleryForm({ ...galleryForm, location: e.target.value })}
                  placeholder="e.g. Hyderabad, 5th Floor Balcony"
                  required
                />
              </label>
            </div>
            <div className="form-row-2">
              <label className="field">
                <span>Crop Title</span>
                <input
                  value={galleryForm.cropTitle}
                  onChange={e => setGalleryForm({ ...galleryForm, cropTitle: e.target.value })}
                  placeholder="e.g. Cherry Tomatoes & Mint"
                  required
                />
              </label>
              <label className="field">
                <span>Photo URL</span>
                <input
                  value={galleryForm.imageUrl}
                  onChange={e => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </label>
            </div>
            <label className="field">
              <span>Your Story / Tip</span>
              <textarea
                rows="2"
                value={galleryForm.description}
                onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })}
                placeholder="What technique helped your plants thrive?"
                required
              />
            </label>
            {galleryMsg && <div className="alert success">{galleryMsg}</div>}
            <button className="submit" disabled={gallerySubmitting} style={{ maxWidth: "250px" }}>
              {gallerySubmitting ? "Publishing…" : "Post to Community Gallery"}
            </button>
          </form>

          {/* Gallery Posts Grid */}
          {galleryLoading ? (
            <div className="loading-state">
              <LoaderCircle className="spin" size={24} />
              <p>Loading community harvest stories...</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {gallery.map(post => (
                <div className="gallery-card" key={post.id}>
                  <img src={post.imageUrl} alt={post.cropTitle} className="gallery-img" loading="lazy" />
                  <div className="gallery-body">
                    <div className="gallery-top">
                      <span className="gallery-crop">{post.cropTitle}</span>
                      <button
                        className="like-btn"
                        onClick={() => handleLikeGallery(post.id)}
                        title="Cheer this grower!"
                      >
                        <Heart size={14} fill="#e53e3e" color="#e53e3e" />
                        <span>{post.likes}</span>
                      </button>
                    </div>
                    <p className="gallery-desc">“{post.description}”</p>
                    <div className="gallery-author">
                      <strong>{post.authorName}</strong> · <span>{post.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB 10: CODE STUDIO */}
      {activeTab === "codeStudio" && (
        <section className="work-area">
          <CodeStudio />
        </section>
      )}

      {/* Auth Modal (Sign In / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        apiUrl={API_URL}
      />

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <a className="brand" href="#top">
            <span className="brand-mark"><Sprout size={19} /></span>
            {t.brand}
          </a>
          <span>
            {t.tagline} <span className="footer-dot">·</span> Spring Boot 3.4 + React 18
          </span>
        </div>
        <div className="footer-links">
          <span>🌿 100% Organic Urban Knowledge Hub</span>
        </div>
      </footer>
    </main>
  );
}

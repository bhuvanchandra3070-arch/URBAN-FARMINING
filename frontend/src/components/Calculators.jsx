import { useState } from "react";
import { Shovel, Droplets, Bug, Calculator, Check, ArrowRight } from "lucide-react";

export default function Calculators() {
  const [activeCalc, setActiveCalc] = useState("potting");

  // Potting Mix State
  const [potShape, setPotShape] = useState("round");
  const [potDiameter, setPotDiameter] = useState(12); // inches
  const [potDepth, setPotDepth] = useState(12); // inches
  const [potLength, setPotLength] = useState(24);
  const [potWidth, setPotWidth] = useState(12);
  const [potCount, setPotCount] = useState(3);

  // Water & Drip State
  const [plantCount, setPlantCount] = useState(10);
  const [tempCelsius, setTempCelsius] = useState(32);
  const [spaceType, setSpaceType] = useState("balcony");

  // Neem Spray State
  const [waterLiters, setWaterLiters] = useState(2);
  const [infestationLevel, setInfestationLevel] = useState("moderate"); // preventive, moderate, severe

  // 1. Calculate Potting Mix Volume
  let singlePotVolumeLiters = 0;
  if (potShape === "round") {
    // Cylinder: pi * r^2 * h in cubic inches. 1 cubic inch = 0.0163871 liters
    const radiusInches = potDiameter / 2;
    const volumeCuInches = Math.PI * radiusInches * radiusInches * potDepth;
    singlePotVolumeLiters = volumeCuInches * 0.0163871;
  } else {
    // Rectangular cuboid
    const volumeCuInches = potLength * potWidth * potDepth;
    singlePotVolumeLiters = volumeCuInches * 0.0163871;
  }
  const totalVolumeLiters = Math.max(1, Math.round(singlePotVolumeLiters * potCount));
  const cocopeatLiters = (totalVolumeLiters * 0.4).toFixed(1);
  const vermicompostKg = (totalVolumeLiters * 0.3 * 0.65).toFixed(1); // 1L vermicompost ~ 0.65 kg
  const redSoilKg = (totalVolumeLiters * 0.2 * 1.2).toFixed(1); // 1L red soil ~ 1.2 kg
  const neemCakeGrams = Math.round(totalVolumeLiters * 0.1 * 100);

  // 2. Calculate Water & Drip
  let baseWaterPerPlant = 0.4; // liters/day
  if (tempCelsius > 35) baseWaterPerPlant = 0.75;
  else if (tempCelsius > 28) baseWaterPerPlant = 0.55;
  if (spaceType === "terrace") baseWaterPerPlant *= 1.25; // high wind & sun
  else if (spaceType === "indoor") baseWaterPerPlant *= 0.6;

  const totalDailyWaterLiters = (plantCount * baseWaterPerPlant).toFixed(1);
  const dripperDischargeLitersPerHour = 2; // standard 2LPH dripper
  const dripDurationMinutes = Math.round((baseWaterPerPlant / dripperDischargeLitersPerHour) * 60);

  // 3. Calculate Neem Spray
  let dosageMlPerLiter = 5;
  if (infestationLevel === "preventive") dosageMlPerLiter = 2.5;
  if (infestationLevel === "severe") dosageMlPerLiter = 8;
  const totalNeemOilMl = (waterLiters * dosageMlPerLiter).toFixed(0);
  const soapMl = Math.max(1, Math.round(totalNeemOilMl * 0.4));

  return (
    <div className="calculators-container">
      <div className="calc-tabs">
        <button
          className={`calc-tab-btn ${activeCalc === "potting" ? "active" : ""}`}
          onClick={() => setActiveCalc("potting")}
        >
          <Shovel size={17} /> Potting Mix Ratio
        </button>
        <button
          className={`calc-tab-btn ${activeCalc === "water" ? "active" : ""}`}
          onClick={() => setActiveCalc("water")}
        >
          <Droplets size={17} /> Water & Drip Timer
        </button>
        <button
          className={`calc-tab-btn ${activeCalc === "neem" ? "active" : ""}`}
          onClick={() => setActiveCalc("neem")}
        >
          <Bug size={17} /> Neem Oil Emulsion
        </button>
      </div>

      {activeCalc === "potting" && (
        <div className="calc-card-grid">
          <div className="calc-inputs-card">
            <h3>Potting Mix Dimensions</h3>
            <p className="calc-sub">Calculate exact quantities of cocopeat, vermicompost & red soil.</p>

            <label className="field">
              <span>Pot Shape</span>
              <select value={potShape} onChange={e => setPotShape(e.target.value)}>
                <option value="round">Round Pot / Grow Bag (Cylindrical)</option>
                <option value="rectangular">Rectangular Planter Crate</option>
              </select>
            </label>

            {potShape === "round" ? (
              <div className="form-row-2">
                <label className="field">
                  <span>Diameter (inches)</span>
                  <input
                    type="number"
                    min="4"
                    max="36"
                    value={potDiameter}
                    onChange={e => setPotDiameter(Number(e.target.value))}
                  />
                </label>
                <label className="field">
                  <span>Depth / Height (inches)</span>
                  <input
                    type="number"
                    min="4"
                    max="36"
                    value={potDepth}
                    onChange={e => setPotDepth(Number(e.target.value))}
                  />
                </label>
              </div>
            ) : (
              <div className="form-row-3">
                <label className="field">
                  <span>Length (in)</span>
                  <input
                    type="number"
                    value={potLength}
                    onChange={e => setPotLength(Number(e.target.value))}
                  />
                </label>
                <label className="field">
                  <span>Width (in)</span>
                  <input
                    type="number"
                    value={potWidth}
                    onChange={e => setPotWidth(Number(e.target.value))}
                  />
                </label>
                <label className="field">
                  <span>Depth (in)</span>
                  <input
                    type="number"
                    value={potDepth}
                    onChange={e => setPotDepth(Number(e.target.value))}
                  />
                </label>
              </div>
            )}

            <label className="field">
              <span>Number of Pots</span>
              <input
                type="number"
                min="1"
                max="100"
                value={potCount}
                onChange={e => setPotCount(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="calc-results-card">
            <div className="calc-badge">TOTAL VOLUME: {totalVolumeLiters} LITERS</div>
            <h4>Recommended High-Aeration Mix (40:30:20:10)</h4>

            <div className="ingredient-list">
              <div className="ing-item">
                <span className="ing-name">🥥 Decompressed Cocopeat (40%)</span>
                <span className="ing-val">{cocopeatLiters} Liters</span>
              </div>
              <div className="ing-item">
                <span className="ing-name">🪱 Aged Vermicompost (30%)</span>
                <span className="ing-val">{vermicompostKg} kg</span>
              </div>
              <div className="ing-item">
                <span className="ing-name">🧱 Sifted Red / Garden Soil (20%)</span>
                <span className="ing-val">{redSoilKg} kg</span>
              </div>
              <div className="ing-item">
                <span className="ing-name">🌿 Neem Cake Powder (10%)</span>
                <span className="ing-val">{neemCakeGrams} grams</span>
              </div>
            </div>

            <div className="pro-tip-box">
              <strong>💡 Pro-Mix Tip:</strong> Soak compressed cocopeat blocks in water mixed with 1 tsp Epsom salt for 2 hours before mixing to supercharge root-zone magnesium!
            </div>
          </div>
        </div>
      )}

      {activeCalc === "water" && (
        <div className="calc-card-grid">
          <div className="calc-inputs-card">
            <h3>Daily Water & Drip Irrigation</h3>
            <p className="calc-sub">Estimate hydration requirements based on microclimate and container exposure.</p>

            <label className="field">
              <span>Total Plant Pots</span>
              <input
                type="number"
                min="1"
                value={plantCount}
                onChange={e => setPlantCount(Number(e.target.value))}
              />
            </label>

            <label className="field">
              <span>Ambient Peak Temperature (°C)</span>
              <input
                type="number"
                min="10"
                max="50"
                value={tempCelsius}
                onChange={e => setTempCelsius(Number(e.target.value))}
              />
            </label>

            <label className="field">
              <span>Environment Type</span>
              <select value={spaceType} onChange={e => setSpaceType(e.target.value)}>
                <option value="balcony">Balcony (Moderate wind & sun)</option>
                <option value="terrace">Open Terrace (High wind & intense sun)</option>
                <option value="indoor">Indoor / Windowsill (Low evaporation)</option>
              </select>
            </label>
          </div>

          <div className="calc-results-card">
            <div className="calc-badge">DAILY WATER: {totalDailyWaterLiters} LITERS</div>
            <h4>Automated Drip Scheduling (2 LPH Drippers)</h4>

            <div className="ingredient-list">
              <div className="ing-item">
                <span className="ing-name">💧 Per Plant Allocation</span>
                <span className="ing-val">{(totalDailyWaterLiters / plantCount).toFixed(2)} L / day</span>
              </div>
              <div className="ing-item">
                <span className="ing-name">⏱️ Morning Drip Run Time</span>
                <span className="ing-val">{Math.round(dripDurationMinutes * 0.65)} Minutes</span>
              </div>
              <div className="ing-item">
                <span className="ing-name">🌆 Evening Drip Run Time</span>
                <span className="ing-val">{Math.round(dripDurationMinutes * 0.35)} Minutes</span>
              </div>
            </div>

            <div className="pro-tip-box">
              <strong>💡 Drip Tip:</strong> Schedule watering at 6:30 AM before the sun heats the pipes. Standing water in hot black drip lateral pipes can scald root hairs!
            </div>
          </div>
        </div>
      )}

      {activeCalc === "neem" && (
        <div className="calc-card-grid">
          <div className="calc-inputs-card">
            <h3>Cold-Pressed Neem Oil Emulsion</h3>
            <p className="calc-sub">Accurate organic bio-pesticide dosage for soft-bodied pests.</p>

            <label className="field">
              <span>Sprayer Bottle Capacity (Liters)</span>
              <input
                type="number"
                min="0.5"
                max="20"
                step="0.5"
                value={waterLiters}
                onChange={e => setWaterLiters(Number(e.target.value))}
              />
            </label>

            <label className="field">
              <span>Infestation Status</span>
              <select value={infestationLevel} onChange={e => setInfestationLevel(e.target.value)}>
                <option value="preventive">Preventive Maintenance (Every 14 days)</option>
                <option value="moderate">Active Infestation (Aphids / Mealybugs spotted)</option>
                <option value="severe">Heavy Infestation (Curled leaves / swarms)</option>
              </select>
            </label>
          </div>

          <div className="calc-results-card">
            <div className="calc-badge">BATCH FOR {waterLiters}L SPRAYER</div>
            <h4>Emulsion Preparation Formula</h4>

            <div className="ingredient-list">
              <div className="ing-item">
                <span className="ing-name">🌿 Pure Cold-Pressed Neem Oil</span>
                <span className="ing-val">{totalNeemOilMl} ml</span>
              </div>
              <div className="ing-item">
                <span className="ing-name">🧼 Liquid Soap / Organic Baby Shampoo</span>
                <span className="ing-val">{soapMl} ml (Emulsifier)</span>
              </div>
              <div className="ing-item">
                <span className="ing-name">🚰 Lukewarm Water</span>
                <span className="ing-val">{waterLiters} Liters</span>
              </div>
            </div>

            <div className="pro-tip-box">
              <strong>⚠️ Emulsification Rule:</strong> Neem oil does not dissolve in water alone. Always whisk the soap into warm water first until cloudy, then stir in neem oil and shake vigorously before spraying.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

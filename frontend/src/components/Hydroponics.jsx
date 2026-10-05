import { Droplets, Sliders, CheckCircle2 } from "lucide-react";

export default function Hydroponics() {
  return (
    <div className="hydroponics-section">
      <div className="section-intro">
        <h2>Balcony Hydroponics & Soil-less Cultivation</h2>
        <p>Grow crisp greens with 90% less water, zero weeding, and rapid harvest cycles using modular balcony systems.</p>
      </div>

      <div className="hydro-methods-grid">
        <div className="hydro-card">
          <div className="hydro-badge">ZERO-ELECTRICITY PASSIVE</div>
          <h3>1. The Kratky Bucket Method</h3>
          <p>
            The simplest, most reliable hydroponic method invented by Prof. B.A. Kratky at the University of Hawaii. No pumps, no timers, and no electricity needed.
          </p>

          <div className="setup-steps">
            <div className="step-item">
              <span className="step-num">1</span>
              <span><strong>Reservoir:</strong> Use a food-grade 5-liter dark bucket or mason jar (opaque prevents algae growth).</span>
            </div>
            <div className="step-item">
              <span className="step-num">2</span>
              <span><strong>Net Pot:</strong> Cut a 2-inch or 3-inch hole in the bucket lid and seat a slotted hydroponic net cup.</span>
            </div>
            <div className="step-item">
              <span className="step-num">3</span>
              <span><strong>Medium:</strong> Fill net cup with inert expanded clay pebbles (Hydroton) around a germinated seedling.</span>
            </div>
            <div className="step-item">
              <span className="step-num">4</span>
              <span><strong>Nutrient Solution:</strong> Fill bucket with water + complete hydroponic nutrient formula (e.g. MasterBlend 4-18-38 + Calcium Nitrate). Submerge the bottom 1/3rd of the net pot.</span>
            </div>
            <div className="step-item">
              <span className="step-num">5</span>
              <span><strong>Air Gap:</strong> As the plant drinks, the water level drops, exposing the upper roots to moist air (forming oxygen absorption "air roots") while lower roots drink water. Harvest leafy greens in 35 days without ever refilling!</span>
            </div>
          </div>
        </div>

        <div className="hydro-card">
          <div className="hydro-badge">HIGH-DENSITY VERTICAL</div>
          <h3>2. Balcony NFT (Nutrient Film Technique)</h3>
          <p>
            Continuous recirculation of a micro-thin nutrient stream across food-grade UPVC channels along balcony railings.
          </p>

          <div className="setup-steps">
            <div className="step-item">
              <span className="step-num">1</span>
              <span><strong>Channels:</strong> 4-inch wide flat-bottom food-grade UPVC pipe inclined at a gentle 1:40 slope.</span>
            </div>
            <div className="step-item">
              <span className="step-num">2</span>
              <span><strong>Submersible Pump:</strong> A low-wattage (18W) aquarium pump lifts nutrient solution from a bottom tank to top pipe.</span>
            </div>
            <div className="step-item">
              <span className="step-num">3</span>
              <span><strong>Root Film:</strong> Roots sit directly in the moving film of nutrient-rich oxygenated water. Ideal for mint, strawberries, spinach, and bok choy.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="parameters-card">
        <h3>Hydroponic Target pH & Electrical Conductivity (EC) Chart</h3>
        <p className="calc-sub">Keep reservoir parameters in these sweet-spots for maximum nutrient bioavailability.</p>

        <div className="table-responsive">
          <table className="hydro-table">
            <thead>
              <tr>
                <th>Crop Type</th>
                <th>Target pH Range</th>
                <th>Target EC (mS/cm)</th>
                <th>TDS (PPM 500 scale)</th>
                <th>Harvest Cycle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Palak / Spinach</strong></td>
                <td>6.0 – 6.8</td>
                <td>1.8 – 2.3</td>
                <td>900 – 1150</td>
                <td>30 – 40 Days</td>
              </tr>
              <tr>
                <td><strong>Lettuce & Salad Greens</strong></td>
                <td>5.6 – 6.2</td>
                <td>1.2 – 1.8</td>
                <td>600 – 900</td>
                <td>28 – 35 Days</td>
              </tr>
              <tr>
                <td><strong>Sweet Basil</strong></td>
                <td>5.8 – 6.5</td>
                <td>1.0 – 1.6</td>
                <td>500 – 800</td>
                <td>Continuous</td>
              </tr>
              <tr>
                <td><strong>Spearmint / Pudina</strong></td>
                <td>6.0 – 6.7</td>
                <td>1.8 – 2.4</td>
                <td>900 – 1200</td>
                <td>Continuous</td>
              </tr>
              <tr>
                <td><strong>Cherry Tomato</strong></td>
                <td>5.8 – 6.5</td>
                <td>2.0 – 3.2</td>
                <td>1000 – 1600</td>
                <td>65 – 80 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

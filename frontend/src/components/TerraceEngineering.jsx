import { Building2, ShieldCheck, Layers, ArrowRight } from "lucide-react";

export default function TerraceEngineering() {
  return (
    <div className="engineering-section">
      <div className="section-intro">
        <h2>Terrace & Balcony Structural Engineering</h2>
        <p>Safely transform residential rooftops and cantilever balconies without structural risks or ceiling dampness.</p>
      </div>

      <div className="engineering-grid">
        <div className="eng-card">
          <div className="eng-icon"><Building2 size={24} /></div>
          <h3>1. Structural Load & Weight Limits</h3>
          <p>
            Standard residential reinforced cement concrete (RCC) slabs are designed for a live load of <strong>150 to 200 kg/m² (30-40 lbs/sq.ft)</strong>.
          </p>
          <ul className="eng-list">
            <li><strong>Wet Soil Factor:</strong> 1 cubic foot of saturated garden soil weighs ~35-40 kg. Cocopeat-based potting mixes weigh only <strong>12-15 kg/cu.ft</strong> when wet—reducing load by over 60%!</li>
            <li><strong>Cantilever Balconies:</strong> Projecting balconies have lower load tolerances than rooftop slabs. Never place heavy masonry planters on outer railings; keep containers below 15-20 kg each.</li>
          </ul>
        </div>

        <div className="eng-card">
          <div className="eng-icon"><Layers size={24} /></div>
          <h3>2. Weight Distribution over Beams</h3>
          <p>
            Never cluster large water tanks or heavy containers in the geometric center of a floor slab where deflection stresses are highest.
          </p>
          <ul className="eng-list">
            <li><strong>Position along Beams & Columns:</strong> Place large 20L+ containers, fruiting trees (Chikoo, Lemon, Guava), and water storage drums directly directly over load-bearing RCC columns and perimeter beams.</li>
            <li><strong>Use Elevated Planter Stands:</strong> Elevate pots on 3-inch powder-coated iron or PVC stands. This spreads point loads and allows sunlight to dry the floor beneath.</li>
          </ul>
        </div>

        <div className="eng-card">
          <div className="eng-icon"><ShieldCheck size={24} /></div>
          <h3>3. Waterproofing & Dampness Defense</h3>
          <p>
            Preventing moisture seepage into the ceiling below is critical for long-term apartment health.
          </p>
          <ul className="eng-list">
            <li><strong>Elastomeric Polyurethane Coating:</strong> Apply a minimum of two coats of high-build elastomeric waterproofing membrane (e.g. Dr. Fixit Newcoat / Fosroc Brushbond) with woven geotextile reinforcement.</li>
            <li><strong>Root Barrier Sheets:</strong> If building raised brick planters, install a 1.2mm HDPE root barrier membrane along the walls to prevent aggressive plant roots from penetrating slab micro-cracks.</li>
            <li><strong>Drainage Trays:</strong> Always keep saucers or continuous tarpaulin drainage trays with a 1:50 slope directing runoff to rainwater downspouts.</li>
          </ul>
        </div>

        <div className="eng-card">
          <div className="eng-icon"><Building2 size={24} /></div>
          <h3>4. Vertical Trellising & Windbreaks</h3>
          <p>
            Urban high-rises experience wind speeds 2-3x higher than ground level, causing mechanical plant damage and severe water loss.
          </p>
          <ul className="eng-list">
            <li><strong>Aerodynamic Trellises:</strong> Use open galvanized iron (GI) wire mesh or nylon netting instead of solid wooden boards so wind passes through without toppling planters.</li>
            <li><strong>Anchor Ties:</strong> Anchor vertical trellises securely to parapet walls using stainless steel eye-bolts and heavy-duty zip ties.</li>
            <li><strong>Green Windbreaks:</strong> Place hardy bushy shrubs (e.g. Bougainvillea, Curry Leaf, Lemongrass) along the prevailing windward edge to shield delicate leafy greens.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

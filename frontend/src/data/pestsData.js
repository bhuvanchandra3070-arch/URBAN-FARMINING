export const pestsData = [
  {
    id: "aphids",
    name: "Aphids (పేనుబంక)",
    severity: "High",
    affectedCrops: "Tomato, Chili, Coriander, Basil, Beans",
    symptoms: "Clusters of tiny green/black insects on tender stem tips and leaf undersides; sticky honeydew attracting black sooty mold.",
    visualSign: "Curling leaves and stunted young shoots.",
    bioRemedy: {
      recipeName: "Cold-Pressed Neem Oil Emulsion (5ml / Liter)",
      ingredients: "5ml pure cold-pressed neem oil (10,000 ppm) + 2ml organic liquid soap or baby shampoo + 1 liter warm water.",
      instructions: "Mix soap in water until frothy, add neem oil and shake vigorously. Spray on underside of leaves at 5:30 PM (sunset) every 4 days for 2 cycles.",
      culturalControl: "Spray strong jet of water to dislodge them in early morning; companion plant with bright yellow marigolds."
    }
  },
  {
    id: "mealybugs",
    name: "Mealybugs (పిండి పురుగు)",
    severity: "Severe",
    affectedCrops: "Chili, Hibiscus, Tomatoes, Brinjal, Papaya",
    symptoms: "White waxy, cotton-like masses in leaf axils, fruit stems, and root collars. Leaves turn yellow and drop prematurely.",
    visualSign: "Cottony white patches swarmed by black ants protecting them.",
    bioRemedy: {
      recipeName: "Rubbing Alcohol & Soap Dab + Agniastra Spray",
      ingredients: "Cotton swab dipped in 70% Isopropyl alcohol (for spot removal) + 5ml neem oil + 3ml soap in 1L water.",
      instructions: "Dab visible colonies directly with alcohol-soaked swab to dissolve protective wax. Follow with thorough neem spray.",
      culturalControl: "Eliminate ant trails with ground cinnamon or turmeric powder near container base; ants 'farm' mealybugs for honeydew!"
    }
  },
  {
    id: "leaf-miners",
    name: "Leaf Miners (ఆకు తొలిచే పురుగు)",
    severity: "Medium",
    affectedCrops: "Palak, Tomato, Methi, Cucumber, Mint",
    symptoms: "Winding white or translucent serpentine tunnels scribbled across leaf blades where tiny larvae feed internally.",
    visualSign: "Whitish zigzag trails on top leaf surface.",
    bioRemedy: {
      recipeName: "Sour Buttermilk Spray (పుల్లటి మజ్జిగ ద్రావణం)",
      ingredients: "100ml churned sour curd/buttermilk (fermented 4 days in a dark container) diluted in 1 liter clean water.",
      instructions: "Strain liquid with cheesecloth to prevent nozzle clogging. Spray once weekly across foliage. Creates an acidic microbial film that repels adult flies.",
      culturalControl: "Pinch off and compost heavily infested individual leaves early before larvae pupate into adult flies."
    }
  },
  {
    id: "spider-mites",
    name: "Spider Mites (ఎర్ర నల్లి)",
    severity: "High (in dry hot weather)",
    affectedCrops: "Tomato, Eggplant, Strawberries, Beans",
    symptoms: "Fine silky webbing between leaf joints and yellow speckling (stippling) on leaves during dry hot summer months.",
    visualSign: "Microscopic red/yellow specks moving underneath silky webs.",
    bioRemedy: {
      recipeName: "Sulfur Soap Wash or Wood Ash Dusting",
      ingredients: "10g fine sieved wood ash dusted early morning onto dewy leaves, or cold water misting with 2ml soap.",
      instructions: "Spider mites despise high humidity. Spray leaf undersides with cold water spray twice daily during peak heat to break lifecycle.",
      culturalControl: "Maintain high local humidity around balcony containers with misting trays."
    }
  },
  {
    id: "whiteflies",
    name: "Whiteflies (తెల్ల దోమ)",
    severity: "Medium to High",
    affectedCrops: "Chili, Tomato, Brinjal, Mint",
    symptoms: "Tiny moth-like white insects fluttering when plant is shaken; transmits leaf curl viruses.",
    visualSign: "Cloud of tiny white flies rising on brushing the plant.",
    bioRemedy: {
      recipeName: "Yellow Sticky Traps + Garlic-Chili Extract",
      ingredients: "Yellow plastic board coated with castor oil hung at canopy height + pureed garlic & green chili extract (boiled in water, strained).",
      instructions: "Hang yellow sticky traps 4 inches above plant canopy. Spray garlic-chili tea every 5 days.",
      culturalControl: "Attract beneficial ladybugs and lacewings with flowering coriander and dill."
    }
  }
];

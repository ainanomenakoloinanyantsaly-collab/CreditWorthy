export const REGIONS = {
  "SAVA": { specialties: ["Vanilla", "Cloves", "Coffee"], climate: "tropical_humid" },
  "Diana": { specialties: ["Cocoa", "Sugarcane", "Pepper"], climate: "tropical_dry" },
  "Analanjirofo": { specialties: ["Cloves", "Lychees"], climate: "equatorial" },
  "Atsinanana": { specialties: ["Coffee", "Tropical Fruits"], climate: "tropical_humid" },
  "Vakinankaratra": { specialties: ["Potatoes", "Dairy Farming", "Maize"], climate: "temperate" },
  "Analamanga": { specialties: ["Vegetables", "Rice"], climate: "temperate" },
  "Itasy": { specialties: ["Pineapple", "Avocado", "Tomatoes", "Rice"], climate: "temperate" },
  "Alaotra-Mangoro": { specialties: ["Rice"], climate: "tropical_altitude" },
  "Boeny": { specialties: ["Rice", "Cashew Nuts"], climate: "tropical_dry" },
  "Menabe": { specialties: ["Sugarcane", "Maize", "Cowpeas"], climate: "tropical_dry" },
  "Atsimo-Andrefana": { specialties: ["Maize", "Cotton", "Cassava"], climate: "semi_arid" },
  "Androy": { specialties: ["Livestock", "Sisal", "Cassava"], climate: "arid" },
  "Anosy": { specialties: ["Livestock", "Sisal", "Cassava"], climate: "arid" },
};

export const CLIMATE_COMPAT = {
  tropical_humid: ["Coffee", "Cocoa", "Cloves", "Tropical Fruits", "Rice", "Vegetables"],
  tropical_dry: ["Maize", "Cassava", "Cashew Nuts", "Cowpeas", "Rice"],
  equatorial: ["Cloves", "Lychees", "Tropical Fruits", "Cocoa"],
  temperate: ["Rice", "Vegetables", "Maize", "Potatoes", "Tomatoes", "Pineapple", "Avocado"],
  tropical_altitude: ["Rice", "Maize", "Vegetables"],
  semi_arid: ["Maize", "Cassava", "Cotton", "Livestock"],
  arid: ["Cassava", "Livestock", "Sisal"],
};

export const CROP_PRICES = {
  "Avocado": 2000, "Cashew Nuts": 6000, "Cassava": 400, "Cloves": 12000,
  "Cocoa": 5000, "Coffee": 8000, "Cotton": 2500, "Cowpeas": 1000,
  "Dairy Farming": 800, "Lychees": 2000, "Livestock": 1500, "Maize": 800,
  "Other": 1000, "Pepper": 20000, "Pineapple": 1800, "Potatoes": 1000,
  "Rice": 1200, "Sisal": 900, "Sugarcane": 300, "Tomatoes": 1200,
  "Tropical Fruits": 1800, "Vanilla": 150000, "Vegetables": 1500,
};

export const ALL_CROPS = Object.keys(CROP_PRICES).sort();

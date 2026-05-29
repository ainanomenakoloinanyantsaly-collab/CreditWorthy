import { REGIONS, CLIMATE_COMPAT, CROP_PRICES } from '../data/constants';

export function harvestValue(area, yield_t, crop) {
  return area * yield_t * 1000 * (CROP_PRICES[crop] || 1000);
}

export function regionCropScore(region, crop) {
  if (!REGIONS[region]) return 5;
  const { specialties, climate } = REGIONS[region];
  if (specialties.includes(crop)) return 15;
  if ((CLIMATE_COMPAT[climate] || []).includes(crop)) return 10;
  return 3;
}

export function calculateScore(area, yield_t, financial_access, cooperative, region, crop) {
  const details = {};
  const hv = harvestValue(area, yield_t, crop);

  // Estimated Harvest Value
  let p1 = hv > 10000000 ? 40 : hv > 5000000 ? 30 : hv > 1000000 ? 18 : hv > 300000 ? 8 : 2;
  details["Estimated Harvest Value"] = [p1, 40];

  // Production Volume
  const prod = area * yield_t;
  let p2 = prod > 10 ? 25 : prod > 5 ? 18 : prod > 2 ? 10 : 3;
  details["Production Volume (area × yield)"] = [p2, 25];

  // Region / Crop Fit
  const raw = regionCropScore(region, crop);
  let p3 = raw === 15 ? 20 : raw === 10 ? 13 : 3;
  const label = p3 === 20 ? "Regional specialty" : p3 === 13 ? "Climate-compatible" : "Poorly adapted";
  details[`Region / Crop Fit (${label})`] = [p3, 20];

  // Financial Access
  let p4 = financial_access === "Bank Account" ? 10 : financial_access === "Mobile Money" ? 6 : 0;
  details["Financial Access (bank / mobile)"] = [p4, 10];

  // Cooperative membership
  let p5 = cooperative ? 5 : 0;
  details["Cooperative Membership"] = [p5, 5];

  const totalScore = p1 + p2 + p3 + p4 + p5;
  return [totalScore, details];
}

export function getSegment(score) {
  if (score >= 70) return ["A", "Eligible", "#1D9E75", "#e0f7ee"];
  if (score >= 45) return ["B", "Conditionally Eligible", "#d4830a", "#fff3dc"];
  return ["C", "Not Eligible", "#c0392b", "#fdecea"];
}

export function estimateLoan(area, yield_t, crop, financial_access, cooperative, segment) {
  if (segment === "C") return null;
  const hv = harvestValue(area, yield_t, crop);
  const base = hv / 4;
  const mult = segment === "A" ? 1.0 : 0.6;
  const after_seg = base * mult;

  const bonuses = [];
  let bonus_total = 0;
  if (financial_access === "Bank Account") {
    const b = after_seg * 0.10;
    bonuses.push(["Bank Account (+10%)", b]);
    bonus_total += b;
  } else if (financial_access === "Mobile Money") {
    const b = after_seg * 0.05;
    bonuses.push(["Mobile Money (+5%)", b]);
    bonus_total += b;
  }
  if (cooperative) {
    const b = after_seg * 0.10;
    bonuses.push(["Cooperative (+10%)", b]);
    bonus_total += b;
  }

  const final = after_seg + bonus_total;
  const cond = segment === "A"
    ? { duration: "6 – 36 months", rate: "14%", repayment: "End of harvest" }
    : { duration: "3 – 12 months", rate: "20%", repayment: "Monthly instalments" };

  return {
    harvest_value: hv, price_per_kg: CROP_PRICES[crop] || 1000,
    base_amount: base, segment_multiplier: mult, amount_after_seg: after_seg,
    bonus_breakdown: bonuses, final_amount: final, ...cond
  };
}

export function getLoanOffers(segment, final) {
  const amt = Math.round(final);
  const fmt = (n) => Math.round(n).toLocaleString('fr-FR') + ' Ar';

  if (segment === "A") return [
    { institution: "CECAM", product: "Input Credit", amount: fmt(amt), duration: "12 months", rate: "14%", repayment: "End of harvest" },
    { institution: "BOA Madagascar", product: "Equipment Loan", amount: fmt(amt * 1.5), duration: "36 months", rate: "18%", repayment: "Monthly" },
    { institution: "MicroCred", product: "Working Capital", amount: fmt(amt * 0.6), duration: "6 months", rate: "22%", repayment: "Mobile Money" },
  ];
  if (segment === "B") return [
    { institution: "MicroCred", product: "Micro Agricultural Loan", amount: fmt(amt), duration: "6 months", rate: "24%", repayment: "Monthly" },
  ];
  return [];
}

export function getImprovementPoints(f, score) {
  const points = [];
  if (score >= 85) return points; // Excellent score

  if (f.financial_access === "None") {
    points.push({ title: "Financial Inclusion", desc: "Open a Bank Account (+10 pts) or Mobile Money (+6 pts) to improve financial history." });
  } else if (f.financial_access === "Mobile Money") {
    points.push({ title: "Formal Banking", desc: "Upgrade to a formal Bank Account to maximize scoring (+4 extra pts)." });
  }

  if (!f.cooperative) {
    points.push({ title: "Cooperative Membership", desc: "Join an agricultural cooperative to increase reliability and access (+5 pts)." });
  }

  const rawFit = regionCropScore(f.region, f.crop);
  if (rawFit < 10) {
    points.push({ title: "Crop Selection", desc: "Cultivate climate-compatible or specialty crops for your region to improve yield stability." });
  }

  const prod = f.area * f.yield_t;
  if (prod <= 5) {
    points.push({ title: "Production Volume", desc: "Focus on increasing yield (T/Ha) or cultivated area to boost total volume." });
  }

  return points;
}

export function computeFarmer(f) {
  const [score, details] = calculateScore(f.area, f.yield_t, f.financial_access, f.cooperative, f.region, f.crop);
  const [segment, segment_label, color, bg] = getSegment(score);
  const loan = estimateLoan(f.area, f.yield_t, f.crop, f.financial_access, f.cooperative, segment);
  const improvement_points = getImprovementPoints(f, score);
  return { ...f, score, details, segment, segment_label, color, bg, loan, improvement_points };
}

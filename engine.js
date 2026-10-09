/* Yogurt math - exact arithmetic on labeled published norms. */
const STYLES = {
  mild:    { starterPct: 0.02, hoursLo: 6,  hoursHi: 8,  note: 'mild - the gentle set' },
  classic: { starterPct: 0.02, hoursLo: 8,  hoursHi: 10, note: 'classic - the everyday jar' },
  tangy:   { starterPct: 0.02, hoursLo: 10, hoursHi: 14, note: 'tangy - the long ride' },
};
const STRAIN = {
  greek:  { yield_: 0.55, note: 'greek - half the jar, twice the spoons' },
  labneh: { yield_: 0.35, note: 'labneh - spreadable patience' },
};
const r1 = x => Math.round(x * 10) / 10;
const bad = m => { throw new Error(m); };

function plan(milkMl, styleKey) {
  const s = STYLES[styleKey];
  if (!s) bad('unknown style');
  if (!Number.isFinite(milkMl) || milkMl <= 0) bad('milk volume must be positive');
  const starterG = milkMl * s.starterPct;
  const yieldMl = milkMl + starterG;
  let verdict;
  if (milkMl < 750) verdict = 'a couple of jars (labeled)';
  else if (milkMl <= 2000) verdict = 'the weekly batch (labeled)';
  else verdict = 'a serious dairy run - check the incubator fits (labeled)';
  return { starterG: r1(starterG), yieldMl: r1(yieldMl), hoursLo: s.hoursLo, hoursHi: s.hoursHi, verdict, note: s.note };
}

function strain(yogurtG, targetKey) {
  const t = STRAIN[targetKey];
  if (!t) bad('unknown target');
  if (!Number.isFinite(yogurtG) || yogurtG <= 0) bad('yogurt weight must be positive');
  const keptG = yogurtG * t.yield_;
  const wheyMl = yogurtG - keptG;
  let verdict;
  if (keptG < 300) verdict = 'a bowl or two (labeled)';
  else if (keptG < 1000) verdict = 'the breakfast shelf is set (labeled)';
  else verdict = 'a cheesecloth marathon - find a bigger bowl (labeled)';
  return { keptG: r1(keptG), wheyMl: r1(wheyMl), verdict, note: t.note };
}

function incubate(styleKey, hoursSoFar) {
  const s = STYLES[styleKey];
  if (!s) bad('unknown style');
  if (!Number.isFinite(hoursSoFar) || hoursSoFar < 0) bad('hours must be zero or positive');
  let status;
  if (hoursSoFar < s.hoursLo) status = 'wait ' + r1(s.hoursLo - hoursSoFar) + ' more hours before the first wobble check (labeled)';
  else if (hoursSoFar <= s.hoursHi) status = 'in the window - check the set, then chill (labeled)';
  else status = 'past the window - extra sour but fine; chill it now (labeled)';
  return { hoursLo: s.hoursLo, hoursHi: s.hoursHi, status, note: s.note };
}

const api = { STYLES, STRAIN, plan, strain, incubate };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined') window.Yogurtmath = api;

const M = require('./engine.js');
const E = require('./expected.json');
let n = 0, fail = 0;
const eq = (a, b, tag) => {
  n++;
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.error('FAIL', tag, JSON.stringify(a), '!=', JSON.stringify(b)); }
};
for (const c of E.plan) { let r; try { r = M.plan(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'plan ' + c.in); }
for (const c of E.strain) { let r; try { r = M.strain(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'strain ' + c.in); }
for (const c of E.incubate) { let r; try { r = M.incubate(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'incubate ' + c.in); }
// anchors
const a = M.plan(1000, 'classic');
eq(a.starterG, 20, 'anchor starter'); eq(a.yieldMl, 1020, 'anchor yield');
eq(M.strain(1000, 'greek').keptG, 550, 'anchor greek'); eq(M.strain(1000, 'greek').wheyMl, 450, 'anchor whey');
eq(M.incubate('classic', 9).status, 'in the window - check the set, then chill (labeled)', 'anchor window');
// monotonic
for (const k of Object.keys(M.STYLES)) {
  n++; if (!(M.plan(2000, k).starterG > M.plan(1000, k).starterG)) { fail++; console.error('FAIL monotone plan', k); }
}
for (const k of Object.keys(M.STRAIN)) {
  n++; if (!(M.strain(2000, k).keptG > M.strain(1000, k).keptG)) { fail++; console.error('FAIL monotone strain', k); }
}
// errors
const errs = [
  () => M.plan(0, 'mild'), () => M.plan(-1, 'classic'), () => M.plan(NaN, 'tangy'), () => M.plan(500, 'nope'),
  () => M.strain(0, 'greek'), () => M.strain(-5, 'labneh'), () => M.strain(NaN, 'greek'), () => M.strain(500, 'nope'),
  () => M.incubate('mild', -1), () => M.incubate('nope', 5),
];
const msgs = ['milk volume must be positive','milk volume must be positive','milk volume must be positive','unknown style',
  'yogurt weight must be positive','yogurt weight must be positive','yogurt weight must be positive','unknown target',
  'hours must be zero or positive','unknown style'];
errs.forEach((f, i) => {
  n++;
  try { f(); fail++; console.error('FAIL no-throw', i); }
  catch (e) { if (e.message !== msgs[i]) { fail++; console.error('FAIL msg', i, e.message, 'want', msgs[i]); } }
});
console.log(fail ? fail + ' FAILURES / ' + n : n + '/' + n + ' checks pass');
process.exit(fail ? 1 : 0);

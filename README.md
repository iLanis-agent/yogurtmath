# Yogurt math

The arithmetic behind the jar.

**Live:** https://ilanis-agent.github.io/yogurtmath/

## What it does
- **Plan the batch**: milk volume + style -> starter grams (2% labeled norm), total yield, incubation window (6-14 h).
- **Strain it**: plain yogurt grams -> what you keep as greek (55%) or labneh (35%), and the whey left behind.
- **Still incubating?**: style + hours so far -> too young, in the window, or past it (extra sour, chill now).

## Boundaries
Heat-then-cool handling, clean jars and prompt chilling are labeled dairy norms; mold or yeasty smells mean discard. Percentages, windows and yields are labeled published norms, not safety verdicts. The arithmetic on top of them is exact and covered by an independent python oracle (111 cases, `node test.js`).

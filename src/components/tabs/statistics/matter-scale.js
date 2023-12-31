import { DC } from "@/core/constants";

export const MatterScale = {
  proton: new Decimal("2.82e-45"),

  estimate(matter) {
    if (!matter) return ["There is no antimatter yet."];
    const distScaling = this.distanceScale(matter.log10())
    if (matter.gt(Decimal.pow10(4.320432e21*3))) {
      return [
        `If every number in your antimatter count was a hydrogen atom,`,
        `you would have a line of atoms stretching from Earth to`,
        `${distScaling.name} ${format(matter.log10() / (distScaling.amount * 1e12 / 53), 2, 2)} ${distScaling != 1 ? "times" : "time"}`
      ];
    }
    if (matter.gt(Decimal.pow10(4.320432e17*3))) {
      return [
        `If you wrote ${formatInt(3)} numbers a second, from the start`,
        `of the universe, till today, you would have to existed for`,
        `${formatX(matter.log10() / (4.320432e17*3), 3, 3)} the current age of the universe.`
      ];
    }
    if (matter.gt(DC.E1_5E12)) {
      return [
        `It would take ` + formatPercents((matter.log10() / (4.320432e17*3)).toString(), 4),
        " of the current age of the Universe to write out your antimatter count",
        `if you wrote ${formatInt(3)} numbers a second`
      ];
    }
    if (matter.gt(new Decimal("1e7200000000"))) {
      return [
        `If you wrote ${formatInt(3)} numbers a second, it would take you`,
        formatFloat(((matter.log10() / 2437102080)), 2) + ` average American lifespans`,
        ` to write down your antimatter amount.`
      ];
    }
    if (matter.gt(DC.E1E7)) {
      return [
        `It would take ` + formatPercents((matter.log10() / (2437102080*3)).toString(), 4),
        " of the average American lifespan to write out your antimatter count",
        `if you wrote ${formatInt(3)} numbers a second`
      ];
    }
    if (matter.gt(DC.E10000)) {
      return [
        `If you wrote ${formatInt(3)} numbers a second, it would take you`,
        TimeSpan.fromSeconds(matter.log10() / 3).toString(),
        "to write down your antimatter amount."
      ];
    }
    const planck = new Decimal("4.22419e-105");
    const planckedMatter = matter.times(planck);
    if (planckedMatter.gt(this.proton)) {
      const scale = this.macroScale(planckedMatter);
      const amount = format(planckedMatter.dividedBy(scale.amount), 2, 1);
      return [`If every antimatter were a planck volume, you would have
        enough to ${scale.verb} ${amount} ${scale.name}`];
    }
    const scale = this.microScale(matter);
    return [`If every antimatter were ${format(this.proton.div(scale.amount).div(matter), 2, 1)} ${scale.name},
      you would have enough to make a proton.`];
  },

  microScale(matter) {
    const micro = this.microObjects;
    for (let i = 0; i < micro.length; i++) {
      const scale = micro[i];
      if (matter.times(scale.amount).lt(this.proton)) {
        return scale;
      }
    }
    throw "Cannot determine smallest antimatter scale";
  },

  macroScale(matter) {
    const macro = this.macroObjects;
    const last = macro.last();
    if (matter.gte(last.amount)) return last;
    let low = 0;
    let high = macro.length;
    while (low !== high) {
      const mid = Math.floor((low + high) / 2);
      if (macro[mid].amount.lte(matter)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return macro[high - 1];
  },

  distanceScale(matter) {
    const dist = this.distances
    let mtr = (matter/1e12) * 53
    const last = dist.last()
    if (mtr > last.amount) return last;
    let low = 0;
    let high = dist.length;
    while (low !== high) {
      const mid = Math.floor((low + high) / 2);
      if (dist[mid].amount < mtr) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return dist[high - 1];
  },

  distances: [
    { amount: 1.35e11, name: "Saturn when it's closest to Earth" },
    { amount: 4.437e12, name: "Pluto when it's closest to Earth" },
    { amount: 7.376e12, name: "Pluto when it's furthest to Earth" },
    { amount: 9.461e15, name: "something a light-year away" },
    { amount: 4.011e16, name: "Proxima Centauri" },
    { amount: 1.902e17, name: "Gliese 581" },
    { amount: 2.46e20, name: "the center of the Milky Way" },
    { amount: 2.365e22, name: "the Andromeda Galaxy" },
    { amount: 2.271e24, name: "3C 273 (optically brightest quasar)" },
    { amount: 4.324e26, name: "the edge of the Observable Universe" },
  ],

  microObjects: [
    { amount: new Decimal("1e-54"), name: "attometers cubed" },
    { amount: new Decimal("1e-63"), name: "zeptometers cubed" },
    { amount: new Decimal("1e-72"), name: "yoctometers cubed" },
    { amount: new Decimal("4.22419e-105"), name: "planck volumes" }
  ],

  macroObjects: [
    { amount: new Decimal("2.82e-45"), name: "protons", verb: "make" },
    { amount: new Decimal("1e-42"), name: "nuclei", verb: "make" },
    { amount: new Decimal("7.23e-30"), name: "Hydrogen atoms", verb: "make" },
    { amount: new Decimal("5e-21"), name: "viruses", verb: "make" },
    { amount: new Decimal("9e-17"), name: "red blood cells", verb: "make" },
    { amount: new Decimal("6.2e-11"), name: "grains of sand", verb: "make" },
    { amount: new Decimal("5e-8"), name: "grains of rice", verb: "make" },
    { amount: new Decimal("3.555e-6"), name: "teaspoons", verb: "fill" },
    { amount: new Decimal("7.5e-4"), name: "wine bottles", verb: "fill" },
    { amount: DC.D1, name: "fridge-freezers", verb: "fill" },
    { amount: new Decimal("2.5e3"), name: "Olympic-sized swimming pools", verb: "fill" },
    { amount: new Decimal("2.6006e6"), name: "Great Pyramids of Giza", verb: "make" },
    { amount: new Decimal("3.3e8"), name: "Great Walls of China", verb: "make" },
    { amount: new Decimal("5e12"), name: "large asteroids", verb: "make" },
    { amount: new Decimal("4.5e17"), name: "dwarf planets", verb: "make" },
    { amount: new Decimal("1.08e21"), name: "Earths", verb: "make" },
    { amount: new Decimal("1.53e24"), name: "Jupiters", verb: "make" },
    { amount: new Decimal("1.41e27"), name: "Suns", verb: "make" },
    { amount: new Decimal("5e32"), name: "red giants", verb: "make" },
    { amount: new Decimal("8e36"), name: "hypergiant stars", verb: "make" },
    { amount: new Decimal("1.7e45"), name: "nebulas", verb: "make" },
    { amount: new Decimal("1.7e48"), name: "Oort clouds", verb: "make" },
    { amount: new Decimal("3.3e55"), name: "Local Bubbles", verb: "make" },
    { amount: new Decimal("3.3e61"), name: "galaxies", verb: "make" },
    { amount: new Decimal("5e68"), name: "Local Groups", verb: "make" },
    { amount: new Decimal("1e73"), name: "Sculptor Voids", verb: "make" },
    { amount: new Decimal("3.4e80"), name: "observable universes", verb: "make" },
    { amount: new Decimal("1e113"), name: "Dimensions", verb: "make" },
    { amount: DC.C2P1024, name: "Infinity Dimensions", verb: "make" },
    { amount: new Decimal("1e65000"), name: "Time Dimensions", verb: "make" }
  ]
};

import { DC } from "../../constants";

export const kohlerMilestones = [
  {
    id: 11,
    name: "Reach Infinity",
    description: "Reward: [TBD]",
    checkRequirement: () => Kohler.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
  },
  {
    id: 12,
    name: "Complete IC4",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 13,
    name: "Reach Eternity",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 14,
    name: "Complete EC10x5",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 15,
    name: "Dilate Time",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 21,
    name: "Reach Reality",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 22,
    name: "Complete Effarig's Reality",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 23,
    name: "Have ??? Space Theorems",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 24,
    name: "Have Imaginary Machines",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    effect: 100
  },
  {
    id: 25,
    name: "Enter Pelle",
    description: "???",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER
  },
];

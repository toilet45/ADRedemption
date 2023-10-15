import { eternityChallenges } from "./eternity-challenges";
import { infinityChallenges } from "./infinity-challenges";
import { normalChallenges } from "./normal-challenges";
import { corruptionChallenge } from "./corruption-challenge";

export const challenges = {
  normal: normalChallenges,
  infinity: infinityChallenges,
  eternity: eternityChallenges,
  corruption: corruptionChallenge
};

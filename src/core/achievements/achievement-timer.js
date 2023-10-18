class AchievementTimer {
  constructor(isRealTime) {
    this.time = 0;
    this.realTime = isRealTime;
  }

  reset() {
    this.time = 0;
  }

  advance() {
    this.realTime
      ? this.time += Time.unscaledDeltaTime.totalSeconds.toNumber()
      : new Decimal(this.time).add(Time.deltaTime)
  }

  check(condition, duration) {
    if (!condition) {
      this.reset();
      return false;
    }
    this.advance();
    return this.time >= duration;
  }
}

export const AchievementTimers = {
  marathon1: new AchievementTimer(false),
  marathon2: new AchievementTimer(false),
  pain: new AchievementTimer(true),
  stats: new AchievementTimer(true)
};

export const changelog = [
  /**
   * @template
   * {
   *  @property {Array: Number} date  Date of the release of the update, stored in order of year-month-date.
   *  @property {String} name         Name of the update entry. Optional.
   *  @property {Number} id           Unique ID for each entry (generated in-game, not explicitly stated)
   *  @property {function: @return String} info  Text body of information for the entry.
   * }
   */
  {
    date: [2023, 8, 16],
    name: "The 'get a very primitive alpha out before college starts back up'",
    info: 
    `In the words of YouTube commenters, "first". Yes, you're looking at the first mod with a new prestige layer, and second with new content. 
    Unfortunately since school is starting back up, further updates will be slow to roll out (unless it's a major game-breaking bug).
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Added the Mending Prestige Layer.</li>
    <li>Added Mending Upgrades and Milestones.</li>
    </ul>
    <b>Notes:</b>
    <br>
    <ul>
    <li>Speedrun is available from begining of the game (but no splits for Mending content).</li>
    <li>Nothing pre-Mend is changed, so you can grab a save from Buck's savebank: https://buck4437.github.io/save-bank/.</li>
    <li>Endgame: 7 Mends and both Mending Upgrades.</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>Importing a save disables speedruns, be wary until I find a workaround.</li>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way.</li>
    <li>The Invert BH button still shows up when Hard V is locked</li>
    <li>Glyph preset importing can equip more than 1 Effarig/Reality Glyph before the 7 Mend milestone. Please unequip before importing :).</li>
    <li>Viewing the credits in the "About the game" modal displays incorrectly, you should be able to hit the Escape key to exit.</li>
    <li>The 2 Mend Milestone is also supposed to give autobuyers for the rebuyable Pelle dilation upgrades, but are currently non-functional. Tip: you can click on them once, then hold the Enter key to rebuy them rapidly.</li>
    <li>The Mending tab has no icon in the Aero theme</li>
    </ul>`
    
  }
];


for (let i = 0; i < changelog.length; i++) {
  changelog[i].id = i;
}

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
    date: ["20??", "??", "??"],
    name: "idk yet",
    info: 
    `
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Implemented Mending Upgrades 6, 20, and all rebuyables</li>
    <li>Implemented 20 Mend Milestone</li>
    <li>Implemented Warp Reality</li>
    <li>Added Mending content to the catchup modal</li>
    <li>Endgame: 20 Mend Milestone and about ee?? antimatter</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed Pelle Time Dilation Rebuyables' display when their cap is reached</li>
    <li>Made Glyph Sacrifice mode defalut to "Always Sacrifice" on Mend</li>
    <li>Glyph Filter Mode is set to "Lowest Total Glyph Sacrifice" on Mend</li>
    <li>Made all pre-Pelle achievements visible again on a new game</li>
    <li>Fixed progress stage not being updated on Mend</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>When importing a Vanilla save, rebuyable Mending Upgrade costs and effects don't get initalized properly, saving and refreshing should fix it</li>
    <li>The amount of Glyph Slots sometimes doesn't update properly when 20MM buys them, performing a Reality Reset while not on the Glyph tab should fix it</li>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    <li>There are console errors when viewing the TS tree when unlocking a Triad Study (this doesn't effect gameplay)</li>
    </ul>`
  },
  {
    date: [2023, 8, 31],
    name: "The Glyph Nerf and Game Time fix",
    info: 
    `Apparently people were getting lv. 200k Glyphs, let's change that
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Added a 3rd Glyph instability threshold (good luck getting your level 100k+ Glyphs now >:))</li>
    <li>Endgame: 10 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Hardcapped playtime to 1e308 (this should fix some freezes caused by Infinite time played)</li>
    <li>Fixed display bugs on EC6 and EC11's Effects and the Dimension and Tickspeed scaling Break Infinity Upgrades</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    </ul>`
  },
  {
    date: [2023, 8, 30],
    name: "Doom Glyph Slot Hotfix",
    info: 
    `More MU4 remnants we missed
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>None</li>
    <li>Endgame: 10 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed Glyph swapping in Doomed Reality</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    </ul>`
  },
  {
    date: [2023, 8, 29],
    name: "the MU4 effect Remnant fix and other crap",
    info: 
    `Accidently left MU4's old effect
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Added a new loading splash screen (thanks Kruta).</li>
    <li>Added fancy names to the Mendning Upgrades (thanks Kruta)</li>
    <li>When completing a tier of Effarig's Reality, it completes all tiers before it. (i.e. Completing Effarig's Eternity also completes their Infinity)</li>
    <li>Added a Mending entry in the "How to Play" modal</li>
    <li>Added common Mending Abbrevations in the "Common Abbreviations" section in "How to Play"</li>
    <li>Endgame: 10 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed EC6 and 11's reward displaying incorrectly when MU8 is purchased</li>
    <li>Fixed MU8 scaling not applying correctly</li>
    <li>Fixed having 5 glyph slots in Pelle when MU4 is purchased</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    </ul>`
  },
  {
    date: [2023, 8, 28],
    name: "Even More Upgrades",
    info: 
    `Hopefully 2nd to last Mending Upgrade Update
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Added Mending Upgrades 4, 8, and 10</li>
    <li>Endgame: 10 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>I forgor</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    </ul>`
  },
  {
    date: [2023, 8, 27],
    name: "EMERGENCY HOTFIX 5",
    info: 
    `Type mismatch fixed
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>None</li>
    <li>Endgame: 10 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Made Eternity Gain a Decimal instead of a Number</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    </ul>`
  },
  {
    date: [2023, 8, 27],
    name: "Upgrade Explosion",
    info: 
    `Finally an update that adds more than 1 Upgrade
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Implemented Mending Upgrades 12, 13, 14, 17 and 18</li>
    <li>Added a Mending Milestone for 4 Mends (effect temporary until MU19 is implemented)</li>
    <li>Endgame: 10 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed some Glyphs not being deleted on Mend</li>
    <li>Improved Mending Upgrade readability</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    </ul>`
  },
  {
    date: [2023, 8, 25],
    name: "EMERGENCY HOTFIX 4",
    info: 
    `typos strike again
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>None</li>
    <li>Endgame: 10 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed not being able to swap Glyphs in Pelle</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    </ul>`
  },
  {
    date: [2023, 8, 25],
    name: "the Reality Automation",
    info: 
    `Added some autobuyers to some Reality Mechanics.
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Added Milestone for 8 Mends</li>
    <li>Implemented Mending Upgrade 7</li>
    <li>Endgame: 10 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>none that I can remember</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>TS192's visibility is random in Nameless' Reality. However it should still be completeable</li>
    </ul>`
  },
  {
    date: [2023, 8, 24],
    name: "EMERGENCY HOTFIX 3",
    info: 
    `More Hexa fixes, and some Wellington fixes
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>None</li>
    <li>Endgame: 7 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>made the Mending button actually work after 10 Mend Milestone</li>
    <li>the Mending Upgrade tab no longer causes a duplicate key error</li>
    <li>the Pelle Dilation autobuyers no longer console spam</li>
    <li>Importing Glyph sets is no longer broken</li>
    <li>TS192 is now visible in Nameless again (needs further testing)</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>None...for now</li>
    </ul>`
  },
  {
    date: [2023, 8, 24],
    name: "the 'Hey, Royal finally did something'",
    info: 
    `More Hexa fixes, and new content by yours truly
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Reduced Mending Upgrade prices (say "thanks Amity"), and refunded the difference</li>
    <li>Implemented Mending Upgrade 15</li>
    <li>Endgame: 7 Mend Milestone and all available Mending Upgrades</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>V should no longer hardlock the game</li>
    <li>Importing Glyph sets is no longer broken</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought (by Wellington, not Hexa)</li>
    <li>ts192 is now visible in Nameless again</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>None, for a change</li>
    </ul>`
  },
  {
    date: [2023, 8, 23],
    name: "Final V patch",
    info: 
    `Hexa hopefully has patched V for good, undone previous changes to V.
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>None.</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>V no longer hardlocks in a loop
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>Time Study 192 is entirely missing in The Nameless Ones' Reality (rather than unpurchaseable), causing console errors.</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought</li>
    <li>Dilation autobuyers cause console errors, however they function normally.</li>
    </ul>`
  },
  {
    date: [2023, 8, 23],
    name: "No new content #7",
    info: 
    `Hexa hopefully fixed some things he broke last update again, kind of.
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>For the time being, requiem only requires V hard to be shown and 4-0 max glyphs equipped.</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>V again unequips all glyphs, however you now have the appropriate numbers of glyph slots.
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way, however ts192 is entirely missing.</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought</li>
    </ul>`
  },
  {
    date: [2023, 8, 23],
    name: "No new content #6",
    info: 
    `Hexa hopefully fixed some things he broke last update. No new content this update, just bug fixes, and backend stuff.`
  },
  {
    date: [2023, 8, 22],
    name: "HEXA HOTFIX UPDATE 2, ELECTRIC BOOGALOO",
    info: 
    `Hexa hopefully fixed some stuff. No new content this update, just bug fixes. (I think this was 5 hours after the last one)
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>7 Mend Milestone does not work in V anymore (temporary until we find a fix)</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>3 Mend Milestone actually states it gives Vacuum Acceleration (this was done by Royal, Hexa did the rest)</li>
    <li>Fixed some spelling mistakes.</li>
    <li>Hopefully fixed Glyph Presets allowing duplicate special glyphs before 7 Mend Milestone</li>
    <li>Added an icon for the Mending tab in the Aero theme</li>
    <li>Multipliers from Mending Milestone 1 are now present in the Multiplier Breakdown</li>
    <li>Fixed the Credits Modal in "About the Game"</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (We (Royal and Hexa) didn't edit anything there). However
    this doesn't seem to affect gameplay in any way, however TS192 is entirely missing.</li>
    <li>Glyph presets might still be broken (or more broken).</li>
    <li>V's reality can hardlock the game, make a backup save before entering</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought</li>
    </ul>`
  },
  {
    date: [2023, 8, 22],
    name: "EMERGENCY HOTFIX 2 and minor additions",
    info: 
    `Hexa broke some things internally (we (me and Hexa) couldn't test them until now)
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>3 Mend Milestone now also gives iU upgrade "Vaccum Acceleration"</li>
    <li>Mending Upgrade 5 now also gives Reality Machine generation and sets Remnants to max</li>
    <li>You can now hold shift to display Mending Upgrade names (no, I don't plan to be creative like the Reality and Imaginary ones)</li>
    <li>Endgame: 7 Mend Milestone, all non-stripped Mending Upgrades.</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed "Multiversal Remains and Mends becoming a number instead of a Decimal" fix preventing mends.</li>
    <li>Fixed 10 V-Achievement Milestone text updating with the wrong Mending Upgrade</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way.</li>
    <li>Glyph preset importing can equip more than 1 Effarig/Reality Glyph before the 7 Mend milestone. Please unequip before importing :).</li>
    <li>Viewing the credits in the "About the game" modal displays incorrectly, you should be able to hit the Escape key to exit.</li>
    <li>The Mending tab has no icon in the Aero theme</li>
    <li>V's reality can hardlock the game, make a backup save before entering</li>
    <li>Multipliers fromthe 1 Mend Milestone do not show up on the Multiplier Breakdown</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought</li>
    </ul>`
  },
  {
    date: [2023, 8, 22],
    name: "the 'no longer a one man job'",
    info: 
    `This patch would not be possible without Hexa, shoutouts to him. Note: this changelog entry was written by Royal after the fact, so everything changed may not all be reflected here
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>2 Mend Milestone Dilation Autobuyers now properly work</li>
    <li>Endgame: 7 Mend Milestone, all non-stripped Mending Upgrades.</li>
    </ul>
    <b>Bugfixes (all by Hexa):</b>
    <br>
    <ul>
    <li>Fixed Multiversal Remains and Mends becoming a number instead of a Decimal</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way.</li>
    <li>Glyph preset importing can equip more than 1 Effarig/Reality Glyph before the 7 Mend milestone. Please unequip before importing :).</li>
    <li>Viewing the credits in the "About the game" modal displays incorrectly, you should be able to hit the Escape key to exit.</li>
    <li>The Mending tab has no icon in the Aero theme</li>
    <li>V's reality can hardlock the game, make a backup save before entering</li>
    <li>Multipliers from the 1 Mend Milestone do not show up on the Multiplier Breakdown</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought</li>
    </ul>`
  },
  {
    date: [2023, 8, 20],
    name: "EMERGENCY HOTFIX 1",
    info: 
    `out of like Infinite. I was an idiot and tried to do a lazy-man's fix, but it accidently made Mending Upgrade 3 obsolete.
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>None</li>
    <li>Endgame: 7 Mend Milestone, all non-stripped Mending Upgrades.</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed 3 Mend Milestone giving Instant ECs (forgot to edit a vue file). If this affects you currently, enjoy the free ECs this Mend</li>
    <li>Fixed the update notification using my immature username I made when I was 14 (even though it's still in the address bar)</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way.</li>
    <li>Glyph preset importing can equip more than 1 Effarig/Reality Glyph before the 7 Mend milestone. Please unequip before importing :).</li>
    <li>Viewing the credits in the "About the game" modal displays incorrectly, you should be able to hit the Escape key to exit.</li>
    <li>The 2 Mend Milestone is also supposed to give autobuyers for the rebuyable Pelle dilation upgrades, but are currently non-functional. Tip: you can click on them once, then hold the Enter key to rebuy them rapidly.</li>
    <li>The Mending tab has no icon in the Aero theme</li>
    <li>V's reality can hardlock the game, make a backup save before entering</li>
    <li>Multipliers fromthe 1 Mend Milestone do not show up on the Multiplier Breakdown</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought</li>
    </ul>`
  },
  {
    date: [2023, 8, 20],
    name: "Bugfixes, and finally more upgrades",
    info: 
    `Even more bugfixes that fix things I overlooked. Note: Since school is starting back up for me. this might be the last patch for a while.
    Due to this, the new upgrades weren't tested as much
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Added Black Hole and Rebuyable Reality Upgrade Autobuyers to 3 Mend Milestone</li>
    <li>Implemented Mending Upgrades 5 and 9</li>
    <li>Endgame: 7 Mend Milestone, all non-stripped Mending Upgrades.</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed the Inverted BH appearing without Hard V being Unlocked</li>
    <li>Fixed being able to enter Pelle immediately after Mend</li>
    <li>Fixed some 1 Mend Milestone multipliers not working in Pelle</li>
    <li>Made all tabs unhidden on Mend</li>
    <li>Added "break" statements to some switch statements to avoid uninteneded behavior</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way.</li>
    <li>Glyph preset importing can equip more than 1 Effarig/Reality Glyph before the 7 Mend milestone. Please unequip before importing :).</li>
    <li>Viewing the credits in the "About the game" modal displays incorrectly, you should be able to hit the Escape key to exit.</li>
    <li>The 2 Mend Milestone is also supposed to give autobuyers for the rebuyable Pelle dilation upgrades, but are currently non-functional. Tip: you can click on them once, then hold the Enter key to rebuy them rapidly.</li>
    <li>The Mending tab has no icon in the Aero theme</li>
    <li>V's reality can hardlock the game, make a backup save before entering</li>
    <li>Multipliers fromthe 1 Mend Milestone do not show up on the Multiplier Breakdown</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought</li>
    </ul>`
  },
  {
    date: [2023, 8, 19],
    name: "New Content!? no just more bugfixes",
    info: 
    `Even more bugfixes that fix things I overlooked. Note: Since school is starting back up for me. this might be the last patch for a while.
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>Reality Upgrades that required 4 Glyphs now require at LEAST 4 Glyphs</li>
    <li>Added x1,000 Replicanti Speed to 1 Mend Milestone</li>
    <li>Added more Mending Upgrades, but they're not implemented (these might change)</li>
    <li>Changed Dark Matter Dimension Imaginary Upgrades to require the Previous Dark Matter Dimension</li>
    <li>Endgame: still 7 Mends, Mending Upgrades 2 and 3 (the non-stripped ones).</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Gave "START" perk after every mend to get around the hardcoded first Reality glyph reward</li>
    <li>Likewise, gave a power Glyph after Mending Upgrade 2 and every Mend after to simulate it</li>
    <li>Changed the Remnant gain formula so the x1.1 from 1 Mend Mlestone applies properly</li>
    <li>Made the Glyph Selection conformation default to ON on Mend</li>
    <li>Improved Mending Upgrade Readability in some themes</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way.</li>
    <li>The Invert BH button still shows up when Hard V is locked</li>
    <li>Glyph preset importing can equip more than 1 Effarig/Reality Glyph before the 7 Mend milestone. Please unequip before importing :).</li>
    <li>Viewing the credits in the "About the game" modal displays incorrectly, you should be able to hit the Escape key to exit.</li>
    <li>The 2 Mend Milestone is also supposed to give autobuyers for the rebuyable Pelle dilation upgrades, but are currently non-functional. Tip: you can click on them once, then hold the Enter key to rebuy them rapidly.</li>
    <li>The Mending tab has no icon in the Aero theme</li>
    <li>V's reality can hardlock the game, make a backup save before entering</li>
    <li>Multipliers fromthe 1 Mend Milestone do not show up on the Multiplier Breakdown</li>
    <li>Viewing the Mending Upgrades Screen puts a duplicate key error, but Upgrades can still be bought</li>
    </ul>`
  },
  {
    date: [2023, 8, 18],
    name: "The second bugifx",
    info: 
    `More bugfixes that fix things I overlooked.
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>None</li>
    <li>Endgame: still 7 Mends and both Mending Upgrades.</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Made "Auto Purge on Reality" glyph setting get set to false on Mend, because it was preventing Reality Resets.</li>
    <li>Changed V's tab visibility post Mend, because they're usually unlocked before Nameless completion.</li>
    <li>Fixed Alchemy not being reset on Mend (I think Pelle usually clears this, but futureproofing for Warp Reality)</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way.</li>
    <li>The Invert BH button still shows up when Hard V is locked</li>
    <li>Glyph preset importing can equip more than 1 Effarig/Reality Glyph before the 7 Mend milestone. Please unequip before importing :).</li>
    <li>Viewing the credits in the "About the game" modal displays incorrectly, you should be able to hit the Escape key to exit.</li>
    <li>The 2 Mend Milestone is also supposed to give autobuyers for the rebuyable Pelle dilation upgrades, but are currently non-functional. Tip: you can click on them once, then hold the Enter key to rebuy them rapidly.</li>
    <li>The Mending tab has no icon in the Aero theme</li>
    <li>V's reality can hardlock the game, make a backup save before entering</li>
    </ul>`
    
  },
  {
    date: [2023, 8, 17],
    name: "The first bugifx",
    info: 
    `No new Content this update, just some bugfixes.
    <br>
    <br>
    <b>New things:</b>
    <br>
    <ul>
    <li>None</li>
    <li>Endgame: still 7 Mends and both Mending Upgrades.</li>
    </ul>
    <b>Bugfixes:</b>
    <br>
    <ul>
    <li>Fixed Parity of Singularity's timer after the first Mend.</li>
    <li>Fixed the Mending button being too wide in Modern UI.</li>
    <li>Fixed readibility of unbought Mending Upgrades in some themes.</li>
    <li>Fixed readibility of unachieved Mending Milestones in some themes.</li>
    <li>Fixed save importing disabiling the ability to do speedruns.</li>
    <li>Fixed pre-Reality achievements reseting on Reality (post Mend).</li>
    <li>Fixed Mending tab being hidden post-Mend on some imported saves.</li>
    <li>probably some other stuff I forgot.</li>
    </ul>
    <b>Known Issues:</b>
    <br>
    <ul>
    <li>There are console errors when viewing the Time Study Tree in Nameless' Reality (I didn't edit anything there). However
    this doesn't seem to affect gameplay in any way.</li>
    <li>The Invert BH button still shows up when Hard V is locked</li>
    <li>Glyph preset importing can equip more than 1 Effarig/Reality Glyph before the 7 Mend milestone. Please unequip before importing :).</li>
    <li>Viewing the credits in the "About the game" modal displays incorrectly, you should be able to hit the Escape key to exit.</li>
    <li>The 2 Mend Milestone is also supposed to give autobuyers for the rebuyable Pelle dilation upgrades, but are currently non-functional. Tip: you can click on them once, then hold the Enter key to rebuy them rapidly.</li>
    <li>The Mending tab has no icon in the Aero theme</li>
    </ul>`
    
  },
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

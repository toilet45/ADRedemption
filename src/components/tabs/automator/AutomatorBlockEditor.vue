<script>
import AutomatorSingleBlock from "./AutomatorSingleBlock";
import draggable from "vuedraggable";

export default {
  name: "AutomatorBlockEditor",
  components: {
    AutomatorSingleBlock,
    draggable
  },
  computed: {
    lineNumbersCount() {
      return Math.max(this.lines.length, 1);
    },
    lines: {
      get() {
        return this.$viewModel.tabs.reality.automator.lines;
      },
      set(value) {
        this.$viewModel.tabs.reality.automator.lines = value;
      }
    }
  },
  methods: {
    parseRequest() {
      BlockAutomator.parseTextFromBlocks();
    },
    updateBlock(block, id) {
      this.lines[this.lines.findIndex(x => x.id === id)] = block;
      this.parseRequest();
    },
    deleteBlock(id) {
      const idx = this.lines.findIndex(x => x.id === id);
      this.lines.splice(idx, 1);
      this.parseRequest();
    },
  }
};

export const BlockAutomator = {
  _idArray: [],

  get lines() {
    return ui.view.tabs.reality.automator.lines;
  },

  set lines(arr) {
    ui.view.tabs.reality.automator.lines = arr;
    this.updateIdArray();
  },

  get currentBlockId() {
    if (AutomatorBackend.stack.isEmpty) return false;
    return this._idArray[AutomatorBackend.currentLineNumber - 1];
  },

  parseTextFromBlocks() {
    const content = this.parseLines(BlockAutomator.lines).join("\n");
    const automatorID = ui.view.tabs.reality.automator.editorScriptID;
    AutomatorBackend.saveScript(automatorID, content);
  },

  fromText(scriptText) {
    const lines = AutomatorGrammar.blockifyTextAutomator(scriptText);
    if (lines) {
      this.lines = lines;
    }
    return lines;
  },

  generateText(block, indentation = 0) {
    let parsed = "\t".repeat(indentation) + block.cmd;

    parsed = parsed
      .replace("LOAD", "STUDIES LOAD PRESET")
      .replace("RESPEC", "STUDIES RESPEC")
      .replace("COMMENT", "//")
      .replace("BLOB", "blob  ");

    if (block.target) parsed += ` ${block.target}`;
    if (block.secondaryTarget) parsed += ` ${block.secondaryTarget}`;
    if (block.inputValue) parsed += ` ${block.inputValue}`;
    if (block.cmd === "IF" || block.cmd === "WHILE" || block.cmd === "UNTIL") parsed += " {";

    return parsed;
  },

  parseLines(l, indentation = 0) {
    const lines = [];
    for (let i = 0; i < l.length; i++) {
      lines.push(this.generateText(l[i], indentation));
      if (l[i].cmd === "IF" || l[i].cmd === "WHILE" || l[i].cmd === "UNTIL") {
        lines.push(...this.parseLines(l[i].nest, indentation + 1));
        lines.push(`${"\t".repeat(indentation)}}`);
      }
    }

    return lines;
  },

  blockIdArray(blocks) {
    const output = [];
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      output.push(b.id);
      if (b.nested) output.push(...this.blockIdArray(b.nest), undefined);
    }
    return output;
  },

  updateIdArray() {
    this._idArray = this.blockIdArray(this.lines);
  }
};
</script>

<template>
  <div class="c-automator-block-editor">
    <draggable
      v-model="lines"
      group="code-blocks"
      class="c-automator-blocks"
      ghost-class="c-automator-block-row-ghost"
      @end="parseRequest"
    >
      <AutomatorSingleBlock
        v-for="(block, index) in lines"
        :key="block.id"
        :line-number="index"
        :block="block"
        :update-block="updateBlock"
        :delete-block="deleteBlock"
      />
    </draggable>
  </div>
</template>

<style scoped>

</style>
<template>
  <div class="container" :class="{completed: completed}">
    <div class="canvas" :class="{'show-numbers': showNumbers}">
      <div v-for="(value, name, index) in positions" 
        :key="index"
        :class="'cell position' + value"
        @click="moveTo(index)">
        </div>
    </div>
    <div class="sidebar">
      <label><input type="checkbox" v-model="showNumbers"> Show numbers</label>
      <h3>Preview</h3>
      <div class="preview"></div>
      <h4>Move: {{ moveCount }}</h4>
      <h2 class="success-message" v-if="completed">Congrats!</h2>
      <button @click="shuffle">Restart</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'Puzzle',
  data() {
    return {
      showNumbers: true
    }
  },
  computed: {
    ...mapState(['moveCount']),
    ...mapGetters(['completed']),
    positions () {
      let positions = {};

      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) { 
          const cellPos = this.$store.state.tiles[x * 4 + y];
          positions[`${x+1}${y+1}`] = [~~(cellPos / 4), cellPos % 4].join('');
        }
      }

      return positions;
    }
  },
  created() {
    this.shuffle();
  },
  methods: {
    ...mapActions(['moveTo', 'shuffle']),
  }
}
</script>

<style scoped>
  .container {
    display: flex;
  }

  .canvas {
    position: relative;
    /* Dynamically set width/height of puzzle with css variable */
    --size: 600;
    height: calc(var(--size) * 1px);
    width: calc(var(--size) * 1px);
    border: solid 1px #333;
  }

  .completed .canvas {
    pointer-events: none;
    border-color: green;
  }

  .success-message {
    color: green;
  }

  .sidebar {
    padding: 10px;
  }

  .preview {
    background: url(../assets/monks.jpg) no-repeat;
    height: 150px;
    background-size: contain;
  }
  .cell {
    position: absolute;
    width: 25%;
    height: 25%;
    background-image: url(../assets/monks.jpg);
    background-repeat: no-repeat;
    border: solid 1px white;
    box-sizing: border-box;
    background-size: calc(var(--size) * 1px) calc(var(--size) * 1px);
    transition: all ease .3s;
    z-index: 1;
  }

  .completed .cell {
    border: none;
  }

  .cell:after {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    text-shadow: 0 0 2px black;
  }

  .show-numbers .cell:after {
    display: block;
  }

  .completed .cell:after {
    display: none;
  }

  /* Would be a loop in SASS/LESS/Stylus but it'll be also complicated */
  .cell:nth-child(1) { background-position: 0 0; }
  .cell:nth-child(1):after { content: '1'; }
  .cell:nth-child(2) { background-position: calc(var(--size) * .25px * -1) 0; }
  .cell:nth-child(2):after { content: '2'; }
  .cell:nth-child(3) { background-position: calc(var(--size) * .5px * -1) 0; }
  .cell:nth-child(3):after { content: '3'; }
  .cell:nth-child(4) { background-position: calc(var(--size) * .75px * -1) 0; }
  .cell:nth-child(4):after { content: '4'; }

  .cell:nth-child(5) { background-position: 0 calc(var(--size) * .25px * -1); }
  .cell:nth-child(5):after { content: '5'; }
  .cell:nth-child(6) { background-position: calc(var(--size) * .25px * -1) calc(var(--size) * .25px * -1); }
  .cell:nth-child(6):after { content: '6'; }
  .cell:nth-child(7) { background-position: calc(var(--size) * .5px * -1) calc(var(--size) * .25px * -1); }
  .cell:nth-child(7):after { content: '7'; }
  .cell:nth-child(8) { background-position: calc(var(--size) * .75px * -1) calc(var(--size) * .25px * -1); }
  .cell:nth-child(8):after { content: '8'; }

  .cell:nth-child(9) { background-position: 0 calc(var(--size) * .5px * -1); }
  .cell:nth-child(9):after { content: '9'; }
  .cell:nth-child(10) { background-position: calc(var(--size) * .25px * -1) calc(var(--size) * .5px * -1); }
  .cell:nth-child(10):after { content: '10'; }
  .cell:nth-child(11) { background-position: calc(var(--size) * .5px * -1) calc(var(--size) * .5px * -1); }
  .cell:nth-child(11):after { content: '11'; }
  .cell:nth-child(12) { background-position: calc(var(--size) * .75px * -1) calc(var(--size) * .5px * -1); }
  .cell:nth-child(12):after { content: '12'; }

  .cell:nth-child(13) { background-position: 0 calc(var(--size) * .75px * -1); }
  .cell:nth-child(13):after { content: '13'; }
  .cell:nth-child(14) { background-position: calc(var(--size) * .25px * -1) calc(var(--size) * .75px * -1); }
  .cell:nth-child(14):after { content: '14'; }
  .cell:nth-child(15) { background-position: calc(var(--size) * .5px * -1) calc(var(--size) * .75px * -1); }
  .cell:nth-child(15):after { content: '15'; }
  .cell:nth-child(16) { background-color: white; background-image: none; z-index: 0;}
  .cell:nth-child(16):after { content: '16'; }

  .completed .cell:nth-child(16) { background-color: initial; background-image: url(../assets/monks.jpg); background-position: calc(var(--size) * .75px * -1) calc(var(--size) * .75px * -1);}

  .position00 { left: 0;    top: 0; }
  .position01 { left: 25%;  top: 0; }
  .position02 { left: 50%;  top: 0; }
  .position03 { left: 75%;  top: 0; }

  .position10 { left: 0;    top: 25%; }
  .position11 { left: 25%;  top: 25%; }
  .position12 { left: 50%;  top: 25%; }
  .position13 { left: 75%;  top: 25%; }

  .position20 { left: 0;    top: 50%; }
  .position21 { left: 25%;  top: 50%; }
  .position22 { left: 50%;  top: 50%; }
  .position23 { left: 75%;  top: 50%; }

  .position30 { left: 0;    top: 75%; }
  .position31 { left: 25%;  top: 75%; }
  .position32 { left: 50%;  top: 75%; }
  .position33 { left: 75%;  top: 75%; }
</style>

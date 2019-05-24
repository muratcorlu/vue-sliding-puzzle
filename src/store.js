import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getFreshTiles = () => Array.from(new Array(16)).map((value, index) => index);
const latestState = getFreshTiles();

const getCoordinates = (index) => {
  return [~~(index / 4), index % 4]
};

const isNextToSpaceTile = (target, spaceCell) => {
  const [ row, col ] = target;
  const [ spaceRow, spaceCol ] = spaceCell;

  return (row === spaceRow && (col === spaceCol - 1 || col === spaceCol + 1)) ||
    (col === spaceCol && (row === spaceRow - 1 || row === spaceRow + 1) );

}

export const mutations = {
  shuffle(state) {
    state.tiles = state.tiles.sort(() => Math.random() > 0.5 ? 1 : -1);
    state.moveCount = 0;
  },
  move (state, index) {
    state.moveCount++;
    [state.tiles[index], state.tiles[state.spaceIndex]] = [state.tiles[state.spaceIndex], state.tiles[index]]
    state.tiles = [...state.tiles];
  }
};

export const actions = {
  shuffle({ commit }) {
    commit('shuffle');
  },
  moveTo({ commit, state }, index) {
    const spaceIndex = state.spaceIndex;
    const indexPos = state.tiles[index];

    // Don't move if it's empty cell
    if (index === spaceIndex) {
      return;
    }

    const target = getCoordinates(indexPos);
    const spaceCell = getCoordinates(state.tiles[spaceIndex]);

    if (isNextToSpaceTile(target, spaceCell)) {
      commit('move', index);
    }
  }
};

export const getters = {
  completed: state => {
    return state.tiles.every((value, index) => value === latestState[index]);
  }
};

export default new Vuex.Store({
  state: {
    moveCount: 0,
    spaceIndex: 15,
    tiles: getFreshTiles(),
  },
  mutations,
  actions,
  getters
})

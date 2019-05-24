import { expect } from 'chai';
import { mutations, actions } from '@/store';
import { testAction } from './vuex-test-utils';

const { shuffle, move } = mutations;
const { moveTo } = actions;

describe('mutations', () => {
  it('shuffle', () => {
    const tiles = [0,1,2,3];
    const state = { tiles: [...tiles] };

    shuffle(state);

    expect(state.tiles).not.deep.equal(tiles);
  })

  it('move', () => {
    const state = { spaceIndex: 3, tiles: [0,1,2,3,4]};

    move(state, 1);

    expect(state.tiles).deep.equal([0, 3, 2, 1, 4]);
  })
});

describe('actions', () => {
  it('moveTo', done => {
    const state = { spaceIndex: 0, tiles: Array.from(new Array(16)).map((value, index) => index)};

    testAction(moveTo, 1, state, [ {type: 'move', payload: 1 } ], done);
  });
})
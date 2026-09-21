import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import configureAppStore from './configureStore.js';
import {
  bugAdded,
  bugResolved,
  loadBugs,
  getUnresolvedBugs
} from './bugs.js';

const serverBugs = [
  { id: 1, description: 'Bug 1', userId: 1, resolved: true },
  { id: 2, description: 'Bug 2', userId: 1 },
  { id: 3, description: 'Bug 3', userId: 2 }
];

describe('bugs slice', () => {
  let store;
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => serverBugs
    });
    vi.stubGlobal('fetch', fetchMock);
    store = configureAppStore();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('resolving a bug', () => {
    it('marks the bug as resolved and saves it to the server', () => {
      store.dispatch(bugAdded({ description: 'Bug' }));
      const { id } = store.getState().bugs[0];

      store.dispatch(bugResolved(id));

      expect(store.getState().bugs[0].resolved).toBe(true);
      expect(fetchMock).toHaveBeenCalledWith(
        `http://localhost:5000/api/bugs/${id}`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ resolved: true })
        })
      );
    });
  });

  describe('loading bugs', () => {
    it('puts bugs from the server into the store', async () => {
      await store.dispatch(loadBugs());

      expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/bugs');
      expect(store.getState().bugs).toEqual(serverBugs);
    });

    it('keeps the store empty if the request fails', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));
      vi.spyOn(console, 'error').mockImplementation(() => {});

      await store.dispatch(loadBugs());

      expect(store.getState().bugs).toEqual([]);
    });
  });

  describe('getting unresolved bugs', () => {
    it('returns only bugs that are not resolved', () => {
      const result = getUnresolvedBugs({ bugs: serverBugs });

      expect(result.map((bug) => bug.id)).toEqual([2, 3]);
    });
  });
});
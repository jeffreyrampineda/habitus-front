function updateBadgeCounts(items) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    chrome.storage.local.get(['counts'], (result) => {
      let countsObj = result.counts;
      if (countsObj) {
        const count = items.length;

        countsObj.tabs[tabs[0].id.toString()] = count;
        chrome.storage.local.set({ counts: counts });
        setBadge(count);
      }
    });
  });
}

function setBadge(count) {
  if (chrome.browserAction) {
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      updateBadgeCounts(state.posts.items);
    });
    return store;
  };
}

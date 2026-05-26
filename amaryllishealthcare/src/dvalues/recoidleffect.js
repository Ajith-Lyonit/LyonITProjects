// recoilEffects.ts
export const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    if (typeof window === "undefined") return;

    // Load saved value
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // Save on changes
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

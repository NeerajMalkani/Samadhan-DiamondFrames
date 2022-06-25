

export const CreateSession = (parameters: { key: string; value: string }[]) => {
  if (parameters && parameters.length > 0) {
    parameters.forEach((k) => {
      if (k.key && k.value) {
        window.sessionStorage.setItem(k.key, k.value);
      }
    });
  }
};

export const GetSession = (key: string | null) => {
  if (key) {
    return window.sessionStorage.getItem(key);
  } else {
    return null;
  }
};

export const RemoveSession = (key: string | null) => {
  if (key) {
    return window.sessionStorage.removeItem(key);
  } else {
    return null;
  }
};



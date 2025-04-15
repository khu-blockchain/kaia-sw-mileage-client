const setLocalStorageData = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

const getLocalStorageData = (key: string) => {
  return localStorage.getItem(key)
}

const removeLocalStorageData = (key: string) => {
  localStorage.removeItem(key)
}


export {
  setLocalStorageData,
  getLocalStorageData,
  removeLocalStorageData
}

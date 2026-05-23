const STORAGE_KEY = 'activeSetlistId'

export function setActiveSetlist(
  id: string
) {
  localStorage.setItem(
    STORAGE_KEY,
    id
  )
}

export function getActiveSetlist() {
  return localStorage.getItem(
    STORAGE_KEY
  )
}

export function clearActiveSetlist() {
  localStorage.removeItem(
    STORAGE_KEY
  )
}

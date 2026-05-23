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
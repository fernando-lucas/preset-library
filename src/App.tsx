import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { PresetDetailsPage } from './pages/PresetDetailsPage'

import { NewPresetPage } from './pages/NewPresetPage'

import { EditPresetPage } from './pages/EditPresetPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/preset/:id"
        element={<PresetDetailsPage />}
      />

      <Route
        path="/new-preset"
        element={<NewPresetPage />}
      />

      <Route
        path="/preset/:id/edit"
        element={<EditPresetPage />}
      />

    </Routes>

    
  )
}

export default App
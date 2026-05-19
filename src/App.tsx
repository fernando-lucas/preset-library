import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { PresetDetailsPage } from './pages/PresetDetailsPage'
import { NewPresetPage } from './pages/NewPresetPage'
import { EditPresetPage } from './pages/EditPresetPage'
import { AmpsPage } from './pages/AmpsPage'
import { AmpDetailsPage } from './pages/AmpDetailsPage'

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

      <Route
        path="/amps"
        element={<AmpsPage />}
      />
      
      <Route
        path="/amp/:id"
        element={<AmpDetailsPage />}
      />
    </Routes>

    
  )
}

export default App
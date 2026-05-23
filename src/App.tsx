import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { PresetDetailsPage } from './pages/PresetDetailsPage'
import { NewPresetPage } from './pages/NewPresetPage'
import { EditPresetPage } from './pages/EditPresetPage'
import { AmpsPage } from './pages/AmpsPage'
import { AmpDetailsPage } from './pages/AmpDetailsPage'
import { SetlistsPage } from './pages/SetlistsPage'
import { NewSetlistPage } from './pages/NewSetlistPage'
import { BottomNavigation } from './components/BottomNavigation'
import { EditSetlistPage } from './pages/EditSetlistPage'
import { BackupPage } from './pages/BackupPage'

function App() {
  return (
    <div className="pb-28">
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
        <Route
          path="/setlists"
          element={<SetlistsPage />}
        />
        <Route
          path="/new-setlist"
          element={<NewSetlistPage />}
        />
        <Route
          path="/setlists/:id/edit"
          element={<EditSetlistPage />}
        />
        <Route
          path="/backup"
          element={<BackupPage />}
        />

      </Routes>
      <BottomNavigation />
    </div>
    
  )
}

export default App

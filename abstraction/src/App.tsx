import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ModuleOrientation from './pages/ModuleOrientation';
import SectionPage from './pages/SectionPage';
import LsatSet from './pages/LsatSet';
import Complete from './pages/Complete';
import AppShell from './components/AppShell';
import { bootcamp } from './content/roleQuestions';

export default function App() {
  return (
    <AppShell bootcamp={bootcamp}>
      <Routes>
        <Route path="/" element={<Dashboard bootcamp={bootcamp} />} />
        <Route path="/m/:moduleSlug" element={<ModuleOrientation bootcamp={bootcamp} />} />
        <Route path="/m/:moduleSlug/lsat" element={<LsatSet bootcamp={bootcamp} />} />
        <Route path="/m/:moduleSlug/complete" element={<Complete bootcamp={bootcamp} />} />
        <Route path="/m/:moduleSlug/:sectionSlug" element={<SectionPage bootcamp={bootcamp} />} />
      </Routes>
    </AppShell>
  );
}

import WelcomeScreen from './pages/WelcomeScreen';
import CreateAccount from './pages/onBoarding/accountCreation/CreateAccount';
import './App.css';
import { useSelector } from 'react-redux';
import Loading from './componants/Loading';
import FamilyDashboard from './pages/family/FamilyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import EducatorDashboard from './pages/educator/EducatorDashboard';
import DevDashboard from './pages/developer/DevDashboard';

function App() {
  const pages = useSelector(state => state.pages.current);
  const loading = useSelector(state => state.pages.loading);
  const userLoading = useSelector(state => state.user.loading);

  const handlePageLoad = () => {
  switch (pages) {
    case 'WelcomeScreen':
      return <WelcomeScreen />;
    case 'CreateAccount':
      return <CreateAccount />;
    case 'FamilyDashboard':
      return <FamilyDashboard />;
    case 'AdminDashboard':
      return <AdminDashboard />;
    case 'EducatorDashboard':
      return <EducatorDashboard />;
    case 'DevDashboard':
      return <DevDashboard />;
    default:
      return <WelcomeScreen />;
  }
  }

  return (
    <div className='app-container'>
      {pages !== null ? handlePageLoad() : <WelcomeScreen />}
      {loading || userLoading ? <Loading /> : null}
    </div>
  );
}

export default App;

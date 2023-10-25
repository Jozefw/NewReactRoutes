import {Outlet,useNavigation} from 'react-router-dom';
import MainNavigation from './MainNavigation';

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
    <MainNavigation></MainNavigation>
    {navigation.state === 'loading' && <p>Loading...</p>}
    <main>
    <Outlet></Outlet>
    </main>
    </>
  )
}

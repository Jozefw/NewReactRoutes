import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout';
import HomePage from './components/HomePage';
import Events,{ getEventsData } from './components/Events';
import EventDetail, {EventItemLoader,DeleteEvent} from './components/EventDetail';
import EventsRootLayout from './components/EventsRootLayout';
import NewEvent from './components/NewEvent';
import ErrorPage from './components/ErrorPage';
import EditEvent from './components/EditEvent';
import MainNavigation from './components/MainNavigation';
import NewsletterSignup from './components/NewsletterSignup';
import Newsletter,{NewsletterAction} from './components/Newsletter';
import {EventAction} from './components/EventForm';

const routes = createBrowserRouter([
  {path:'/',
  element:<RootLayout></RootLayout>,
  errorElement:<ErrorPage></ErrorPage>,
  children:[
    {index:true,
    element:<HomePage></HomePage>},
    {path:'/events',
    element:<EventsRootLayout></EventsRootLayout>,
      children:[
      {index:true,
        element:<Events></Events>, 
        loader:getEventsData},
        {path:':eventId',
        id:'eventDetail',
        loader:EventItemLoader,
        children:[
          {index:true,
            element:<EventDetail></EventDetail>,
            action:DeleteEvent,
            },
            {path:'edit',
            element:<EditEvent></EditEvent>,
            action:EventAction}
            ]
        },
      {path:'new',
      element:<NewEvent></NewEvent>,
      action:EventAction}
    ]},
    {path:'newsletter',
    element:<Newsletter></Newsletter>,
    action:NewsletterAction,
   },
  ]}
])

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;

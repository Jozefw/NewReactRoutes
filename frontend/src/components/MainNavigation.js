import {NavLink} from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
          <NavLink to='/' className={({isActive}) => isActive ? classes.active :undefined}end>Home</NavLink>
          </li>
          <li>
          <NavLink to='/events' className={({isActive}) => isActive ? classes.active :undefined}>Events</NavLink>
          </li>
          {/* <li> */}
          {/* <NavLink to='/new-event' className={({isActive})=> isActive ? classes.Active :undefined}>New Event</NavLink>
          </li>
          <li>
          <NavLink to='/events-list' className={({isActive})=> isActive ? classes.Active :undefined}>All Events</NavLink>
          </li>
          <li>
          <NavLink to='/event-detail' className={({isActive})=> isActive ? classes.Active :undefined}>Event Details</NavLink>
          </li>
          <li>
          <NavLink to='/edit-events' className={({isActive})=> isActive ? classes.Active :undefined}>Edit Event</NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

import classes from './EventItem.module.css';
import { NavLink,useSubmit } from 'react-router-dom';

function EventItem({ event }) {
  const submitResults = useSubmit();

  function startDeleteHandler() {
    const deleteEventBool = window.confirm("Are you certain you want to delete this event?");
    if (deleteEventBool) {
      submitResults(null, {method:"delete"})
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <NavLink to="edit">Edit</NavLink>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;

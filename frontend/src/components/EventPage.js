import {useLoaderData} from 'react-router-dom';
import EventsList from './EventsList';

export default function EventPage() {
    const events = useLoaderData();
  return (
    <EventList></EventList>    
  )
}

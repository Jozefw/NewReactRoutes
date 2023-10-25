import { useLoaderData,json } from 'react-router-dom';
import EventsList from '../components/EventsList';

function Events() {
  const events = useLoaderData();
  return (
    <>
    <EventsList events={events}></EventsList>
    </>
  );
}
export default Events;

export async function getEventsData(){
  const response = await fetch('http://localhost:8080/events');
  if(!response.ok){
      //throw new Response(JSON.stringify({message:"Could not retrieve data"},{status:500}));
      throw json(
        {message:"Could not retrieve data"},
        {status:500}
      );
  }else{
      const responseEventData = await response.json()
      return responseEventData.events;
  }
}
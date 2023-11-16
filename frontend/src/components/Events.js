import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

function Events() {
  const {eventsDef} = useLoaderData();
  //events will have the key value pair from the defer in getEventsData
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>...Loading...Loading...</p>}>
    <Await resolve = {eventsDef}>
      {(loadedEvents)=><EventsList events={loadedEvents}></EventsList>}
    </Await>
    </Suspense>
  );
}
export default Events;

async function loadEvents() {
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

export function getEventsData(){
  return defer({
    eventsDef:loadEvents()
  })
}
import {Suspense} from 'react';
import {useRouteLoaderData,json,redirect,defer, Await} from 'react-router-dom';
import EventItem from './EventItem';
import EventsList from './EventsList';

export default function EventDetail() {
  const {event,events} = useRouteLoaderData('eventDetail');
  return (
    <>
    <Suspense fallback={<p style={{textAlign: 'center'}}>...Loading... Event...</p>}>
      <Await resolve={event}>
        <p>hi</p>
        {(loadedEvent)=><EventItem event={loadedEvent}></EventItem>}
      </Await>
    </Suspense>
    <Suspense fallback={<p style={{textAlign: 'center'}}>...Loading Event List</p>}>
      <Await resolve={events}>
        {(loadedEventsList)=> <EventsList events={loadedEventsList}></EventsList>}
      </Await>
    </Suspense>
    </>
  )
}

async function loadEventsOnDetailsPage() {
  const response = await fetch('http://localhost:8080/events');
  if(!response.ok){
      //throw new Response(JSON.stringify({message:"Could not retrieve data"},{status:500}));
      throw json(
        {message:"Could not retrieve data"},
        {status:500}
      );
  }else{
      const responseEventData = await response.json()
      console.log("everything is great for the Details")
      console.log(responseEventData.events)
      return responseEventData.events;
  }
}

async function LoadEvent(id){
  const EventItemResponse = await fetch(`http://localhost:8080/events/${id}`);
  if(!EventItemResponse.ok){
    throw json({msg:"A problem fetching the resource details occurred"},{status:500})
  }else{
    console.log("everything is great for the Event")
    const responseEventData = await EventItemResponse.json()
    return responseEventData.event;
  }
}

export async function EventItemLoader({request,params}){
  const EventItemLoaderId = params.eventId;
  defer({
    event:await LoadEvent(EventItemLoaderId),
    events:loadEventsOnDetailsPage()
  })
}

export async function DeleteEvent({params,request}){
  const eventId = params.eventId
  const DeleteEventResponse = await fetch(`http://localhost:8080/events/${eventId}`,{method:request.method})

  if(!DeleteEventResponse.ok){
    throw json({msg:"A problem deleting the resource details occurred"},{status:500})
  }
  return redirect('/events');
  }

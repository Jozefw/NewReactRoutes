import {useRouteLoaderData,json,redirect} from 'react-router-dom';
import EventItem from './EventItem';

export default function EventDetail() {
  const ItemDetailsData = useRouteLoaderData('eventDetail');
  return (
   <EventItem event={ItemDetailsData.event}></EventItem>
  )
}

export async function EventItemLoader({request,params}){
  const EventItemLoaderId = params.eventId;
  const EventItemResponse = await fetch(`http://localhost:8080/events/${EventItemLoaderId}`);
  if(!EventItemResponse.ok){
    throw json({msg:"A problem fetching the resource details occurred"},{status:500})
  }else{
    return EventItemResponse;
  }
}

export async function DeleteEvent({params,request}){
  const eventId = params.eventId
  const DeleteEventResponse = await fetch(`http://localhost:8080/events/${eventId}`,{method:request.method})

  if(!DeleteEventResponse.ok){
    throw json({msg:"A problem deleting the resource details occurred"},{status:500})
  }
  return redirect('/events');
  }

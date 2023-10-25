import {useRouteLoaderData} from 'react-router-dom';
import EventForm from './EventForm';

export default function EditEvent() {
  const data = useRouteLoaderData("eventDetail");
  const editEventData = data.event;

  return (
    <EventForm method="PATCH" event={editEventData}></EventForm>
  )
}

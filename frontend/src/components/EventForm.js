import { Form, useNavigate,useNavigation,useActionData,json,redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigationInfo = useNavigation();

  const isSubmitting = navigationInfo.state ==='submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors &&
        <ul>
          {Object.values(actionData.errors).map(error =>(
            <li key={error}>{error}</li>
          ))}
        </ul>
      }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title"  required defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image"  required defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date"  required defaultValue={event ? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5"  defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' :'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

// all form data will be handed to Action
export async function EventAction({request,params}){
  const eventMethod = request.method;
  console.log(request)
  const data = await request.formData();
  const dataObj ={
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }
  let url = `http://localhost:8080/events`;
  if(eventMethod === "PATCH"){
    url = `${url}/${params.eventId}`
  }

  const response = await fetch(url,{
    method:eventMethod,
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(dataObj)
  })
  // if validation response error
  if (response.status === 422){
    return response;
  }
  if (!response.ok){
    throw json({message:"Could not save event"},{status:500})
  }
  return redirect('/events');
}

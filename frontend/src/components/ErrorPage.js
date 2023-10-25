import MainNavigation from "./MainNavigation";
import PageContent from "./PageContent";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    let title="";
    let message="";

    if (error.status === 500){
        console.log(error)
        // message = JSON.parse(error.data).message ....don't have to do this due to json() utility helper fx
        message = error.data.message
        title="An error occurred..."
    }
    if(error.status===404){
        console.log(error)
        message = "404 Page not found";
        title="Error locating resource"
    }
  return (
    <>
  <MainNavigation></MainNavigation>  
   <PageContent title={title}>
    <p>{message}</p>
   </PageContent>
    </>
  )
}

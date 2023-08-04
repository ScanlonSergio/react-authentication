import { useRouteError } from "react-router";

import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function ErrorPage () {
    const error = useRouteError();

    let title = 'An Error Occurred';
    let message = '...Something went wrong...';

    if(error.status === 500) {
        // error when trown using the Response method
        // message = JSON.parse(error.data).message;
        // when error is throw using json utility function.
        message = error.data.message;
    }

    if(error.status === 404) {
        title = 'Not Found';
        message = '...Could not find resource or page...';
    } 

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>   
    )
}

export default ErrorPage;
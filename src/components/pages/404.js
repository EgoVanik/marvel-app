import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return(
        <div style={{'textAlign': 'center'}}>
            <ErrorMessage/>
            <p style={{'fontWeight': 'bold', 'fontSize': '24px'}}>Page dosn't exist</p>
            <Link style={{'display': 'block', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9F0013'}} to="/">Back to main page</Link>
        </div>
    )
}
export default Page404;
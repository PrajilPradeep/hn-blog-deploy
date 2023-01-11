import { Link } from "react-router-dom";
const NotFound = () => {
    return ( <div className="not-found">
        <h2>Sorry !</h2>
        <h3>The requested page is not found</h3>
        <Link to="/">Home Page</Link>
    </div> );
}
 
export default NotFound;
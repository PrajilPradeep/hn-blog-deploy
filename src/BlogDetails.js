import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    
    const { id } = useParams();
    const {data: blog, isPending, error} = useFetch('https://auspicious-necessary-honeydew.glitch.me/blogs/'+id);
    const history = useHistory();
    const handleDelete = ()=>{
        fetch('https://auspicious-necessary-honeydew.glitch.me/blogs/'+blog.id, {
            method: 'DELETE'})
            .then(()=>{
                history.push("/");
            })
    }
    return ( 
        <div className="blog-details">
            { isPending && <p>Loading...!</p> }
            { error && <p>{ error }</p>}
            { blog && <article>
                <h2>{ blog.title }</h2>
                <p>Written by: { blog.author }</p>
                <div>{ blog.body }</div>
                <button onClick={handleDelete}>Delete blog</button>
            </article> }
        </div>
     );
}
 
export default BlogDetails;
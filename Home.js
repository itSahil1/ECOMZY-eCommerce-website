import { useEffect, useState } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";

const Home = () => {
    const API_URL = "https://fakestoreapi.com/products";
     const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    async function fetchProductsData() {
     setLoading(true);
      
     try{
         const res = await fetch(API_URL);
         const data = await res.json();

         setPosts(data);
     }
      catch(error) {
        console.log("Error in API");
        setPosts([]);

      }
      setLoading(false)
    }

     useEffect( () =>{
        fetchProductsData();
     }, [])



  return (
        <div>
            {
                loading ? <Spinner/> :
                posts.length > 0 ?
                (<div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto
                min-h-[80vh]">
                  {
                    posts.map( (post) => (
                        <Product key = {post.id} post={post} />
                    ))
                  }
                </div>) :
                <div className="flex justify-center items-center">
                    <p>No Data Found</p>
                </div>
            }
        </div>
  )
  
};

export default Home

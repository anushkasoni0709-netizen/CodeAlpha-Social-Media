import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

function Home() {

  const navigate = useNavigate();

  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [posts, setPosts] = useState([]);



  // Check Login
  useEffect(() => {

    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    }

  }, [navigate]);




  // Fetch Posts
  useEffect(() => {
    fetchPosts();
  }, []);




  const fetchPosts = async () => {
  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );


    if (!user) {
      navigate("/login");
      return;
    }


    const res = await axios.get(
      `http://localhost:8000/api/posts/user/${user._id}`
    );


    setPosts(res.data);


  } catch(error) {

    console.log(error);

  }
};




  // Create Post
  const handlePost = async () => {


    if(post.trim() === "" && !image){
      alert("Write something or select image");
      return;
    }



    try {


      let imageUrl = "";



      // Upload Image
      if(image){


        const formData = new FormData();

        formData.append(
          "image",
          image
        );



        const uploadRes = await axios.post(
          "http://localhost:8000/api/posts/upload",
          formData,
          {
            headers:{
              "Content-Type":"multipart/form-data",
            },
          }
        );


        imageUrl = uploadRes.data.imageUrl;

      }





      const user = JSON.parse(
        localStorage.getItem("user")
      );



      if(!user){

        alert("Login again");

        navigate("/login");

        return;

      }





      const response = await axios.post(
        "http://localhost:8000/api/posts/create",
        {
          author:user.name,
          userId:user._id,
          content:post,
          image:imageUrl,
        }
      );



      console.log(
        "POST CREATED:",
        response.data
      );



      fetchPosts();



      setPost("");

      setImage(null);

      setPreview("");



    } catch(error){


      console.log(
        "POST ERROR:",
        error.response?.data || error
      );


      alert(
        error.response?.data?.message ||
        "Post Upload Failed"
      );


    }


  };






  // Like
  const handleLike = async(id)=>{

    try{


      const res = await axios.put(
        `http://localhost:8000/api/posts/like/${id}`
      );


      setPosts(
        posts.map(item =>
          item._id === id
          ? res.data
          : item
        )
      );


    }catch(error){

      console.log(error);

    }

  };






  // Delete
  const handleDelete = async(id)=>{


    try{


      await axios.delete(
        `http://localhost:8000/api/posts/${id}`
      );



      setPosts(
        posts.filter(
          item=>item._id !== id
        )
      );



    }catch(error){

      console.log(error);

      alert("Delete Failed");

    }


  };







  // Comment
  const handleComment = async(id,comment)=>{


    if(comment.trim()==="") return;



    try{


      const res = await axios.put(
        `http://localhost:8000/api/posts/comment/${id}`,
        {
          comment
        }
      );



      setPosts(
        posts.map(item=>
          item._id===id
          ? res.data
          : item
        )
      );



    }catch(error){

      console.log(error);

    }


  };







  // Edit
  const handleEdit = async(id,newContent)=>{


    try{


      const res = await axios.put(
        `http://localhost:8000/api/posts/${id}`,
        {
          content:newContent
        }
      );



      setPosts(
        posts.map(item=>
          item._id===id
          ? res.data
          : item
        )
      );



    }catch(error){

      console.log(error);

    }


  };







  return (

    <div>


      <nav className="bg-blue-600 text-white p-4 flex justify-between">


        <h1 className="text-2xl font-bold">
          CodeAlpha Social
        </h1>



        <div>


          <button
          onClick={()=>navigate("/profile")}
          className="bg-white text-blue-600 px-4 py-2 rounded mr-3"
          >
            Profile
          </button>




          <button
          onClick={()=>{
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>


        </div>


      </nav>





      <div className="max-w-2xl mx-auto mt-8">



        <div className="bg-white p-5 shadow rounded-xl">


          <textarea

          value={post}

          onChange={(e)=>setPost(e.target.value)}

          placeholder="What's on your mind?"

          className="w-full border p-3 rounded"

          />





          <input

          type="file"

          accept="image/*"

          onChange={(e)=>{

            const file=e.target.files[0];

            setImage(file);


            if(file){

              setPreview(
                URL.createObjectURL(file)
              );

            }

          }}

          className="mt-3"

          />





          {
          preview &&

          <img

          src={preview}

          className="w-48 h-48 mt-4 object-cover rounded"

          />

          }






          <button

          onClick={handlePost}

          className="bg-blue-600 text-white px-5 py-2 rounded mt-4"

          >

            Post

          </button>



        </div>






        {
posts.length === 0 ? (

<div className="bg-white p-5 rounded-xl shadow mt-5 text-center">

No Posts Yet 🚀

</div>

) : (

posts.map(item=>(

<PostCard

key={item._id}

item={item}

handleLike={handleLike}

handleDelete={handleDelete}

handleComment={handleComment}

handleEdit={handleEdit}

/>

))

)
}


      </div>


    </div>

  );
  

}


export default Home;
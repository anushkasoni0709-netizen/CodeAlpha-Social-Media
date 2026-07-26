import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);
    fetchPosts(currentUser._id);
  }, []);

  const fetchPosts = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/posts/user/${id}`
      );

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-blue-600 px-4 py-2 rounded"
        >
          Home
        </button>
      </nav>

      <div className="max-w-2xl mx-auto mt-8">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold">
            {user?.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {user?.email}
          </p>

          <p className="mt-4 font-semibold">
            Total Posts: {posts.length}
          </p>

        </div>

        <div className="mt-6">

          {posts.length === 0 ? (

            <div className="bg-white p-5 rounded-xl shadow text-center">
              No Posts Yet 🚀
            </div>

          ) : (

            posts.map((item) => (

              <div
                key={item._id}
                className="bg-white p-5 rounded-xl shadow mt-5"
              >

                <h2 className="font-bold">
                  {item.author}
                </h2>

                <p className="mt-2">
                  {item.content}
                </p>

                {item.image && (
                  <img
                    src={item.image}
                    alt="post"
                    className="mt-4 rounded-lg"
                  />
                )}

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;
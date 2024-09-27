import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const BlogDetailPage = () => {
  const [blog, setBlog] = useState({ comments: [] }); // Initialize blog with an empty comments array
  const [recentBlog, setRecentBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/blogs/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.put(`http://localhost:5000/blogs/${id}`, {
        views: blog.views + 1,
      });
    };
    if (blog.views) {
      // Ensure blog data is loaded before trying to update views
      fetchData();
    }
  }, [id, blog.views]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/blogs/recent");
      setRecentBlog(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="text-center text-gray-50 bg-[image:url(/imgs/about03.png)] bg-cover bg-[#000000cd] bg-blend-darken bg-center py-28">
        <h1 className="font-nunito sm:text-5xl text-3xl font-bold mb-3">
          {blog.title}
        </h1>
        <p className="text-xs font-semibold mb-1">
          Posted on: {blog.createdAt}
        </p>
        <p className="text-xs uppercase">
          <span className="text-[#DB7607] mr-1">Home</span>/{" "}
          <span className="text-[#DB7607] mr-1">Home</span> / {blog.title}
        </p>
      </div>
      <div className="mt-10 lg:px-36 md:px-16 px-7 flex gap-5 lg:flex-row flex-col">
        {loading ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : (
          <div>
            <div className="p-8 bg-white shadow-lg rounded-md">
              <h1 className="font-nunito sm:text-5xl text-3xl font-bold text-gray-950">
                {blog.title}
              </h1>
              <p className="text-sm text-gray-500 my-2">
                Posted on {blog.createdAt}
              </p>
              <div>
                <img src={blog.image} alt="" />
              </div>
              <div>
                <div
                  className="text-gray-800 text-sm mt-4"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-5">
                Comments
              </h3>
              <div>
                <div>
                  {blog.comments.length > 0 ? (
                    blog.comments.map((item, index) => {
                      return (
                        <div className="mb-2 shadow-md p-2" key={index}>
                          <p className="text-sm font-bold text-gray-700">
                            {item.username}
                          </p>
                          <p className="text-sm text-gray-500 py-1">
                            {item.text}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.createdAt}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p>No comments available.</p>
                  )}
                </div>
                <form className="mt-5">
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">
                      Your Name
                    </p>
                    <input
                      type="text"
                      className="w-full border rounded-sm py-1 px-2"
                    />
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">
                      Your Comment
                    </p>
                    <textarea
                      name=""
                      id=""
                      className="w-full border rounded-sm py-1 px-2"
                      rows={5}
                    ></textarea>
                  </div>
                  <button className="bg-[#ffa216] px-6 py-2 uppercase text-sm text-gray-50 rounded">
                    Submit Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* recent posts */}
        <div>
          <div className="lg:w-[300px] md:w-[600px] w-full bg-white shadow sticky top-20 rounded-md overflow-hidden">
            <p className="text-gray-900 bg-gray-50 font-semibold text-xl px-1 py-2 border-b mb-8">
              Recent Posts
            </p>

            <div className="px-3 pb-4">
              {loading ? (
                <div className="w-full">
                  <Loading />
                </div>
              ) : (
                recentBlog.map((item) => {
                  return (
                    <Link
                      to={`/blog/${item._id}`}
                      className="flex py-2 gap-2 items-center border-b mb-5"
                      key={item._id}
                    >
                      <div>
                        <img
                          src={item.image}
                          alt=""
                          className="w-[80px] rounded-md"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.title}</p>
                      </div>
                    </Link>
                  );
                })
              )}
              <div>
                <div className="relative rounded-xl overflow-hidden">
                  <div className="h-[200px] ">
                    <img src="/imgs/about03.png" alt="" className="w-full" />
                  </div>
                  <div className="w-full bg-[#00000067] absolute top-0 h-full flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold font-nunito text-center text-gray-100">
                      Explore Our Menu
                    </p>
                    <a
                      href="/menu"
                      className="bg-[#ffa216] px-3 py-1 uppercase text-sm text-gray-50 rounded-sm"
                    >
                      MENU
                    </a>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden mt-4">
                  <div className="h-[200px] ">
                    <img
                      src="/imgs/abouthero.jpg"
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="w-full bg-[#00000067] absolute top-0 h-full flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold font-nunito text-center text-gray-100">
                      Learn More About Us
                    </p>
                    <a
                      href="/menu"
                      className="bg-[#ffa216] px-3 py-1 uppercase text-sm text-gray-50 rounded-sm"
                    >
                      About Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;

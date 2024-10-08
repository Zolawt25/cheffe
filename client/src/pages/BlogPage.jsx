import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
// import { blogs } from "../assets/blogs";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://cheffe-server.vercel.app/blogs");
        setBlogs(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="py-28 bg-[#070b22] text-center text-gray-50">
        <h1 className="font-nunito text-5xl font-bold mb-3">Our Blog</h1>
        <p className="text-xs uppercase">
          <span className="text-[#DB7607] mr-1">Home</span>/ Blog
        </p>
      </div>
      {loading ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:px-20 px-10 gap-5 mt-10">
          {blogs.map((item, index) => {
            let date = new Date(item.createdAt).toString().slice(0, 16);
            return (
              <div key={index} className="bg-white shadow">
                <div>
                  <img src={item.image} alt="" />
                </div>
                <div className="py-2 px-3">
                  <p className="font-semibold text-lg text-[#070b22]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Posted on: {date}
                  </p>
                  <p className="mt-1 mb-3 text-sm text-gray-600">
                    {item.likes} Likes
                  </p>

                  <a
                    href={`/blog/${item._id}`}
                    className="bg-[#ffa216] px-3 py-1 uppercase text-sm text-gray-50"
                  >
                    read more
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogPage;

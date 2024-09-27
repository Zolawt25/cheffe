import React, { useEffect, useState } from "react";
// import { blogs } from "../assets/blogs";
import axios from "axios";
// import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setdeleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/blogs");
      setBlogs(res.data);
      setLoading(false);
    };
    fetchData();
  }, [deleted]);

  const deleteBlog = async (id) => {
    setBtnLoading(true);
    const res = await axios.delete(`http://localhost:5000/blogs/${id}`);
    setdeleted(!deleted);
    setBtnLoading(false);
    return res;
  };

  return (
    <div className="h-screen">
      <div className="pt-36 lg:px-32 md:px-20 px-8">
        <h1 className="text-center uppercase text-3xl font-bold text-[#070b22] mb-4">
          Admin dashboard
        </h1>
        <div className="bg-white shadow-md">
          <p className="capitalize bg-[#070b22] py-1 px-3 text-gray-100 text-sm">
            manage blog posts
          </p>
          <div className="px-3 py-3 ">
            <a
              href="/add-blog"
              className="bg-[#ffa216] px-3 py-1 uppercase text-sm text-gray-50"
            >
              create new blog post
            </a>
            <div className="overflow-x-scroll">
              <table className="*:bg-[#f8f9fa] w-full mt-4 *:text-sm text-gray-600 min-w-[650px]">
                <thead className="border-b *:py-1">
                  {/* <tr> */}
                  <th>Image</th>
                  <th>Title</th>
                  <th>Posted Date</th>
                  <th>Views</th>

                  <th>Actions</th>
                  {/* </tr> */}
                </thead>
                <tbody>
                  {loading ? (
                    <div className="w-full text-center">Loading...</div>
                  ) : (
                    blogs.map((item, index) => {
                      return (
                        <tr key={index} className="text-center">
                          <td className="flex justify-center">
                            <img
                              src={item.image}
                              alt=""
                              className="w-[80px] my-1 rounded"
                            />
                          </td>
                          <td>{item.title}</td>
                          <td>{item.createdAt}</td>
                          <td>{item.views}</td>
                          <td>
                            <a
                              href={`/edit-blog/${item._id}`}
                              className="bg-[#ffa216] px-6 py-1 uppercase text-sm text-gray-50 rounded mr-2"
                            >
                              edit
                            </a>
                            <button
                              className="bg-red-600 px-6 py-1 uppercase text-sm text-gray-50 rounded"
                              onClick={() =>
                                !btnLoading && deleteBlog(item._id)
                              }
                            >
                              {btnLoading ? "deleting..." : "delete"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

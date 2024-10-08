import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the editor
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditBlogPage = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(blog);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://cheffe-server.vercel.app/blogs/${id}`
      );
      setBlog(res.data);
      setContent(res.data.content);
    };
    fetchData();
  }, [id]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = {
    toolbar: toolbarOptions, // Pass the custom toolbar options here
  };

  const handleContentChange = (value) => {
    setContent(value); // Update content state
  };

  const editBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`https://cheffe-server.vercel.app/blogs/${id}`, {
        image: image ? image : blog.image,
        title: title ? title : blog.title,
        content: content ? content : blog.content,
      });
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      alert("sorry something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center pt-20 pb-5">
      <div className="lg:w-[60%] md:w-[80%] w-full mx-8 bg-white py-10 rounded shadow-md">
        <p className="text-center text-xl font-semibold text-gray-900 mb-2">
          Edit Blog Post
        </p>
        <form className="px-10" onSubmit={(e) => !loading && editBlog(e)}>
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-2 font-semibold">Title:</p>
            <input
              type="text"
              className="w-full border rounded py-2 px-2 text-xs"
              required
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={blog.title}
            />
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-2 font-semibold">
              Upload Blog Image:
            </p>
            {/* <input
              type="file"
              accept="image/*"
              className="w-full border rounded py-2 px-2 text-xs"
            /> */}
            <input
              type="text"
              className="w-full border rounded py-2 px-2 text-xs"
              required
              onChange={(e) => setImage(e.target.value)}
              defaultValue={blog.image}
            />
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-2 font-semibold">Content:</p>
            {/* <textarea
              name=""
              id=""
              className="w-full border rounded py-1 px-2"
              rows={10}
            ></textarea> */}
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={modules} // Add modules to Quill
              theme="snow" // Ensure snow theme is applied
            />
          </div>

          <button className="bg-[#ffa216] px-6 py-2 uppercase text-sm text-gray-50 rounded">
            {loading ? "editing..." : "edit blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;

import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the editor
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/blogs", {
        image,
        title,
        content,
      });
      setLoading(false);
      navigate("/dashboard");
      window.location.reload();
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
          Add Blog Post
        </p>
        <form className="px-10" onSubmit={(e) => !loading && addBlog(e)}>
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-2 font-semibold">Title:</p>
            <input
              type="text"
              className="w-full border rounded py-2 px-2 text-xs"
              required
              onChange={(e) => setTitle(e.target.value)}
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
            {loading ? "posting..." : "post blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;

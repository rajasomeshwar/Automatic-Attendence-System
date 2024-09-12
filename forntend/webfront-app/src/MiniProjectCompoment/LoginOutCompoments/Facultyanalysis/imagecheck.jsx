import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "./media/nodp.jpg";
import "./style.css";
export const displayImages = (base64Images) => {
  console.log("here ");
  return base64Images.map((base64String, index) => (
    <img
      key={index}
      src={`data:image/jpeg;base64,${base64String}`}
      alt={`Student Picture ${index}`}
    />
  ));
};

export const StudentPictures = ({ studentId }) => {
  const [images, setImages] = useState([]);
  studentId = 4;
  console.log("her " + studentId);
  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/students/${studentId}/pictures`
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };

    fetchPictures();
  }, [studentId]);

  return (
    <div>
      {images.length === 0 ? (
        <p>No pictures available.</p>
      ) : (
        images.map((base64String, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${base64String}`}
            alt={`Student Picture ${index}`}
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
        ))
      )}
    </div>
  );
};

export const StudentPicturesx = ({ studentId }) => {
  const [images, setImages] = useState([]);
  studentId = 4;
  useEffect(() => {
    const fetchPictures = async () => {
      // try {
      //   const response = await axios.get(
      //     `http://localhost:8082/students/${studentId}/pictures`
      //   );
      //   setImages(response.data); // response.data should now be an array of images
      // } catch (error) {
      //   console.error("Error fetching pictures:", error);
      // }
    };

    fetchPictures();
  }, [studentId]);
  console.log(images);
  return (
    <div className="DisplayAlldetails">
      <img src={image} alt="description" />
    </div>
  );
};

const StudentPictures1 = ({ studentId }) => {
  const [images, setImages] = useState([]);
  studentId = 4;
  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/students/${studentId}/pictures`
        );
        setImages(response.data.photoUrl); // response.data should now be an array of images
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };

    fetchPictures();
  }, [studentId]);
  console.log(images);
  return (
    <div>
      {images.length === 0 ? (
        <p>No pictures available.</p>
      ) : (
        images.map((image, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${image}`}
            alt={`Student Picture ${index}`}
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
        ))
      )}
    </div>
  );
};

export default StudentPictures1;

"use client";

import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import ImageUpload from "../components/ImageUpload";

const UserPostPage = () => {

  const [selectedFile, setSelectedFile] = React.useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Add your logic here to handle the file upload
    console.log("Selected file:", selectedFile);
  };


  return (
    <div className="mx-auto max-w-screen-md py-12">
      <Card className="mb-12 overflow-hidden flex justify-center items-center">
        <Typography variant="h2" color="blue-gray" className="mb-2">
          File Upload!
        </Typography>

        <form className="mt-8 mb-5 w-80 max-w-screen-lg sm:w-96 " onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Title" />
            {/*  <Input size="lg" type="file" onChange={handleFileChange} /> */}
            <ImageUpload
              value={selectedFile ? [selectedFile] : []}
  
              onChange={(url) => setSelectedFile(url)}
              onRemove={() => setSelectedFile('')}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg "
          >
            Upload
          </Button>
        </form>


      </Card>



    </div>
  );
};

export default UserPostPage;
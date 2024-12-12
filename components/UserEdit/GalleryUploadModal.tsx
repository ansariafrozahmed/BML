import React, { useState } from "react";
import {
  Modal,
  Upload,
  Button,
  Input,
  Select,
  Form,
  Row,
  Col,
  Tabs,
  Space,
  Divider,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { showMessage } from "@/lib/reuse";
import { setGalleryData } from "@/store/gallerySlice";
import { useDispatch } from "react-redux";
import { Trash2Icon } from "lucide-react";
import { TextField } from "@shopify/polaris";

interface GalleryUploadModalProps {
  active: boolean;
  handleChange: () => void;
  token: string;
}

const { TabPane } = Tabs;

const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({
  active,
  handleChange,
  token,
}) => {
  const [imageFileList, setImageFileList] = useState<any[]>([]);
  const [videoEntries, setVideoEntries] = useState<any[]>([]); // Store video entries (title, URL)
  const [selectedYear, setSelectedYear] = useState<string | any>(
    new Date().getFullYear()
  );
  const [imageTitles, setImageTitles] = useState<any[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const fetchGalleryData = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/getGalleryByUsername?username=${params?.username?.[0]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gallery data.");
      }

      const result: any = await response.json();
      dispatch(setGalleryData(result));
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Image Upload Changes
  const handleImageUploadChange = (info: any) => {
    const updatedFileList = info.fileList.slice(0, 5);
    setImageFileList(updatedFileList);
  };

  // Handle Year Change
  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  // Update image titles
  const handleImageTitleChange = (index: number, value: string) => {
    const updatedTitles = [...imageTitles];
    updatedTitles[index] = value;
    setImageTitles(updatedTitles);
  };

  // Add a new video entry (title, URL)
  const addVideoEntry = () => {
    setVideoEntries([...videoEntries, { title: "", url: "" }]);
  };

  const removeVideoEntry = (index: any) => {
    setVideoEntries(videoEntries.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    setLoading(true);

    // Append year
    formData.append("year", selectedYear);

    // Prepare image titles, using file names as fallback
    const preparedImageTitles = imageFileList.map((file, index) => {
      const title = imageTitles[index];
      return title && title.trim() ? title : file.originFileObj.name;
    });

    // Append each file in the imageFileList
    imageFileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    // Append the prepared image titles (convert to JSON string)
    formData.append("image_titles", JSON.stringify(preparedImageTitles));

    // Append videos (if any)
    if (videoEntries.length > 0) {
      formData.append("videos", JSON.stringify(videoEntries));
    }

    try {
      const response = await axios.post(
        `${process.env.BACKEND}/api/uploadGallery`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data); // Handle success response
      handleChange();
      router.refresh();
      showMessage("Files Uploaded Successfully", "success");
      fetchGalleryData();
    } catch (error: any) {
      console.error("Error uploading files and videos:", error);

      // Check if the error response contains a message
      const errorMessage =
        error.response?.data?.error || "Error Uploading Files and Videos"; // Fallback to a generic message

      showMessage(errorMessage, "error"); // Show the error message
    } finally {
      setLoading(false);
    }
  };

  // Check if a URL is a valid YouTube embed link
  const isValidEmbedUrl = (url: string): boolean => {
    const embedUrlRegex =
      /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/;
    return embedUrlRegex.test(url);
  };

  // Convert regular YouTube URLs to embed format
  const convertToEmbedUrl = (url: string): string | null => {
    const watchRegex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const shortRegex = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;

    const match = url.match(watchRegex) || url.match(shortRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  // Handle video URL change
  const handleVideoUrlChange = (index: number, url: string) => {
    const updatedEntries = [...videoEntries];
    const embedUrl = convertToEmbedUrl(url) || url; // Try to convert to embed URL if possible

    // Update only if it's valid or allow user to edit
    updatedEntries[index].url = embedUrl;
    setVideoEntries(updatedEntries);
  };

  return (
    <Modal
      open={active}
      onCancel={handleChange}
      footer={null}
      closable={false}
      centered
      maskStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Upload Your Gallery Memory</h2>
        <p className="text-sm text-gray-600 mb-6">
          Share your favorite moments with Ganpati Bappa by uploading images or
          videos here.
        </p>

        {/* Tabs for Image and Video */}
        <Tabs defaultActiveKey="1">
          <TabPane tab="Images" key="1">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Select Year">
                    <Select
                      value={selectedYear}
                      onChange={handleYearChange}
                      placeholder="Select Year"
                    >
                      {Array.from(
                        { length: new Date().getFullYear() - 2022 + 1 },
                        (_, index) => 2022 + index
                      ).map((year) => (
                        <Select.Option key={year} value={year.toString()}>
                          गणेशोत्सव {year}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div className="mb-4">
              <Upload
                multiple
                fileList={imageFileList}
                onChange={handleImageUploadChange}
                beforeUpload={() => false} // Prevent auto upload
                listType="picture" // Show preview as a grid
                accept="image/*"
              >
                {imageFileList.length < 5 && (
                  <div className="flex items-center gap-2 bg-gray-50 border-dashed p-2 cursor-pointer">
                    <UploadOutlined />
                    <div>Select Images</div>
                  </div>
                )}
              </Upload>
            </div>

            {imageFileList.length > 0 && (
              <>
                <Divider />
                <div>
                  <h2 className="mb-4 text-xl font-semibold"> Add Title</h2>
                  <div className="space-y-3">
                    {imageFileList.map((file, index) => (
                      <div key={file.uid}>
                        {" "}
                        {/* span={24} to ensure one image per row */}
                        <div className="text-center flex gap-2">
                          <Image
                            width={100}
                            height={100}
                            src={URL.createObjectURL(file.originFileObj)}
                            alt="uploaded"
                            style={{ width: "20%", height: "20%" }}
                          />
                          <Form.Item className="mt-2 w-full">
                            <Input
                              value={imageTitles[index] || ""}
                              onChange={(e) =>
                                handleImageTitleChange(index, e.target.value)
                              }
                              placeholder="Enter a title"
                              className="h-12 w-full"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabPane>

          <TabPane tab="Videos" key="2">
            {/* Video Entry Input Fields */}
            <div>
              <Form.Item label="Select Year">
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  placeholder="Select Year"
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 2022 + 1 },
                    (_, index) => 2022 + index
                  ).map((year) => (
                    <Select.Option key={year} value={year.toString()}>
                      {year}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="space-y-2">
                {videoEntries.map((video, index) => (
                  <div className="flex w-full justify-between items-center">
                    <TextField
                      label="Video URL"
                      autoComplete=""
                      value={video.url}
                      onChange={(value) => handleVideoUrlChange(index, value)}
                      placeholder="Enter video embed URL"
                      error={
                        !!video.url && !isValidEmbedUrl(video.url)
                          ? "Enter a valid YouTube embed URL"
                          : ""
                      } // True if there's an invalid URL
                    />

                    <Trash2Icon
                      size={18}
                      color="red"
                      onClick={() => removeVideoEntry(index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Space className="py-5">
              <Button
                onClick={addVideoEntry}
                type="dashed"
                icon={<UploadOutlined />}
              >
                Add Video
              </Button>
            </Space>
          </TabPane>
        </Tabs>

        <div className="flex justify-end border-t pt-5 gap-4">
          <button
            onClick={handleChange}
            className=" text-user_primary px-4 py-2 rounded-lg  transition-all"
          >
            Cancel
          </button>
          <Button
            loading={loading}
            className="bg-user_primary text-white px-4 py-2 rounded-lg  transition-all"
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GalleryUploadModal;

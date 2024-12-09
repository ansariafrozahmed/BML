import React, { useState } from 'react';
import { Modal, Upload, Button, Input, Select, Form, Row, Col, Tabs, Space, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import axios from 'axios';

interface GalleryUploadModalProps {
    active: boolean;
    handleChange: () => void;
    token: string;
}

const { TabPane } = Tabs;

const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({ active, handleChange, token }) => {
    const [imageFileList, setImageFileList] = useState<any[]>([]);
    const [videoEntries, setVideoEntries] = useState<any[]>([]); // Store video entries (title, URL)
    const [selectedYear, setSelectedYear] = useState<string | any>(new Date().getFullYear());
    const [imageTitles, setImageTitles] = useState<any[]>([]);

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

    // Handle video title and URL change
    const handleVideoChange = (index: number, key: string, value: string) => {
        const updatedEntries = [...videoEntries];
        updatedEntries[index][key] = value;
        setVideoEntries(updatedEntries);
    };

    // Add a new video entry (title, URL)
    const addVideoEntry = () => {
        setVideoEntries([...videoEntries, { title: '', url: '' }]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // Append year
        formData.append('year', selectedYear);

        // Append each file in the imageFileList
        imageFileList.forEach((file, index) => {
            formData.append('files', file.originFileObj);  // Append original file object
        });

        // Append image titles (convert to string for easier processing on the server)
        formData.append('image_titles', JSON.stringify(imageTitles));

        // Append videos (if any)
        if (videoEntries.length > 0) {
            formData.append('videos', JSON.stringify(videoEntries)); // Convert video entries to string and append
        }

        try {
            const response = await axios.post(`${process.env.BACKEND}/api/uploadGallery`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            });
            console.log(response.data); // Handle success response
        } catch (error) {
            console.error('Error uploading files and videos:', error); // Handle error
        }
    };

    return (
        <Modal
            open={active}
            onCancel={handleChange}
            footer={null}
            closable={false}
            centered
            maskStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div>
                <h2 className="text-lg font-bold mb-4">Upload Your Gallery Memory</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Share your favorite moments with Ganpati Bappa by uploading images or videos here.
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
                                            {Array.from({ length: new Date().getFullYear() - 2022 + 1 }, (_, index) => 2022 + index).map(year => (
                                                <Select.Option key={year} value={year.toString()}>
                                                    {year}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                </Col>
                            </Row>
                        </Form>

                        <Upload
                            multiple
                            fileList={imageFileList}
                            onChange={handleImageUploadChange}
                            beforeUpload={() => false} // Prevent auto upload
                            listType="picture" // Show preview as a grid
                            accept="image/*"
                        >
                            {imageFileList.length < 5 && (
                                <div className='flex items-center gap-2 bg-gray-50 border-dashed p-2'>
                                    <UploadOutlined />
                                    <div>Select Images</div>
                                </div>
                            )}
                        </Upload>

                        {imageFileList.length > 0 && <>
                            <Divider />
                            <div >
                                <h2 className='mb-4 text-xl font-semibold'> Add Title</h2>
                                <div className='space-y-3'>
                                    {imageFileList.map((file, index) => (
                                        <div key={file.uid} > {/* span={24} to ensure one image per row */}
                                            <div className="text-center flex gap-2">
                                                <Image
                                                    width={100} height={100}
                                                    src={URL.createObjectURL(file.originFileObj)}
                                                    alt="uploaded"
                                                    style={{ width: '20%', height: '20%' }}
                                                />
                                                <Form.Item className='mt-2 w-full'>
                                                    <Input
                                                        value={imageTitles[index] || ''}
                                                        onChange={(e) => handleImageTitleChange(index, e.target.value)}
                                                        placeholder="Enter a title"
                                                        className='h-12 w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                        }
                    </TabPane>

                    <TabPane tab="Videos" key="2">
                        {/* Video Entry Input Fields */}
                        <div>
                            {videoEntries.map((video, index) => (
                                <Row gutter={16} key={index}>
                                    <Col span={12}>
                                        <Form.Item label={`Video Title`}>
                                            <Input
                                                value={video.title}
                                                onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                                                placeholder="Enter video title"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={`Video URL`}>
                                            <Input
                                                value={video.url}
                                                onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                                                placeholder="Enter video URL"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                        <Space>
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
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default GalleryUploadModal;

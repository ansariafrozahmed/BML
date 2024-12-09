import Link from 'next/link';
import React, { useState } from 'react';
import GalleryUploadModal from './GalleryUploadModal';

const AccountandGalleryUpload = ({
    isLoggedIn,
    isEdit,
    token
}: {
    isLoggedIn: boolean;
    isEdit: boolean;
    token: string;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false); // Track dismissal of the card

    // Function to toggle the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Function to dismiss the floating card
    const handleDismiss = () => {
        setIsDismissed(true);
    };

    if (isDismissed) return null; // Do not render the card if dismissed

    return (
        <>
            {/* Main floating action button */}
            <div className="fixed bottom-4 md:right-0 z-[999] animate-bounce mx-4 bg-orange-500 text-white rounded-xl p-4 shadow-lg border border-orange-400 flex items-center gap-4 ">
                {/* Dismiss Button */}
                <button
                    onClick={handleDismiss}
                    className="absolute -top-3 right-0 text-white bg-orange-600 hover:bg-orange-700 rounded-full p-1 shadow-sm"
                >
                    ✖
                </button>

                {/* Floating Card Content */}
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold">Ganpati Bappa Morya! 🙏</h3>
                    <p className="text-sm text-white/90 mt-1">
                        {isLoggedIn
                            ? "You're all set! Share your Ganpati Bappa memories now! 🌟"
                            : "Join our community and share your Ganpati Bappa memories! 🌟"}
                    </p>
                </div>
                <div className="md:flex gap-2 md:space-y-0 space-y-2">
                    <button
                        onClick={isLoggedIn ? toggleModal : undefined}
                        className="ml-auto bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-orange-100 hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                        {isLoggedIn ? 'Upload Memory' : (
                            <Link href="/register">
                                Create Account
                            </Link>
                        )}
                    </button>
                    {!isEdit && (
                        <button
                            className="ml-auto bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-orange-100 hover:shadow-lg transition-all duration-300 ease-in-out"
                        >
                            <Link href={`${window.location.pathname}/edit`}>
                                Edit Profile
                            </Link>
                        </button>
                    )}
                </div>
            </div>

            {/* Modal for creating a post */}
            {isModalOpen && (
                <>
                    {/* You can include your modal content here */}
                    <GalleryUploadModal active={isModalOpen} handleChange={toggleModal} token={token} />
                </>
            )}
        </>
    );
};

export default AccountandGalleryUpload;

import React, { useState, useRef } from "react";
import { Input, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { updateAccountDetails } from "@/store/userProfile";

const EditAccountDetails = ({ userData }: any) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(userData); // State to hold form data
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold the timeout ID

  // Function to check if the contact details have 'Phone' and 'Whatsapp Number'
  const ensurePhoneAndWhatsapp = () => {
    // Initialize contact_details as an empty array if it's null or undefined
    let updatedContactDetails: any = formData.contact_details || [];

    // Check for 'Phone' and 'Whatsapp Number' and add them if missing
    if (
      !updatedContactDetails.some((contact: any) => contact.label === "Phone")
    ) {
      updatedContactDetails.push({ label: "Phone", value: "" });
    }
    if (
      !updatedContactDetails.some(
        (contact: any) => contact.label === "Whatsapp Number"
      )
    ) {
      updatedContactDetails.push({ label: "Whatsapp Number", value: "" });
    }

    // Return updated contact details
    return updatedContactDetails;
  };

  // Handler for form field changes
  const handleFieldChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Ensure 'Phone' and 'Whatsapp Number' are included in the contact details
  const contactFields = ensurePhoneAndWhatsapp();

  // Validate and update specific field in the contact details array based on value
  const handleContactFieldChange = (value: string, label: string) => {
    let sanitizedValue = value;

    // Allow only digits and truncate to 10 characters for "Phone" and "Whatsapp Number"
    if (label === "Phone" || label === "Whatsapp Number") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10); // Sanitize to digits only
    }

    const updatedContactDetails = (formData?.contact_details || []).map(
      (contact: any) => {
        if (contact.label === label) {
          return { ...contact, value: sanitizedValue }; // Update the value of the matching label
        }
        return contact; // Keep other contacts unchanged
      }
    );

    // console.log(updatedContactDetails, 'updatedContactDetails')
    // Update the formData state with the new contact details
    handleFieldChange("contact_details", updatedContactDetails);

    // Trigger dispatch with a delay after contact field change
    dispatchWithDelay({ ...formData, contact_details: updatedContactDetails });
  };

  // Function to dispatch updated form data with a delay
  const dispatchWithDelay = (formData: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any existing timeout
    }
    timeoutRef.current = setTimeout(() => {
      // Dispatch the update to the Redux store with the latest formData
      dispatch(
        updateAccountDetails({
          first_name: formData.first_name,
          email: formData.email,
          last_name: formData.last_name,
          bio: formData.bio,
          contact_details: formData?.contact_details || [],
        })
      );
    }, 200); // Delay of 200ms (or adjust as needed)
  };

  // Handle debounced change of form fields
  const handleDebouncedChange = (field: string, value: any) => {
    handleFieldChange(field, value);
    dispatchWithDelay({ ...formData, [field]: value }); // Trigger dispatch with a delay
  };

  return (
    <div className="mt-5 mb-44">
      <Form layout="vertical" scrollToFirstError>
        {/* First Name Field */}
        <Form.Item label="First Name">
          <Input
            value={formData.first_name}
            onChange={(e) =>
              handleDebouncedChange("first_name", e.target.value)
            }
          />
        </Form.Item>

        {/* Last Name Field */}
        <Form.Item label="Last Name">
          <Input
            value={formData.last_name}
            onChange={(e) => handleDebouncedChange("last_name", e.target.value)}
          />
        </Form.Item>

        {/* Contact Details Fields */}
        {contactFields.map((contact: any) => (
          <Form.Item label={contact.label} key={contact.label}>
            <Input
              value={contact.value}
              maxLength={10} // Set max length to 10 characters
              onChange={(e) =>
                handleContactFieldChange(e.target.value, contact.label)
              }
            />
          </Form.Item>
        ))}

        {/* Bio Field */}
        <Form.Item label="Bio">
          <Input.TextArea
            value={formData.bio}
            onChange={(e) => handleDebouncedChange("bio", e.target.value)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAccountDetails;

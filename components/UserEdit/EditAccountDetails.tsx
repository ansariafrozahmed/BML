import React, { useState, useRef, Suspense } from "react";
import { TextField } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { updateAccountDetails } from "@/store/userProfile";
import RichTextEditor from "./RichTextEditor";

const EditAccountDetails = ({ userData }: any) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(userData); // State to hold form data
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold the timeout ID

  // Function to check if the contact details have 'Phone' and 'Whatsapp Number'
  const ensurePhoneAndWhatsapp = () => {
    let updatedContactDetails: any = formData.contact_details || [];

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

    return updatedContactDetails;
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const contactFields = ensurePhoneAndWhatsapp();

  const handleContactFieldChange = (value: string, label: string) => {
    let sanitizedValue = value;

    if (label === "Phone" || label === "Whatsapp Number") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10); // Allow digits only, truncate to 10 characters
    }

    const updatedContactDetails = (formData?.contact_details || []).map(
      (contact: any) => {
        if (contact.label === label) {
          return { ...contact, value: sanitizedValue };
        }
        return contact;
      }
    );

    handleFieldChange("contact_details", updatedContactDetails);
    dispatchWithDelay({ ...formData, contact_details: updatedContactDetails });
  };

  const dispatchWithDelay = (formData: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      dispatch(
        updateAccountDetails({
          first_name: formData.first_name,
          email: formData.email,
          last_name: formData.last_name,
          bio: formData.bio,
          contact_details: formData?.contact_details || [],
        } as any)
      );
    }, 200);
  };

  const handleDebouncedChange = (field: string, value: any) => {
    handleFieldChange(field, value);
    dispatchWithDelay({ ...formData, [field]: value });
  };

  return (
    <div className="mt-5 mb-44">
      <div className="space-y-3">
        {/* First Name Field */}
        <TextField
          autoComplete=""
          label="First Name"
          value={formData.first_name}
          onChange={(value) => handleDebouncedChange("first_name", value)}
        />

        {/* Last Name Field */}
        <TextField
          autoComplete=""
          label="Last Name"
          value={formData.last_name}
          onChange={(value) => handleDebouncedChange("last_name", value)}
        />

        {/* Contact Details Fields */}
        {contactFields.map((contact: any) => (
          <TextField
            autoComplete=""
            key={contact.label}
            label={contact.label}
            value={contact.value}
            maxLength={10}
            onChange={(value) => handleContactFieldChange(value, contact.label)}
          />
        ))}

        {/* Bio Field */}
        {/* <TextField
          autoComplete=""
          label="Bio"
          multiline
          value={formData.bio}
          onChange={(value) => handleDebouncedChange("bio", value)}
        /> */}
        <Suspense fallback="laoding">
          <RichTextEditor bio={formData.bio} handleDebouncedChange={handleDebouncedChange}/>
        </Suspense>
      </div>
    </div>
  );
};

export default EditAccountDetails;

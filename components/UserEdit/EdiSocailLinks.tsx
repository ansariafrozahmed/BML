import { updateSocialLink } from "@/store/userProfile";
import { Form, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const { Text } = Typography;

const EditSocialLinks = ({ social_links }: any) => {
  const dispatch = useDispatch();

  const [links, setLinks] = useState([
    {
      key: "facebook",
      label: "Facebook",
      placeholder: "Enter your Facebook profile URL",
      url: "",
      error: "",
    },
    {
      key: "instagram",
      label: "Instagram",
      placeholder: "Enter your Instagram profile URL",
      url: "",
      error: "",
    },
    {
      key: "twitter",
      label: "Twitter",
      placeholder: "Enter your Twitter profile URL",
      url: "",
      error: "",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      placeholder: "Enter your LinkedIn profile URL",
      url: "",
      error: "",
    },
    {
      key: "youtube",
      label: "Youtube",
      placeholder: "Enter your YouTube channel URL",
      url: "",
      error: "",
    },
  ]);

  // Prepopulate URLs from the incoming data
  useEffect(() => {
    if (social_links && Array.isArray(social_links)) {
      setLinks((prevLinks) =>
        prevLinks.map((link) => {
          const existing = social_links.find((s) => s.key === link.key);
          return {
            ...link,
            url: existing ? existing.url : "",
          };
        })
      );
    }
  }, [social_links]);

  // URL validation regex
  const validateURL = (url: string) => {
    const pattern = new RegExp(
      "^(https?://)?(www.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]+)+(:\\d+)?(/.*)?$"
    );
    return pattern.test(url);
  };

  // Handle input change with validation and dispatch
  const handleInputChange = (key: string, value: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        if (link.key === key) {
          const isValid = validateURL(value);
          const updatedLink = {
            ...link,
            url: value,
            error: isValid || value === "" ? "" : "Invalid URL format",
          };

          // Update the specific link's state
          const updatedLinks = prevLinks.map((link) =>
            link.key === key ? updatedLink : link
          );

          // Only dispatch valid URLs or non-empty values
          if (isValid || value === "") {
            // Create a new links object with the updated values
            const updatedSocialLinks = updatedLinks.map((link) => ({
              key: link.key,
              url: link.url, // Keep the updated URL or fallback to previous ones
            }));
            console.log(updatedSocialLinks, 'updatedSocialLinks')

            // Dispatch the complete social links state (all fields)
            dispatch(updateSocialLink({ updatedSocialLinks }));
          }

          return updatedLink;
        }
        return link;
      })
    );
  };

  return (
    <div className="space-y-4 mt-5">
      <Form layout="vertical">
        {links.map((link) => (
          <Form.Item
            key={link.key}
            label={link.label}
            required
            tooltip={`Enter your ${link.label} link`}
          >
            <Input
              value={link.url}
              placeholder={link.placeholder}
              onChange={(e) => handleInputChange(link.key, e.target.value)}
            />
            {link.error && (
              <Text type="danger" className="block mt-1">
                {link.error}
              </Text>
            )}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};

export default EditSocialLinks;

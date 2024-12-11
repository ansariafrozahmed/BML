import React, { useState } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { Text } from "@shopify/polaris";

const RichTextEditor = ({ handleDebouncedChange, bio }: any) => {
  const [text, setText] = useState(bio || "");

  return (
    <div className="space-y-2">
      <Text variant="bodySm" as="h3">
        Bio
      </Text>
      <FroalaEditorComponent
        tag="textarea"
        model={text}
        config={{
          heightMin: 200, // Minimum height of the editor
          heightMax: 400, // Maximum height of the editor
          placeholderText: "Write your bio here...",
          toolbarButtons: [
            "bold",
            "italic",
            "underline",
            "strikeThrough",
            "ol", // Ordered List
            "formatUL", // Unordered List
            "outdent",
            "indent",
            "quote",
            "undo",
            "redo",
          ],
        }}
        onModelChange={(value: any) => {
          setText(value);
          handleDebouncedChange("bio", value);
        }}
      />
    </div>
  );
};

export default RichTextEditor;

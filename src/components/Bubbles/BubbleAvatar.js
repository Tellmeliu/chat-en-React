import { Avatar } from "@material-ui/core";
import React from "react";

const BubbleAvatar = ({ src, ...rest }) => {
  return <Avatar {...rest} src={src} style={{ width: 28, height: 28 }} />;
};

export default BubbleAvatar;
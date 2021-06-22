import { Box, Typography, Grow } from "@material-ui/core";
import React from "react";
import BubbleAvatar from "./BubbleAvatar";
import amongus2 from "./amongus2.png";

const MsgBox = ({ children, sticker, ...rest }) => (
  <Box
    {...rest}
    boxShadow={sticker ? 0 : 3}
    py={1}
    px={2}
    borderRadius={10}
    bgcolor={sticker ? "transparent" : "background.paper"}
  >
    {children}
  </Box>
);

const LeftBubble = ({ children, timestamp, sticker }) => {
  return (
    <Grow in={true} timeout={233} unmountOnExit mountOnEnter>
      <Box>
        <Box display="flex" mt={1}>
          <BubbleAvatar src={amongus2} />
          <MsgBox sticker={sticker} bgcolor="background.paper" ml={1}>
            {children}
          </MsgBox>
        </Box>
        <Box ml={5}>
          <Typography variant="caption" color="textSecondary">
            {timestamp && timestamp}
          </Typography>
        </Box>
      </Box>
    </Grow>
  );
};

export default LeftBubble;

import { Grow } from "@material-ui/core";
import { Box, Typography } from "@material-ui/core";
import React from "react";
import BubbleAvatar from "./BubbleAvatar";
import deidara from "./deidara.png";

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
const RightBubble = ({ children, timestamp, sticker }) => {
  return (
    <Grow in={true} timeout={233} mountOnEnter unmountOnExit>
      <Box>
        <Box display="flex" width={1} mt={1} justifyContent="flex-end">
          <MsgBox mr={1} sticker={sticker}>
            {children}
          </MsgBox>
          <BubbleAvatar src={deidara} />
        </Box>
        <Box width={1} display="flex">
          <Box flexGrow={1} />
          <Box mr={5}>
            <Typography variant="caption" color="textSecondary">
              {timestamp && timestamp}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};
export default RightBubble;

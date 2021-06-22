import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import { RedoRounded } from "@material-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useObservable } from "rxjs-hooks";
import LeftBubble from "./components/Bubbles/LeftBubble";
import RightBubble from "./components/Bubbles/RightBubble";
import MultipleChoiceButtons from "./components/MultipleChoiceButtons";
import RealisticConfetti from "./components/RealisticConfetti";
import {
  addLeftBubble,
  addRightBubble,
  bubbles$,
  cheer,
  popBubble,
  resetBubbles
} from "./services/bubbles/bubbles";
import { bubbleEvent, bubblePosition } from "./services/bubbles/types";
import { questions } from "./services/exam/questions.json";
import { theme } from "./theme";
export default function App() {
  const bottomDiv = useRef(null);
  const bubbles = useObservable(() => bubbles$, []);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    return bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  }, [bubbles]);
  const handleRestart = () => {
    setStarted(false);
    resetBubbles();
  };

  const handleEvaluate = useCallback((choice, isCorrect) => {
    popBubble();
    addRightBubble(<Typography>{choice}</Typography>);
    if (isCorrect) {
      cheer();
      addLeftBubble(<Typography>That's Correct!</Typography>);
    } else {
      addLeftBubble(<Typography>Sorry! That's incorrect!</Typography>);
    }
  }, []);
  const handleFinishExam = () => {
    addLeftBubble(<Typography>Good Work! We've finished for now.</Typography>);
  };
  const handleAskQuestion = useCallback(
    (idx) => {
      addLeftBubble(<Typography>Ok, Question: {idx + 1}</Typography>);
      addLeftBubble(<Typography>{questions[idx].text}</Typography>);
      addRightBubble(
        <MultipleChoiceButtons
          correct={questions[idx].correct}
          incorrect={questions[idx].incorrect}
          cb={(choice, isCorrect) => {
            handleEvaluate(choice, isCorrect);
            if (idx + 1 === questions.length) {
              handleFinishExam();
            } else {
              handleAskQuestion(idx + 1);
            }
          }}
        />
      );
    },
    [handleEvaluate]
  );
  const handleStartExam = useCallback(() => {
    popBubble();
    addRightBubble(<Typography>Yes!</Typography>);
    handleAskQuestion(0);
  }, [handleAskQuestion]);

  const startExam = useCallback(() => {
    setStarted(true);
    handleStartExam();
  }, [handleStartExam]);

  useEffect(() => {
    if (!started) {
      addLeftBubble(<Typography>Greetings, challenger.</Typography>);
      addLeftBubble(<Typography>Ready to start the exam?</Typography>);
      addRightBubble(
        <Button onClick={startExam} variant="outlined" color="primary">
          Yes
        </Button>
      );
    }
  }, [started, startExam]);

  return (
    <ThemeProvider theme={theme}>
      <Dialog fullScreen open={true}>
        <Container maxWidth="sm">
          <AppBar position="sticky">
            <Toolbar>
              <Typography>Welcome</Typography>
              <Box flexGrow={1} />
              <Tooltip title="Reset Exam">
                <IconButton onClick={handleRestart}>
                  <RedoRounded />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          {bubbles.map((bubble, index) => {
            const { position, type } = bubble;
            if (position === bubblePosition.RIGHT) {
              return (
                <RightBubble
                  key={index}
                  sticker={bubble.sticker}
                  timestamp={bubble.timestamp}
                >
                  {bubble.content}
                </RightBubble>
              );
            }
            if (type === bubbleEvent.CHEER)
              return <RealisticConfetti key={index} />;
            if (position === bubblePosition.LEFT)
              return (
                <LeftBubble
                  key={index}
                  sticker={bubble.sticker}
                  timestamp={bubble.timestamp}
                >
                  {bubble.content}
                </LeftBubble>
              );
            return null;
          })}
          <div ref={bottomDiv} />
        </Container>
      </Dialog>
    </ThemeProvider>
  );
}

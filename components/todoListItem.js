import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TodoListItem = ({ title, status, category, description }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="in-progress-content"
        id="in-progress-header"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: "0.5rem", sm: "01rem" },
            width: "100%",
          }}
        >
          <Typography>
            Details for In ProgressDetail sProgressDetails
          </Typography>
          <Chip
            label="HIGH"
            color="error"
            variant="filled"
            size="small"
            sx={{
              fontSize: "0.6rem",
              height: "15px",
              minWidth: "auto",
              padding: "0 1px",
            }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            fontSize: {
              xs: "0.775rem",
              sm: "0.775rem",
              md: "0.875rem",
              lg: "0.875rem",
            },
            lineHeight: 1.5,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Here you can list tasks that are currently in progress. Here you can
          list tasks that are currently in progress. Here you can list tasks
          that are currently in progress.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Align buttons to the right
            gap: 2, // Add space between buttons
            marginTop: 2, // Add space between Typography and buttons
          }}
        >
          <Button
            color="secondary"
            sx={{
              fontSize: {
                xs: "0.775rem",
                sm: "0.775rem",
                md: "0.875rem",
                lg: "0.875rem",
              },
              lineHeight: 1.5,
            }}
          >
            to Pending
          </Button>
          <Button
            color="secondary"
            sx={{
              fontSize: {
                xs: "0.775rem",
                sm: "0.775rem",
                md: "0.875rem",
                lg: "0.875rem",
              },
              lineHeight: 1.5,
            }}
          >
            to Done
          </Button>
          <Button
            color="secondary"
            sx={{
              fontSize: {
                xs: "0.775rem",
                sm: "0.775rem",
                md: "0.875rem",
                lg: "0.875rem",
              },
              lineHeight: 1.5,
            }}
          >
            Delete
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TodoListItem;

import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Button,
  Box,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const DifficultyChip = ({ difficulty }) => {
  const colors = {
    Beginner: "success",
    Intermediate: "warning",
    Advanced: "error",
  };

  return (
    <Chip
      label={difficulty}
      color={colors[difficulty] || "default"}
      size="small"
      className="tw-capitalize"
    />
  );
};

const renderSvgIcon = (category, exerciseIcons) => {
  const iconSvg = exerciseIcons[category] || exerciseIcons["Full Body"];
  return (
    <div
      className="tw-w-8 tw-h-8"
      dangerouslySetInnerHTML={{ __html: iconSvg }}
    />
  );
};

const ExerciseDetailDialog = ({
  open,
  onClose,
  selectedExercise,
  exerciseIcons,
}) => {
  if (!selectedExercise) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box className="tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-b">
        <div className="tw-flex tw-items-center tw-gap-3">
          <div className="tw-bg-blue-50 tw-p-2 tw-rounded-lg">
            {renderSvgIcon(selectedExercise.category, exerciseIcons)}
          </div>
          <div>
            <Typography variant="h6" className="tw-font-semibold">
              {selectedExercise.name}
            </Typography>
            <DifficultyChip difficulty={selectedExercise.difficulty} />
          </div>
        </div>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <div className="tw-space-y-6">
          {/* Target Muscles */}
          <section>
            <Typography
              variant="subtitle1"
              className="tw-font-semibold tw-mb-2"
            >
              Target Muscles
            </Typography>
            <div className="tw-flex tw-flex-wrap tw-gap-2">
              {selectedExercise.mainMuscles.map((muscle, index) => (
                <Chip
                  key={index}
                  label={muscle}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section>
            <Typography
              variant="subtitle1"
              className="tw-font-semibold tw-mb-2"
            >
              Benefits
            </Typography>
            <ul className="tw-list-disc tw-list-inside tw-space-y-1">
              {selectedExercise.benefits.map((benefit, index) => (
                <li key={index} className="tw-text-gray-600">
                  {benefit}
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          <section>
            <Typography
              variant="subtitle1"
              className="tw-font-semibold tw-mb-2"
            >
              Steps
            </Typography>
            <div className="tw-space-y-4">
              {selectedExercise.steps.map((step, index) => (
                <div key={index} className="tw-flex tw-gap-4">
                  <div className="tw-bg-blue-100 tw-rounded-full tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-text-blue-600 tw-font-semibold tw-shrink-0">
                    {index + 1}
                  </div>
                  <Typography className="tw-text-gray-600">{step}</Typography>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section>
            <Typography
              variant="subtitle1"
              className="tw-font-semibold tw-mb-2"
            >
              Tips
            </Typography>
            <ul className="tw-list-disc tw-list-inside tw-space-y-1">
              {selectedExercise.tips.map((tip, index) => (
                <li key={index} className="tw-text-gray-600">
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          {/* Video Tutorial Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayCircleOutlineIcon />}
            fullWidth
            onClick={() => window.open(selectedExercise.videoUrl, "_blank")}
            className="tw-mt-4"
          >
            Watch Tutorial Video
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseDetailDialog;

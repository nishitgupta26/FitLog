import React, { useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Card,
  CardContent,
  CardActions,
  Box,
  Grid,
  Tooltip,
  Zoom,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import useExerciseGuideStore from "../stores/useExerciseGuideStore";
import { exerciseIcons } from "../dataFiles/exerciseIcons";

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

export default function ExerciseGuide() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    exercises,
    searchTerm,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
  } = useExerciseGuideStore();

  const categories = ["all", ...new Set(exercises.map((ex) => ex.category))];

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setOpenDialog(true);
  };

  const renderSvgIcon = (category) => {
    const iconSvg = exerciseIcons[category] || exerciseIcons["Full Body"];
    return (
      <div
        className="tw-w-8 tw-h-8"
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
    );
  };

  return (
    <div className="tw-min-h-screen">
      <Paper
        elevation={0}
        className="tw-max-w-full tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-4 sm:tw-py-6 lg:tw-py-8"
      >
        {/* Enhanced Header with Stats */}
        <Box className="tw-mb-8">
          <Typography
            variant="h3"
            className="tw-font-bold tw-text-gray-900 tw-mb-4"
          >
            Exercise Guide
          </Typography>

          {/* Enhanced Stats Section */}
          <Card
            className="tw-mb-6 tw-bg-gradient-to-r tw-from-blue-500 tw-to-blue-600 tw-text-white"
            sx={{
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              borderRadius: "12px",
            }}
          >
            <CardContent className="tw-flex tw-items-center tw-gap-4 tw-p-6">
              <div className="tw-bg-white tw-bg-opacity-20 tw-rounded-full tw-p-3">
                <FitnessCenterIcon sx={{ fontSize: 32, color: "white" }} />
              </div>
              <div>
                <Typography
                  variant="h6"
                  className="tw-text-blue-100 tw-font-medium"
                >
                  Available Exercises
                </Typography>
                <Typography variant="h3" className="tw-font-bold">
                  {filteredExercises.length}
                </Typography>
                {selectedCategory !== "all" && (
                  <Typography variant="subtitle2" className="tw-text-blue-100">
                    Filtered by: {selectedCategory}
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-mb-6">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="tw-text-gray-400" />
                  </InputAdornment>
                ),
              }}
              className="sm:tw-max-w-md"
            />
            <Box className="tw-flex tw-gap-2 tw-flex-wrap">
              {categories.map((category) => (
                <Tooltip
                  key={category}
                  title={`Filter by ${category}`}
                  TransitionComponent={Zoom}
                >
                  <Chip
                    label={category.charAt(0).toUpperCase() + category.slice(1)}
                    onClick={() => setSelectedCategory(category)}
                    color={
                      selectedCategory === category ? "primary" : "default"
                    }
                    className="tw-capitalize"
                    icon={
                      category !== "all" ? (
                        <div
                          className="tw-w-4 tw-h-4"
                          dangerouslySetInnerHTML={{
                            __html:
                              exerciseIcons[category] ||
                              exerciseIcons["Full Body"],
                          }}
                        />
                      ) : undefined
                    }
                  />
                </Tooltip>
              ))}
            </Box>
          </div>
        </Box>
        
        {/* Exercise Grid */}
        <Grid container spacing={3}>
          {filteredExercises.map((exercise) => (
            <Grid item xs={12} sm={6} lg={4} key={exercise.id}>
              <Card
                className="tw-h-full tw-cursor-pointer tw-transition-shadow hover:tw-shadow-lg"
                onClick={() => handleExerciseClick(exercise)}
              >
                <CardContent>
                  <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                    <div className="tw-bg-blue-50 tw-p-2 tw-rounded-lg">
                      {renderSvgIcon(exercise.category)}
                    </div>
                    <div className="tw-flex-1">
                      <Typography variant="h6" className="tw-font-semibold">
                        {exercise.name}
                      </Typography>
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <Typography variant="body2" color="textSecondary">
                          {exercise.category}
                        </Typography>
                        <DifficultyChip difficulty={exercise.difficulty} />
                      </div>
                    </div>
                  </div>
                  <div className="tw-space-y-2">
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <AccessTimeIcon className="tw-text-gray-400 tw-w-4 tw-h-4" />
                      <Typography variant="body2" color="textSecondary">
                        {exercise.estimatedTime}
                      </Typography>
                    </div>
                    <div className="tw-flex tw-flex-wrap tw-gap-1">
                      {exercise.mainMuscles.map((muscle) => (
                        <Chip
                          key={muscle}
                          label={muscle}
                          size="small"
                          className="tw-bg-gray-100"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<PlayCircleOutlineIcon />}
                    className="tw-text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(exercise.videoUrl, "_blank");
                    }}
                  >
                    Watch Tutorial
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Exercise Detail Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedExercise && (
            <>
              <Box className="tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-b">
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-bg-blue-50 tw-p-2 tw-rounded-lg">
                    {renderSvgIcon(selectedExercise.category)}
                  </div>
                  <div>
                    <Typography variant="h6" className="tw-font-semibold">
                      {selectedExercise.name}
                    </Typography>
                    <DifficultyChip difficulty={selectedExercise.difficulty} />
                  </div>
                </div>
                <IconButton onClick={() => setOpenDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <DialogContent>
                <div className="tw-space-y-6">
                  {/* Main Muscles */}
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
                          <Typography className="tw-text-gray-600">
                            {step}
                          </Typography>
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
                    onClick={() =>
                      window.open(selectedExercise.videoUrl, "_blank")
                    }
                    className="tw-mt-4"
                  >
                    Watch Tutorial Video
                  </Button>
                </div>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Paper>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TimerIcon from "@mui/icons-material/Timer";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  Select,
  MenuItem,
  FormControl,
  Paper,
  IconButton,
  Chip,
  Fade,
  Typography,
  Alert,
  CircularProgress,
  LinearProgress,
  Card,
} from "@mui/material";
import useExerciseGuideStore from "../../stores/useExerciseGuideStore";
import useGoalStore from "../../stores/useGoalStore";
import { exerciseIcons } from "../../dataFiles/exerciseIcons";
import ExerciseDetailDialog from "../ExerciseDetailDialog/ExerciseDetailDialog";

export default function ExerciseLog({ goals, mode }) {
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState(""); //taking input for reps&sets / mins / kms
  const [sets, setSets] = useState(""); //taking input for sets
  const [type, setType] = useState("reps");
  const [comments, setComments] = useState("");

  const [filteredExerciseNames, setFilteredExerciseNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // States for exercise detail dialog
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const exercises = useExerciseGuideStore((state) => state.exercises);
  const exerciseNames = useExerciseGuideStore((state) => state.exerciseNames);
  const addOrUpdateGoal = useGoalStore((state) => state.addOrUpdateGoal);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  useEffect(() => {
    if (exercise.trim() === "") {
      setFilteredExerciseNames([]);
    } else {
      let filtered = exerciseNames.filter((name) =>
        name.toLowerCase().includes(exercise.toLowerCase())
      );

      if (mode === "progress") {
        const existingGoals = goals
          .map((goal) => goal.exercise)
          .filter((name) =>
            name.toLowerCase().includes(exercise.toLowerCase())
          );
        filtered = [...new Set([...existingGoals, ...filtered])];
      }

      setFilteredExerciseNames(filtered);
    }
  }, [exercise, exerciseNames, goals, mode]);

  const handleAdd = async () => {
    if (exercise) {
      const newExercise = {
        exercise,
        value:
          type === "reps"
            ? parseInt(reps, 10) * parseInt(sets, 10)
            : parseInt(reps, 10),
        type,
        comments,
      };

      addOrUpdateGoal(newExercise, mode);

      // Reset fields
      setExercise("");
      setReps("");
      setSets("");
      setComments("");
      setType("reps");
    }
  };

  const getTypeIcon = (exerciseType) => {
    switch (exerciseType) {
      case "reps":
        return <FitnessCenterIcon className="tw-w-5 tw-h-5" />;
      case "mins":
        return <TimerIcon className="tw-w-5 tw-h-5" />;
      case "kms":
        return <DirectionsRunIcon className="tw-w-5 tw-h-5" />;
    }
  };
  const formatTimeAgo = (timestamp) => {
    const now = new Date();

    const past = new Date(timestamp);

    const diffSeconds = Math.floor((now - past) / 1000);

    if (diffSeconds < 60) return "Just now";

    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} mins ago`;

    if (diffSeconds < 86400)
      return `${Math.floor(diffSeconds / 3600)} hours ago`;

    return `${Math.floor(diffSeconds / 86400)} days ago`;
  };

  const handleSuggestionClick = (name) => {
    setExercise(name);
    setFilteredExerciseNames([]);
  };

  const handleExerciseDetailClick = (exerciseName) => {
    const exerciseDetails = exercises.find(
      (ex) => ex.name.toLowerCase() === exerciseName.toLowerCase()
    );

    if (exerciseDetails) {
      setSelectedExercise(exerciseDetails);
      setOpenDialog(true);
    }
  };

  return (
    <div className="tw-space-y-6">
      {/* Success Alert */}
      <Fade in={showSuccess}>
        <Alert
          severity="success"
          className="tw-absolute tw-top-4 tw-right-4"
          onClose={() => setShowSuccess(false)}
        >
          {mode === "progress"
            ? "Progress logged successfully!"
            : "Goal set successfully!"}
        </Alert>
      </Fade>

      {/* Input Form */}
      <Paper
        elevation={0}
        className="tw-p-6 tw-bg-white tw-rounded-xl tw-border tw-border-gray-100"
      >
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
          {/* Exercise Input */}
          <div className="tw-relative">
            <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
              <FitnessCenterIcon className="tw-text-blue-500 tw-w-4 tw-h-4" />
              <Typography variant="caption" className="tw-text-gray-600">
                Exercise Name
              </Typography>
            </div>
            <input
              type="text"
              placeholder="Search exercises..."
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-all"
            />
            {filteredExerciseNames?.length > 0 && (
              <Paper className="tw-absolute tw-w-full tw-mt-1 tw-z-50 tw-max-h-48 tw-overflow-y-auto">
                {filteredExerciseNames.map((name) => (
                  <MenuItem
                    key={name}
                    onClick={() => handleSuggestionClick(name)}
                    className="tw-text-sm hover:tw-bg-blue-50"
                  >
                    {name}
                  </MenuItem>
                ))}
              </Paper>
            )}
          </div>

          {/* Count & Type Input */}
          <div className="tw-flex tw-space-x-2">
            <FormControl className="tw-w-32">
              <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                <Typography variant="caption" className="tw-text-gray-600">
                  Type
                </Typography>
              </div>
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  // Reset fields when type changes
                  setReps("");
                  setSets("");
                }}
                className="tw-text-sm"
                sx={{
                  height: "42px",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e5e7eb",
                  },
                }}
              >
                <MenuItem value="reps" className="tw-text-sm">
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <FitnessCenterIcon className="tw-w-4 tw-h-4" />
                    <span>Reps</span>
                  </div>
                </MenuItem>
                <MenuItem value="mins" className="tw-text-sm">
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <TimerIcon className="tw-w-4 tw-h-4" />
                    <span>Minutes</span>
                  </div>
                </MenuItem>
                <MenuItem value="kms" className="tw-text-sm">
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <DirectionsRunIcon className="tw-w-4 tw-h-4" />
                    <span>Kms</span>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
            {type === "reps" ? (
              <>
                <div className="tw-flex-1">
                  <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                    <Typography variant="caption" className="tw-text-gray-600">
                      Reps
                    </Typography>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter reps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm"
                  />
                </div>
                <div className="tw-flex-1">
                  <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                    <Typography variant="caption" className="tw-text-gray-600">
                      Sets
                    </Typography>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter sets"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm"
                  />
                </div>
              </>
            ) : (
              <div className="tw-flex-1">
                <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                  <Typography variant="caption" className="tw-text-gray-600">
                    {type === "mins" ? "Minutes" : "Kilometers"}
                  </Typography>
                </div>
                <input
                  type="number"
                  placeholder={`Enter ${
                    type === "mins" ? "minutes" : "kilometers"
                  }`}
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm"
                />
              </div>
            )}
          </div>

          {/* Comments Input */}
          <div className="lg:tw-col-span-2">
            <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
              <Typography variant="caption" className="tw-text-gray-600">
                Comments (optional)
              </Typography>
            </div>
            <div className="lg:tw-col-span-2 tw-flex tw-flex-col tw-items-end sm:tw-flex-row tw-space-y-2 sm:tw-space-y-0 sm:tw-space-x-2">
              <input
                placeholder="Add notes about your exercise..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="tw-w-full tw-h-[42px] sm:tw-flex-1 tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-all"
              />
              <button
                onClick={handleAdd}
                disabled={
                  isLoading ||
                  !exercise ||
                  (type === "reps" ? !reps || !sets : !reps)
                }
                className={`tw-w-full tw-h-[42px] sm:tw-w-auto tw-px-6 tw-py-2.5 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-space-x-2 tw-transition-all ${
                  isLoading || (type === "reps" ? !reps || !sets : !reps)
                    ? "tw-bg-gray-100 tw-text-gray-400 tw-cursor-not-allowed"
                    : "tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600"
                }`}
              >
                {isLoading ? (
                  <CircularProgress size={20} className="tw-text-blue-200" />
                ) : (
                  <>
                    <AddIcon className="tw-w-5 tw-h-5" />
                    <span>{mode === "progress" ? "Log" : "Add"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Paper>

      {/* Exercise List */}
      <div className="tw-space-y-4 tw-rounded-xl tw-mx-auto">
        {goals?.length > 0 ? (
          goals.map((goal) => (
            <Fade in={true} key={goal.id}>
              <Card
                variant="outlined"
                onClick={() => handleExerciseDetailClick(goal.exercise)}
                className="tw-p-4 tw-rounded-2xl tw-transition-all tw-border-gray-200 hover:tw-shadow-md hover:tw-border-blue-200 tw-cursor-pointer"
              >
                <div className="tw-flex tw-items-center tw-space-x-4">
                  <div className="tw-bg-blue-50 tw-p-3 tw-rounded-xl tw-flex tw-items-center tw-justify-center">
                    {getTypeIcon(goal.type, "tw-w-8 tw-h-8 tw-text-blue-600")}
                  </div>

                  <div className="tw-flex-grow">
                    <div className="tw-flex tw-justify-between tw-items-start">
                      <div>
                        <Typography
                          variant="h6"
                          className="tw-font-semibold tw-text-gray-800 tw-mb-1 tw-cursor-pointer hover:tw-text-blue-600"
                          onClick={() =>
                            handleExerciseDetailClick(goal.exercise)
                          }
                        >
                          {goal.exercise}
                        </Typography>
                        <div className="tw-flex tw-items-center tw-space-x-2">
                          <Chip
                            label={`${goal.progress || 0} / ${goal.goalValue} ${
                              goal.type
                            }`}
                            size="small"
                            color="primary"
                            variant="soft"
                            className="tw-mb-1"
                          />
                          {goal.progress >= goal.goalValue && (
                            <EmojiEventsIcon className="tw-text-yellow-500" />
                          )}
                        </div>
                      </div>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteGoal(goal.id, mode);
                        }}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>

                    {goal.comments && (
                      <Typography
                        variant="body2"
                        className="tw-text-gray-600 tw-italic tw-mt-1"
                      >
                        "{goal.comments}"
                      </Typography>
                    )}

                    {goal.lastUpdated && mode === "progress" && (
                      <Typography
                        variant="caption"
                        className="tw-text-gray-400 tw-block tw-mt-1"
                      >
                        Last updated: {formatTimeAgo(goal.lastUpdated)}
                      </Typography>
                    )}
                  </div>
                </div>

                {goal.goalValue > 0 && (
                  <div className="tw-mt-4">
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                      <Typography variant="body2" className="tw-text-gray-600">
                        Progress
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`tw-font-semibold ${
                          (goal.progress || 0) >= goal.goalValue
                            ? "tw-text-green-600"
                            : "tw-text-blue-600"
                        }`}
                      >
                        {(
                          ((goal.progress || 0) / goal.goalValue) *
                          100
                        ).toFixed(1)}
                        %
                      </Typography>
                    </div>
                    <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-3 tw-overflow-hidden">
                      <div
                        className={`tw-h-full ${
                          (goal.progress || 0) >= goal.goalValue
                            ? "tw-bg-green-500"
                            : "tw-bg-blue-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            ((goal.progress || 0) / goal.goalValue) * 100,
                            100
                          )}%`,
                          transition: "width 0.5s ease-in-out",
                        }}
                      />
                    </div>
                    {(goal.progress || 0) >= goal.goalValue && (
                      <Typography
                        variant="caption"
                        className="tw-text-green-600 tw-mt-2 tw-block tw-text-center"
                      >
                        🎉 Goal Achieved! Congratulations! 🏆
                      </Typography>
                    )}
                  </div>
                )}
              </Card>
            </Fade>
          ))
        ) : (
          <div className="tw-text-center tw-py-16 tw-bg-gray-50 tw-rounded-2xl tw-border tw-border-dashed tw-border-gray-200">
            <FitnessCenterIcon className="tw-w-20 tw-h-20 tw-text-gray-300 tw-mb-6 tw-mx-auto" />
            <Typography variant="h5" className="tw-text-gray-600 tw-mb-3">
              {mode === "progress" ? "No Exercises Logged" : "No Goals Set"}
            </Typography>
            <Typography variant="body1" className="tw-text-gray-500">
              {mode === "progress"
                ? "Start tracking your workout progress by logging exercises"
                : "Begin setting your fitness goals by adding exercises"}
            </Typography>
          </div>
        )}
      </div>
      {/* Exercise Detail Dialog */}
      <ExerciseDetailDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedExercise={selectedExercise}
        exerciseIcons={exerciseIcons}
      />
    </div>
  );
}

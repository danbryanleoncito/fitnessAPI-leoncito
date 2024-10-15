const express = require("express");
const workoutController = require("../controllers/workout")
const auth = require("../auth");
const { verify } = auth

const router = express.Router();



router.post("/", verify, workoutController.addWorkout);
router.get("/getMyWorkouts", verify, workoutController.getWorkout)
router.patch("/updateWorkout/:workoutId", verify, workoutController.updateWorkout);
router.delete("/deleteWorkout/:workoutId", verify, workoutController.deleteWorkout)
router.patch("/completeWorkoutStatus/:workoutId", verify, workoutController.completeWorkout);

module.exports = router;
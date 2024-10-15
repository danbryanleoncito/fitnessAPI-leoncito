
const Workout = require("../models/Item");
const User = require("../models/User")

module.exports.addWorkout = (req, res) => {
	let newWorkout = new Workout ({
		userId:req.user.id,
		name: req.body.name,
		duration:req.body.duration
	})

	const userId = req.user && req.user.id

	if (!userId){
		return res.status(400).send({ message: 'User ID is required' });
	}

	Workout.findOne({ name: req.body.name })
	.then(existingWorkout => {
		if (existingWorkout) {
			return res.status(409).send({message: 'Workout Name Already Exists'});
		} else {
			return newWorkout.save()
			.then(result => res.status(201).send({
                success: true,
                message: 'Workout Added Successfully',
                result: result

            }))
		}
	}) 
}

module.exports.getWorkout = (req, res) => {
    return Workout.find({})
    .then(result => {
        // if the result is not null send status 30 and its result
        if(result.length > 0){
            return res.status(200).send({
            	workouts: result
            });
        }
        else{
            // 404 for not found courses
            return res.status(404).send({message: 'No Workout Found'});
        }
    })
};

module.exports.updateWorkout = (req, res) => {

    let updatedWorkout = {
  		_id:req.params.workoutId,
    	userId:req.user.id,
        name: req.body.name,
        duration: req.body.duration,
        status: req.body.status,
        
    }

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, { new: true })
    .then(workout => {
        if (workout) {
            //add status 200
            res.status(200).send({ success: true,
            					 message: 'Workout updated successfully',
            					 updatedWorkout: workout});
        } else {
            // add status 404
            res.status(404).send({ message: 'Workout not found' })
        }
    })
};

module.exports.deleteWorkout = (req, res) => {
    return Workout.findByIdAndDelete(req.params.workoutId)
    .then(workout => {
        if (workout){
            res.status(200).send({ success: true,
                                    message: "Workout deleted Successfully!"
                                    })
        } else {
            res.status(404).send({ message: "Workout not found" })
        }
    })
}

module.exports.completeWorkout = (req, res) => {

    let updatedWorkout = {
        status: req.body.status
        
    }

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, { new: true })
    .then(workout => {
        if (workout) {
            //add status 200
            res.status(200).send({ success: true,
                                 message: 'Workout status updated successfully',
                                 updatedWorkout: workout});
        } else {
            // add status 404
            res.status(404).send({ message: 'Workout not found' })
        }
    })
};
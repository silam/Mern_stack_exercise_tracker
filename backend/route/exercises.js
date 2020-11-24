const router = require('express').Router();
let Exercise = require('../models/excericise.model');

router.route('/').get((req,res)=>
{
    Exercise.find()
    .then(exercises=>res.json(exercises))
    .catch(err=>res.status(400).json("Error " + err))
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const  date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username, 
        description,
        duration,
        date
    });

    newExercise.save()
    .then(()=>res.json("Exercise added"))
    .catch(err => res.status(400).json("Error " + err));

});

router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>res.json(exercise))
    .catch(err => res.status((400).json("Error: " + err)))
    
});

router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Excercise id deleted " + req.params.id))
    .catch(err => res.status(400).json("Error " + error))
});

router.route("/update/:id").post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise=>{
        exercise.username = req.body.username,
        exercise.description = req.body.description,
        exercise.duration = req.body.duration,
        exercise.date = req.body.date


        exercise.save()
        .then(()=> res.json("Save changes!"))
        .catch(err => res.status(400).json("Error " + err))
    })
    .catch(err => res.status(400).json("Error in finding id "))
})


module.exports = router;

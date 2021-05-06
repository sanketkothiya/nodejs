const express = require('express');
const router = new express.Router();
const Student = require('./student');


//-------------------------------------------------
//-------------------------------------------------
//Create a new Student data 

// Using promises
// router.post('/student', (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save()
//         .then(() => {
//             res.status(201).send(user);
//             console.log("Student data created successfully.");
//         })
//         .catch((e) => {
//             res.status(400).send(e);
//             console.log("Student data has not created successfully.");
//         });

//     res.send("Success!!");
// })

//Using async-await
router.post('/student', async(req, res) => {

    try {

        console.log(req.body);
        const user = new Student(req.body);
        const createStudent = await user.save();
        res.status(200).send(createStudent);
        if (createStudent) {
            console.log("Student data created successfully.");
        } else {
            console.log("Student data has not created successfully.");
        }

    } catch (e) {

        res.status(400).send(e);

    }
})

//-------------------------------------------------
//Read a student data
router.get('/student', async(req, res) => {
    try {
        const readStudent = await Student.find();
        res.status(200).send(readStudent);
        if (readStudent) {
            console.log("Student data showed.");
        } else {
            console.log("Student data not found.");
        }
    } catch (e) {
        res.status(400).send(e);
    }
})

//-------------------------------------------------
//Filter a student data


// router.get('/student/:id', async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const filterStudent = await Student.findById(_id);

//         if (filterStudent) {
//             res.status(200).send(filterStudent);
//             console.log("Student data filtered.");
//         } else {
//             res.status(400).send(e);
//             console.log("Student data has not been filtered.");
//         }

//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

router.get('/student/:name', async(req, res) => {
    try {
        const name = req.params.name;
        console.log(name);
        const filterStudent = await Student.find({ name });
        console.log(filterStudent);

        if (filterStudent) {
            res.status(200).send(filterStudent);
            console.log("Student data filtered.");
        } else {
            res.status(400).send(e);
            console.log("Student data has not been filtered.");
        }

    } catch (e) {
        res.status(400).send(e);
    }
})

//-------------------------------------------------
//Update student data

// router.patch('/student/:id', async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const updateStudent = await Student.findByIdAndUpdate(_id, req.body, { new: true });
//         if (updateStudent) {
//             console.log("Student Record updated.");
//         } else {
//             console.log("Student Record has not been updated.");
//         }
//         res.send(updateStudent);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

router.patch('/student/:name', async(req, res) => {
    try {
        const name = req.params.name;
        console.log(name);
        const updateStudent = await Student.updateMany({ name }, req.body, { new: true });
        if (updateStudent) {
            console.log("Student Record updated.");
        } else {
            console.log("Student Record has not been updated.");
        }
        console.log(updateStudent);
        res.send(updateStudent);
    } catch (e) {
        res.status(400).send(e);
    }
})

//-------------------------------------------------
//Delete a student data

// router.delete('/student/:id', async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const deleteStudent = await Student.findByIdAndDelete(_id);
//         if (deleteStudent) {
//             console.log("Student Record deleted.");
//         } else {
//             console.log("Student Record has not been deleted.");
//         }
//         res.send(deleteStudent);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

router.delete('/student/:name', async(req, res) => {
    try {
        const name = req.params.name;
        const deleteStudent = await Student.deleteMany({ name });
        if (deleteStudent) {
            console.log("Student Record deleted.");
        } else {
            console.log("Student Record has not been deleted.");
        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(400).send(e);
    }
})

//-------------------------------------------------
//-------------------------------------------------

router.get('*', (req, res) => {
    res.status(404).send("Page not Found!");
})


module.exports = router;
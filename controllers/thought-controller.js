const { Thought, User, Types } = require('../models');

module.exports = {
    // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then(async (users) => {
        const thoughtObj = {
          users,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createrThought(req, res) {
    Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then (userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user with this ID' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
    },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) =>
        !deletedThought
          ? res.status(404).json({ message: 'No such thought exists' })
          : User.findOneAndUpdate(
              { _id: req.params.username },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then(userData => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
    // Update an existing User
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .catch((err) => res.status(500).json(err));
    },
}










































// const { ObjectId } = require('mongoose').Types;
// const { Student, Course } = require('../models');

// // Aggregate function to get the number of students overall
// const headCount = async () =>
//   Student.aggregate()
//     .count('studentCount')
//     .then((numberOfStudents) => numberOfStudents);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//   Student.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: ObjectId(studentId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: ObjectId(studentId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

// module.exports = {
//   // Get all students
//   getStudents(req, res) {
//     Student.find()
//       .then(async (students) => {
//         const studentObj = {
//           students,
//           headCount: await headCount(),
//         };
//         return res.json(studentObj);
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Get a single student
//   getSingleStudent(req, res) {
//     Student.findOne({ _id: req.params.studentId })
//       .select('-__v')
//       .then(async (student) =>
//         !student
//           ? res.status(404).json({ message: 'No student with that ID' })
//           : res.json({
//               student,
//               grade: await grade(req.params.studentId),
//             })
//       )
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // create a new student
//   createStudent(req, res) {
//     Student.create(req.body)
//       .then((student) => res.json(student))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Delete a student and remove them from the course
//   deleteStudent(req, res) {
//     Student.findOneAndRemove({ _id: req.params.studentId })
//       .then((student) =>
//         !student
//           ? res.status(404).json({ message: 'No such student exists' })
//           : Course.findOneAndUpdate(
//               { students: req.params.studentId },
//               { $pull: { students: req.params.studentId } },
//               { new: true }
//             )
//       )
//       .then((course) =>
//         !course
//           ? res.status(404).json({
//               message: 'Student deleted, but no courses found',
//             })
//           : res.json({ message: 'Student successfully deleted' })
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Add an assignment to a student
//   addAssignment(req, res) {
//     console.log('You are adding an assignment');
//     console.log(req.body);
//     Student.findOneAndUpdate(
//       { _id: req.params.studentId },
//       { $addToSet: { assignments: req.body } },
//       { runValidators: true, new: true }
//     )
//       .then((student) =>
//         !student
//           ? res
//               .status(404)
//               .json({ message: 'No student found with that ID :(' })
//           : res.json(student)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Remove assignment from a student
//   removeAssignment(req, res) {
//     Student.findOneAndUpdate(
//       { _id: req.params.studentId },
//       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//       { runValidators: true, new: true }
//     )
//       .then((student) =>
//         !student
//           ? res
//               .status(404)
//               .json({ message: 'No student found with that ID :(' })
//           : res.json(student)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };

const school = {
  courses: [
    {
      id: 11,
      name: 'art',
      students: ['abby', 'cathy', 'eddy']
    },
    {
      id: 12,
      name: 'science',
      students: ['bobby', 'cathy', 'danny'],
    },
    {
      id: 13,
      name: 'english',
      students: ['bobby', 'eddy']
    },
  ],
  students: {
    'abby': {
      favoriteCourse: 13,
      hatedCourse: 12,
    },
    'bobby': {
      name: 'bobby',
      favoriteCourse: 11,
      hatedCourse: 13,
    },
    'cathy': {
      favoriteCourse: 13,
      hatedCourse: 12,
    },
    'danny': {
      favoriteCourse: 12,
      hatedCourse: 11,
    },
    'eddy': {
      favoriteCourse: 12,
      hatedCourse: 13,
    },
  },
};

const moveStudents = (initialSchool) => {
  
  const students = initialSchool.students;
  const courses = initialSchool.courses;
  const coursesCopy = initialSchool.courses.slice(0);
  
  for (let student in students) {
    const favId = students[student].favoriteCourse;
    const hateId = students[student].hatedCourse;
    courses.forEach( (course, index ) => {
      if (course.id === favId) {
        if (!(course.students.includes(student))) {
          coursesCopy[index].students.push(student);
        }
      }
      if (course.id === hateId) {
        if ((course.students.includes(student))) {
          const updatedStudents = coursesCopy[index].students.filter((value) => value !== student);
          coursesCopy[index].students = updatedStudents;
        }
      }
    })
  }
  return {courses: coursesCopy, students};
};

const test = (newSchool) => {
  let failures = 0;
  newSchool.courses.map(course => {
    if (
      course.id === 11
      && JSON.stringify(course.students.sort()) !== JSON.stringify(['abby', 'bobby', 'cathy', 'eddy'])
    ) {
      failures ++;
    }

    if (
      course.id === 12
      && JSON.stringify(course.students.sort()) !== JSON.stringify(['bobby', 'danny', 'eddy'])
    ) {
      failures ++;
    }

    if (
      course.id === 13
      && JSON.stringify(course.students.sort()) !== JSON.stringify(['abby', 'cathy'])
    ) {
      failures ++;
    }
  });

  if (failures > 0) {
    console.log('Test failed.');
  } else {
    console.log('Test passed!');
  }
};
// moveStudents(school);
test(moveStudents(school)); // execute this line to see if your test passed

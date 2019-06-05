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

//checks and enrolls all students in their favorite course
const enrollInFav = (courseId, index, favoriteCourses, coursesCopy) => {
  favoriteCourses[courseId].forEach( (student) => {
    if (!(coursesCopy[index].students.includes(student))) {
      coursesCopy[index].students.push(student);
    }
  })
  return coursesCopy;
}

//checks and drops all students from their hated course
const dropHatedCourse = (courseId, index, hatedCourses, coursesCopy) => {
  hatedCourses[courseId].forEach( (student) => {
    if (coursesCopy[index].students.includes(student)) {
      const updatedStudents = coursesCopy[index].students.filter((value) => value !== student);
      coursesCopy[index].students = updatedStudents;
    }
  })
  return coursesCopy;
}

//generates an obj of course ids -> array of students fav and hated courses
const buildFavHateObjs = (students) => {
  let favoriteCourses = {};
  let hatedCourses = {};

  for (let student in students) {
    const favId = students[student].favoriteCourse;
    const hateId = students[student].hatedCourse;

    if (favId in favoriteCourses) {
      favoriteCourses[favId].push(student);
    } else {
      favoriteCourses[favId] = [student];
    }

    if (hateId in hatedCourses) {
      hatedCourses[hateId].push(student);
    } else {
      hatedCourses[hateId] = [student];
    }
  }
  return [favoriteCourses, hatedCourses];
}

const moveStudents = (initialSchool) => {
  
  const students = initialSchool.students;
  const courses = initialSchool.courses;
  let coursesCopy = initialSchool.courses.slice(0);
  
  let [favoriteCourses, hatedCourses] = buildFavHateObjs(students);

  courses.forEach( (course, index ) => {
    coursesCopy = enrollInFav(course.id, index, favoriteCourses, coursesCopy);
    coursesCopy = dropHatedCourse(course.id, index, hatedCourses, coursesCopy);
  });

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

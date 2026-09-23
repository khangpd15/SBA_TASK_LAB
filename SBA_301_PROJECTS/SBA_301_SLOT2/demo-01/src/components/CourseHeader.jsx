

import { course } from "../data/dashboardData";

function CourseHeader() {
    return (
        <header className="hero">
            <p className="eyebrow">{course.slot} • {course.topic}</p>
            <h1>{course.code}</h1>
            <p className="course-name">{course.name}</p>
            SBA301 • Slot 02 Reinforcement Project • ReactJS with IntelliJ IDEA
            Student Practical Guide | SBA301-40 v2
            Trang 10
        </header>
    );
}

export default CourseHeader; 
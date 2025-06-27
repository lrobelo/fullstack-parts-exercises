const Header = (props) => {
	return (
		<h1>{props.course}</h1>
	)
}

const Part = (props) => {
	return (
		<p>{props.part.name} {props.part.exercises}</p>
	)
}

const Content = (props) => {
	return (
		<div>
			{props.parts.map(part => (
				<Part key={part.id} part={part} />
			))}
		</div>

	)
}

const Total = (props) => {
	const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
	return (
		<p><strong>Total of {totalExercises} exercises</strong></p>
	)
}

const Course = (props) => {
	return (
		<div>
			{props.course.map(course => (
				<div key={course.id}>
					<Header course={course.name} />
					<Content parts={course.parts} />
					<Total parts={course.parts} />
				</div>
			))}
		</div>
	)
}

export default Course
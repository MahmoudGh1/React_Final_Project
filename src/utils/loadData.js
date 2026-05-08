const loadData = async () => {
	console.log("Enter Loader");
	let response = await fetch("http://localhost:3000/courses")
	let data = await response.json()
	return data
};

export default loadData;
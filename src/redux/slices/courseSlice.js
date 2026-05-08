/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCourses = createAsyncThunk("courses/getAllCourses", async () => {
	let response = await fetch("http://localhost:3000/courses")
	let data = await response.json()
	return data
});

export const addCourse = createAsyncThunk("courses/add", async (course) => {
    const res = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(course),
    });
    let data = await res.json();
	return data;
});

export const updateCourse = createAsyncThunk("courses/update", async (course) => {
    const res = await fetch(`http://localhost:3000/courses/${course.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(course),
    });
    let data = await res.json();
	return data;
});

export const deleteCourse = createAsyncThunk("courses/delete", async (id) => {
    const res = await fetch(`http://localhost:3000/courses/${id}`, { method: "DELETE" });
	return "course has been deleted successfully"
});

const courseSlice = createSlice({
	name: "course",
	initialState: { courses: [], selected: null, isLoading: true, error: false },
	reducers: {
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
		clearSelected: (state) => {
			state.selected = null;
		},
	},
	extraReducers:(builder)=>{
        builder.addCase(fetchCourses.fulfilled,(state,action)=>{
            state.courses = action.payload
        }),
         builder.addCase(fetchCourses.rejected,(state,action)=>{
            state.error = true
        }),
        builder.addCase(fetchCourses.pending,(state,action)=>{
            state.isLoading = true
        }),
        builder.addCase(addCourse.pending,   (state) => { 
			state.error = false; 
		})
        builder.addCase(addCourse.fulfilled, (state, action) => { 
			state.courses.push(action.payload); 
		})
        builder.addCase(addCourse.rejected,  (state) => { 
			state.error = true; 
		});
        builder.addCase(updateCourse.pending,   (state) => { 
			state.error = false; 
		})
		builder.addCase(updateCourse.fulfilled, (state, action) => {
			const index = state.courses.findIndex((course) => course.id === action.payload.id);
			if (index >= 0) {
				state.courses[index] = action.payload;
			}
        })
        builder.addCase(updateCourse.rejected,  (state) => { 
			state.error = true; 
		});
        builder.addCase(deleteCourse.pending,   (state) => { 
			state.error = false; 
		})
        builder.addCase(deleteCourse.fulfilled, (state, action) => {
			state.courses = state.courses.filter((course) => course.id !== action.payload);
		})
        builder.addCase(deleteCourse.rejected,  (state) => { 
			state.error = true; 
		});
    }
});

export const { setSelected, clearSelected } = courseSlice.actions;
export default courseSlice.reducer;
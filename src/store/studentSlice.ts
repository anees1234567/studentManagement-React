// src/store/studentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { studentListType } from '../Pages/StudentDetails/types';
interface StudentState {
  edit: studentListType | null;
  subjectList: { id: number; name: string }[];
}

const initialState: StudentState = {
  edit: null,
  subjectList:[] ,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<studentListType | null>) {
      state.edit = action.payload;
    }
  },
});

export const { setEdit} = studentSlice.actions;
export default studentSlice.reducer;

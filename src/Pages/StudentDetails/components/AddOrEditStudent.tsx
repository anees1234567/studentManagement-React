import { useContext, useEffect, useState } from 'react';
import { CustomFormField } from '../../../uitilities/CustomComponents/Customformfields';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress, IconButton, ListItem, ListItemText } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useNotification } from '../../../notification/context';
import {  useSelector } from 'react-redux';
import { studentListType } from '../types';
import { useMutation } from 'react-query';
import { addOrEditStudentService } from '../Services';



function AddOrEditStudent() {

  const { control, getValues, resetField, reset, handleSubmit } = useForm<any>();
  const [subjectList, setSubjectList] = useState<{ id: number; name: string }[]>([]);
  const { showNotification } = useNotification();
  const { edit } = useSelector((state: any) => state.student);


const {mutate:save,isLoading}=useMutation(addOrEditStudentService,{
    onSuccess:()=>{
      showNotification("Student details added","success")
      reset({})
      setSubjectList([])
    }
  })


  const addSubject = () => {
    const subject = getValues('subjects');
    if (subject?.id) {
      const isSubjectExist = subjectList.some((p) => p.id === subject.id);
      if (isSubjectExist) {
        showNotification('Subject already exists', 'info');

        return;
      }
      setSubjectList((prev) => [...prev, { id: subject.id, name: subject.name }]);

    } else {
      showNotification('Please select a subject', 'info');
    }
  };

  const RemoveSubject = (id: number) => {
    setSubjectList((prev) => prev.filter((plan) => plan.id !== id));
  };

  const onSubmit = (data: studentListType) => {
console.log(edit);
  const body = {
    id:edit?._id||null,
    name: data.name,
    email: data.email,
    age: data.age,
    studentClass: data.studentClass,
    subjects: subjectList,
  };
  save(body)
};


   useEffect(() => {
  
    if (edit) {
      reset({
        name: edit.name,
        email: edit.email,
        age: edit.age,
        studentClass: edit.studentClass,
      });
      console.log(edit.subjects)
      setSubjectList(edit.subjects)
    } else {
      reset({ name: '', email: '', age: '', studentClass: ''});
    }
  }, [edit, reset])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-[40rem]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {edit?.id ? 'Edit Student' : 'Add Student'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <CustomFormField
              control={control}
              element="input"
              name="name"
              rules={{ required: 'Name is required' }}
              fieldProps={{
                label: 'Full Name',
                fullWidth: true,
                variant: 'outlined',
                className: 'bg-gray-50',
              }}
            />
            <CustomFormField
              control={control}
              element="input"
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              }}
              fieldProps={{
                label: 'Email Address',
                type: 'email',
                fullWidth: true,
                variant: 'outlined',
                className: 'bg-gray-50',
              }}
            />
            <CustomFormField
              control={control}
              element="input"
              name="age"
              rules={{
                required: 'Age is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Age must be a number',
                },
              }}
              fieldProps={{
                label: 'Age',
                type: 'number',
                fullWidth: true,
                variant: 'outlined',
                className: 'bg-gray-50',
              }}
            />
            <CustomFormField
              control={control}
              element="input"
              name="studentClass" // Updated to match studentListType
              rules={{ required: 'Class is required' }}
              fieldProps={{
                label: 'Class',
                fullWidth: true,
                variant: 'outlined',
                className: 'bg-gray-50',
              }}
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Subjects</h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <CustomFormField
                  control={control}
                  name="subjects"
                  element="autocomplete"
                  options={SUBJECTS}
                  fieldProps={{
                    label: 'Select Subject',
                    fullWidth: true,
                    variant: 'outlined',
                    className: 'bg-gray-50',
                  }}
                  rules={{ required: false }}
                  autocompleteProps={{
                    isOptionEqualToValue: (option, value) => option?.id === value?.id,
                    getOptionLabel: (option) => option?.name || '',
                    filterOptions: (options) => options,
                  }}
                />
              </div>
              <div className="col-span-12 md:col-span-8 flex items-center">
                <Button
                  variant="contained"
                  endIcon={<Add />}
                  onClick={addSubject}
                  className="!bg-green-500 !text-white !rounded-lg !py-2 hover:!bg-green-600 transition"
                  fullWidth={false}
                >
                  Add Subject
                </Button>
              </div>
              <div className="col-span-12">
                <div className="flex flex-wrap gap-2">
                  {subjectList.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex items-center bg-gray-100 rounded-lg border border-gray-300 px-3 py-1"
                    >
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <IconButton
                            onClick={() => RemoveSubject(subject.id)}
                            color="error"
                            edge="end"
                            aria-label="delete"
                          >
                            <Delete />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={subject.name}
                          className="text-gray-700"
                          sx={{ paddingRight: '48px' }}
                        />
                      </ListItem>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="!bg-blue-500 !text-white !rounded-lg !py-3 hover:!bg-blue-600 transition"

              endIcon={isLoading && <CircularProgress size={20} color='inherit' />}
            >
              Save Student
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddOrEditStudent;

const SUBJECTS = [
  { id: 1, name: 'Mathematics' },
  { id: 2, name: 'English' },
  { id: 3, name: 'Science' },
  { id: 4, name: 'Social Studies' },
  { id: 5, name: 'Physics' },
  { id: 6, name: 'Chemistry' },
  { id: 7, name: 'Biology' },
  { id: 8, name: 'Computer Science' },
];
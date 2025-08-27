import {
  Button,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { searchParamsType, studentListType } from '../types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CustomFormField } from '../../../uitilities/CustomComponents/Customformfields';
import CustomTableBody from '../../../uitilities/CustomComponents/CustomTableBody';
import { useMutation } from 'react-query';
import debounce from '../../../uitilities/Debounce/Debounce';
import { setEdit } from '../../../store/studentSlice';
import { deleteStudentService, getAllStudents } from '../Services';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { Delete, Edit } from '@mui/icons-material';
import { useNotification } from '../../../notification/context';




function StudentListPage() {
  const navigateTo = useNavigate();
  const { control,reset } = useForm();
  const theme = useTheme();
  const {showNotification}=useNotification()
  const dispatch = useDispatch();

 

  const [searchParams, setSearchParams] = useState<searchParamsType>({
    pageNumber: 0,
    pageSize: 10,
    filter: {
      searchText: '',
    },
  });

  const { mutate: getAllList, isLoading: dataLoading, data: studentList } = useMutation(getAllStudents);

  const {mutate:deleteStudent}=useMutation(deleteStudentService,{
    onSuccess:()=>{
      showNotification("student deleted successfully","success")
      getAllList(searchParams)
    }
    
  })

  const handleSearch = (e: any) => {
    const { value } = e.target;
    setSearchParams({
      ...searchParams,
      filter: {
        searchText: value,
      },
    });
  };


const handleDelete=(id:string)=>{
  deleteStudent(id)
}

  const handleEdit = (data: studentListType) => {
      dispatch(setEdit(data));
      navigateTo("/addstudents")
  };
  const onChange = debounce(handleSearch, 500);
  const handleChangePage = (_: unknown, pageNumber: number) => {
    setSearchParams({
      ...searchParams,
      pageNumber,
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(event.target.value, 10);
    setSearchParams({
      ...searchParams,
      pageSize,
    });
  };

  useEffect(() => {
    console.log('Fetching students with searchParams:', searchParams);
    getAllList(searchParams);
  }, [searchParams, getAllList]);

  return (
    <div className="px-3 pt-4">
      <Paper className="flex flex-col gap-2">
        <TableContainer className="min-h-[80dvh] max-h-[80vh] relative">
          <div className="px-4 py-2 border-b">
            <Typography variant="h6">Registered students</Typography>
          </div>
          <div className=' flex justify-end items-center'>
            <form className="py-4 px-2 grid grid-cols-4 gap-2">
              <CustomFormField
                control={control}
                element="input"
                fieldProps={{ label: 'Search name' }}
                name="searchText"
                rules={{ required: false, onChange }}
              />
            </form>
            <Button  onClick={()=>navigateTo("/addstudents")}  variant="outlined" className=''>
              Add Student
            </Button>
          </div>
          <Table size="small" aria-label="simple table" className="border-b">
            <TableHead
              sx={{
                backgroundColor: theme.palette.primary.light,
              }}
              className="sticky w-full top-0 bg-inherit z-50"
            >
              <TableRow>
                {heading.map((title, index) => (
                  <TableCell align="center" sx={{ color: 'white' }} key={`${title}${index}`}>
                    <strong>{title}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <CustomTableBody
              alert={'No Records Found'}
              dataLoading={dataLoading}
              isData={Boolean(studentList?.response?.items?.length)}
              totalSpan={{ col: heading.length, row: 4 }}
            >
              {studentList?.response?.items?.map((row: studentListType, index) => (
                <TableRow key={row.id}>
                    <TableCell align="center">
                    <span>{searchParams.pageNumber * searchParams.pageSize + index + 1}</span>
                    </TableCell>
                  <TableCell align="center">
                    <span>{row.name}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{row.email}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{row.age}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{row.studentClass}</span>
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-around">
                      <IconButton onClick={() => handleEdit(row)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={()=>handleDelete(row._id as string)}>
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </CustomTableBody>
          </Table>
        </TableContainer>
        <div className="border-t">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={studentList?.response?.totalCount || 0}
            rowsPerPage={searchParams.pageSize}
            page={searchParams.pageNumber}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>
  );
}

export default StudentListPage;

const heading = ['SL NO', 'NAME', 'EMAIL', 'AGE', 'CLASS', 'Actions'];
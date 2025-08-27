import { Skeleton, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import React from "react";
interface TableBodyProps {
  children?: React.ReactNode;
  isData: boolean;
  dataLoading: boolean;
  totalSpan: {row:number,col:number};
  alert: String;
}
function CustomTableBody(props: TableBodyProps) {
  const { children, isData, dataLoading, totalSpan, alert } = props;
  let content;

  if (dataLoading) {

    const skeletonRows = Array(totalSpan?.row)
      .fill(null)
      .map((_, index) => (
        <TableRow key={index}>
          {Array(totalSpan?.col)
            .fill(null)
            .map((_, index) => (
              <TableCell key={index} align="center">
                <Skeleton variant="text" sx={{ fontSize: ".8rem" }} />
              </TableCell>
            ))}
        </TableRow>
      ));
    content = skeletonRows;
  } else if (isData) {
    content = children;
  } else {
    content = (
      <TableRow>
        <TableCell align="center" colSpan={totalSpan?.col}>
         <div className="flex flex-col justify-center items-center p-2">
          <ErrorIcon color="info" sx={{fontSize:"2rem"}}/>
         <Typography variant="h6">{alert}</Typography>
         </div>
        </TableCell>
      </TableRow>
    );
  }

  return <TableBody>{content}</TableBody>;
}

export default CustomTableBody;

import React from 'react'
import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,  } from "@mui/material"
import { useClientSidePagination } from '../../hooks/useClientSidePagination'
import { Column } from '../../common/utils'



type Props<T> = {
 columns: Column<T>[]
 rows: T[]
 getUniqueId: (val: T) => string
 widthPagination?: boolean
}

export const AppTable = <T,>({columns, rows, getUniqueId, widthPagination = true}: Props<T>) => {
 const {
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage, paginate} = useClientSidePagination()

  return (
   <Paper sx={{ width: '100%', overflow: 'hidden' }}>
   <TableContainer sx={{ maxHeight: 440 }}>
     <Table stickyHeader aria-label="sticky table">
       <TableHead>
         <TableRow>
           {columns.map((column) => (
             <TableCell
               key={column.key}
             >
               {column.header}
             </TableCell>
           ))}
         </TableRow>
       </TableHead>
       <TableBody>
         {paginate(rows).map((row, rowIndex) => {
             return (
               <TableRow
                 hover
                 tabIndex={-1} 
                 key={getUniqueId(row)}>
                 {columns.map((column) => {
                   if(column.render){
                     return column.render(row)
                   }

                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                   //@ts-ignore
                   const value = column.index ? rowIndex + 1 : row[column.key];
                   return (
                     <TableCell 
                       key={column.key}
                     >
                       {value}
                     </TableCell>
                   );
                 })}
               </TableRow>
             );
           })}
       </TableBody>
     </Table>
   </TableContainer>
   {
    widthPagination &&
   <TablePagination
     rowsPerPageOptions={[2, 4]}
     component="div"
     count={rows.length}
     rowsPerPage={rowsPerPage}
     page={page}
     onPageChange={(e, newPage) => handleChangePage}
     onRowsPerPageChange={handleChangeRowsPerPage}
   />
  } 
 </Paper>
  )
}

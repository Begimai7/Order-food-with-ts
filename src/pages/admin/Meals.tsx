import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton,  } from "@mui/material"
import {Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import useAppDispatch from '../../hooks/useAppDispatch'
import { getAllMeals } from '../../store/meals/meals.thunk'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { AppTable } from '../../components/UI/Table';
import { Column, Meal } from '../../common/utils';
import { FormSchema, MealModal } from '../../components/admin/meals/MealModal';
import { useSearchParams } from 'react-router-dom';

export const Meals = () =>{ 
const dispatch = useAppDispatch()
const meals = useSelector((state: RootState) => state.meals.items)
const [params, setParams] = useSearchParams()

useEffect(() => {
  dispatch(getAllMeals())
 }, [])

const openModalHandler = (mode: 'add' | 'edit') => {
  params.set('showModal', mode)
  setParams(params)
}
const closeModalHandler = () => {
  params.delete('showModal')
  setParams(params)
}
 

const  deleteMealHandler = (id: string) => {
  console.log(id);
  // dispatch(deleteMeal(id))
} 
const  editMealHandler = (id: string) => {
  openModalHandler('edit')
  params.set('mealId', id)
  setParams(params)
  console.log(id);
  // dispatch(deleteMeal(id))
} 

 const columns: Column<Meal>[] = [
  {
    header: "№",
    key: "_id",
    index: true
  },
  {
    header: "Title",
    key: "title"
  },
  {
    header: "Description",
    key: "description"
  },
  {
    header: "Price",
    key: "price"
  },
  {
    header: "Actions",
    key: "actions",
    render: (meal) =>  (
      <Grid>
         <IconButton>
         <EditIcon onClick={() => editMealHandler(meal._id)}/>
         </IconButton>
         <IconButton>
           <DeleteIcon onClick={() => deleteMealHandler(meal._id)}/>
         </IconButton>
      </Grid>
    )
  },
]


const saveHandler = (values: FormSchema) => {
   //dispatch(action(values))
}

const isModalOpen = !!params.get('modal')

  return (
    <div>
     <Button variant='contained' onClick={() => openModalHandler('add')}>Add new meals</Button>
      
      <MealModal
       open={isModalOpen} 
       onClose={closeModalHandler}
       onSubmit={saveHandler}
       /> 
      
     <Grid>
       <AppTable 
         widthPagination={false}
         columns={columns}
         rows={meals} 
         getUniqueId={(val) => val._id}
         />
     </Grid>
    </div>
  )
}

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, TextField, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useSearchParams } from 'react-router-dom';
import * as zod from "zod";
import mealsService from '../../../api/mealsService';

type Props = {
 open: boolean
 onClose: () => void
 onSubmit: (values: FormSchema) => void
}

const schema = zod.object({
 title: zod.string(),
 description: zod.string(),
 price: zod.number(),
})

export type FormSchema = (typeof schema)['_output']

export const MealModal = ({ open, onClose,  onSubmit}: Props) => {
const [searchParams, setSearchParams] = useSearchParams()

 const {register, handleSubmit, formState: {errors}, reset} = useForm({
   defaultValues: {
    title: "",
    description: '',
    price: '',
    
   },
   resolver: zodResolver(schema)
  })

   useEffect(() => {
const mealsId = searchParams.get('mealId')

    if(open && searchParams.get('modal') === 'edit' && mealsId) {
      mealsService.getMealsById(mealsId).then(({ data }) => {
       reset(data.data)
      })
    }
   }, [open])

   // const submitHandler = (values: FormSchema ) => {
   //  onSubmit(values)
   // }

  return (
   <Dialog
   open={open}
   onClose={onClose}
   aria-labelledby="alert-dialog-title"
   aria-describedby="alert-dialog-description"
 >
  <Form onSubmit={handleSubmit(onSubmit)}>
   <TextField 
    error = {!!errors.title}
    {...register('title')} 
    label='title'
    />
   <TextField 
    error = {!!errors.description}
    {...register("price", {
     valueAsNumber: true,
   })}
    label='Description'
    />
   <TextField 
    error = {!!errors.price}
    {...register('price')} 
    label='price'
    />

   <Button type='submit' variant='outlined' color='info' onClick={onClose}>Cencel</Button>
   <Button type='submit' variant='outlined' color='primary'>Save</Button>
  </Form>
   
 </Dialog>
  )
}

const Form = styled('form')(() => ({
 padding: '40px',
 width: 500,
 display: 'flex',
 flexDirection: 'column',
 // alignItems: 'center',
 gap: '20px',
}));
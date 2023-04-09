import { createAsyncThunk } from "@reduxjs/toolkit";
import mealsService from "../../api/mealsService";

export const getAllMeals = createAsyncThunk(
 'meals/getAll',
  async (_, {rejectWithValue}) => {
   try { 
   const {data} = await mealsService.getAllMeals()

   return data.data
 } catch (error) {
  return rejectWithValue(error)
 }
 }
)
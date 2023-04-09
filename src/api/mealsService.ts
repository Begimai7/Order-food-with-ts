import { Meal, UserRoles } from "../common/utils";
import { mainApi } from "../config/instances";

// type SignInResponse<T> = {
//  data: T
// }

type AllMealsResponse = {
    data:  Meal[] ;
};

const getAllMeals = () => {
    return mainApi.get<AllMealsResponse>("/foods");
};

type MealResponse = {
    data:  Meal ;
};
const getMealsById = (id: string) => {
    return mainApi.get<MealResponse>(`/foods/${id}`);
};

export default {
    getAllMeals,
    getMealsById
};

import {FC} from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
 components: FC
 fallBackPath: string
 isAllowed: boolean
} 

export const ProtectedRoutes = ({ components: Components, fallBackPath, isAllowed}: Props) => {

 if(!isAllowed){
  return <Navigate to={fallBackPath} />
 }

  return <Components />
}

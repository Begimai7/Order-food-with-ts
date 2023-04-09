import Grid from "@mui/material/Grid"
import React, { useCallback, useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"

export const UserLayout = () => {
    const [isBasketVisible, setBasketVisible] = useState(false)

    const clickHandler = useCallback(() => {
        setBasketVisible((prevS) => !prevS)
    }, [isBasketVisible])

    return (
        <div>
            <Header openBasket={clickHandler} />

            <Grid sx={{marginTop: "5rem"}}>
                <Outlet />
            </Grid>
        </div>
    )
}
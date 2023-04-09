import { Button as MuiButton, styled } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BasketButton } from "../../components/user/BasketButton"
import { signOut } from "../../store/auth/auth.thunk"
import { AppDispatch, RootState } from "../../store/store"

type Props = {
    openBasket: () => void
}

const Header = ({ openBasket }: Props) => {
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    // const calculateTotalAmount = () => {
    //     const sum = items.reduce((s, item) => {
    //         return s + item.amount
    //     }, 0)
    //     return sum
    // }

    const SignOutPageHandler = () => {
        dispatch(signOut())
        //  navigate('/signin')
    }

    const openBasketModalHandler = () => {
        return openBasket()
    }
    return (
        <>
            <HeaderContainer>
                <Logo to="/">ReactMeals</Logo>

                <HeaderActions>
                    <BasketButton
                      onClick={openBasketModalHandler} count={0} />

                    {isAuthorized ? (
                        <Button onClick={SignOutPageHandler}>SignOut</Button>
                    ) : (
                        <Button onClick={() => navigate("/signin")}>
                            SignIn
                        </Button>
                    )}
                </HeaderActions>
            </HeaderContainer>
        </>
    )
}

export default Header

const HeaderContainer = styled("div")(({ theme }) => ({
    position: "fixed",
    top: "0",
    zIndex: "1",
    background: theme.palette.primary.main,
    width: "100%",
    height: "101px",
    padding: "0 120px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000",
}))
const Logo = styled(Link)`
  font-weight: 600;
  font-size: 38px;
  line-height: 57px;
  color: #FFFFFF;
  text-decoration: none;
`
const Button = styled(MuiButton)(({ theme }) => ({
    // backgroundColor: theme.palette.primary.dark,
    backgroundColor: "red",
    color: theme.palette.primary.contrastText,
    borderRadius: "26px",
    padding: "5px 10px",

    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
}))

const HeaderActions = styled("div")(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 500,
}))

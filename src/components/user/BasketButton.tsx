import { Button as MuiButton, styled, ButtonProps } from "@mui/material";
import React from "react";
import { ReactComponent as BasketIcon } from "../../assets/icons/basket-icon.svg"; 

type Props = ButtonProps & {
    count: number
}

export const BasketButton = ({ count, ...props }: Props) => {
    return (
        <Button {...props}>
            <BasketIcon />
            Your Card
            <StyledCounter>{count || 0}</StyledCounter>
        </Button>
    );
};
const Button = styled(MuiButton)(({ theme }) => ({
    "&": {
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "24px",
        textAlign: "center",
        color: theme.palette.primary.contrastText,
        padding: "12px 32px",
        background: theme.palette.primary.dark,
        borderRadius: "30px",
        border: "none",
        display: "flex",
        alignItems: "center",
        marginLeft: "10px",
        gap: "15px",
    },

    "&:hover": {
        background: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    "& .bump": {
        animation: "bump 300ms ease-out",
    },
}));
const StyledCounter = styled("span")(({ theme }) => ({
    background: theme.palette.primary.main,
    borderRadius: "30px",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "27px",
    color: theme.palette.primary.contrastText,
    padding: "4px 20px",
}));

import {
    Grid as MuiGrid,
    TextField,
    styled,
    Typography,
    Button,
} from "@mui/material";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { Link, useNavigate,  } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/auth/auth.thunk";
import useAppDispatch from "../../hooks/useAppDispatch";

const schema = z.object({
    email: z.string().email("Write Email"),
    password: z.string().min(6, "ai kokui"),
});

type FormSchema = (typeof schema)['_output']

export const SignInPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [loginError, setLoginError] = useState<string>("")

    // const emailChangeHandler = (e) => {
    //   setEmail(e.target.value);
    //   setError("")
    // };
    // const passwordChangeHandler = (e) => {
    //   setPassword(e.target.value);
    //   setError("")

    // };

    const submitHandler = (values: FormSchema) => {
      console.log(values);
      
        dispatch(signIn(values))
        .unwrap()
        .then(() => navigate('/'))
        .catch((e: string) => setLoginError(e))
    };

     

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
        resolver: zodResolver(schema),
    });
    return (
        <Grid>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <TextField
                    error={!!errors.email}
                    label="email"
                    {...register("email", {
                        required: "Please enter your email",
                    })}
                />
                {errors.email && (
                    <Typography textAlign="center" sx={{ color: "red" }}>
                        {errors.email.message}
                    </Typography>
                )}

                <TextField
                    error={!!errors.password}
                    label="Password"
                    {...register("password", {
                        required: "Please enter your password",
                    })}
                />
                {errors.password && (
                    <Typography textAlign="center" sx={{ color: "red" }}>
                        {errors.password.message}
                    </Typography>
                )}

                <Button type="submit">SignIn</Button>
                <Link to={"/signup"}> Do not have an account? </Link>
            </Form>
        </Grid>
    );
};
const Grid = styled(MuiGrid)(() => ({
    width: "500px",
    margin: "9rem auto",
}));
const Form = styled("form")(() => ({
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: "20px",
}));

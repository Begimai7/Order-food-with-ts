import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { UserRoles } from "../common/utils";
import { AdminLayout } from "../layout/admin";
import { UserLayout } from "../layout/user";
import { Meals } from "../pages/admin/Meals";
import { SignInPage } from "../pages/guest/SignInPage";
import { RootState } from "../store/store";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const MainRoutes = () => {
    const role = useSelector((state: RootState) => state.auth.user.role);

    const isAllowed = (roles: UserRoles[]) => {
        return roles.includes(role);
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoutes
                        isAllowed={isAllowed([UserRoles.USER, UserRoles.GUEST])}
                        fallBackPath="/admin/meals"
                        components={UserLayout}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([
                                UserRoles.USER,
                                UserRoles.GUEST,
                            ])}
                            fallBackPath="/admin/meals"
                            components={() => <p>MealsPage</p>}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([
                                UserRoles.USER,
                                UserRoles.GUEST,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? "/admin/meals" : "/"
                            }
                            components={() => <p>SignUpPage</p>}
                        />
                    }
                />
                <Route
                    path="signin"
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([
                                UserRoles.USER,
                                UserRoles.GUEST,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? "/admin/meals" : "/"
                            }
                            components={SignInPage}
                        />
                    }
                />
            </Route>
            0
            <Route
                path="/admin"
                element={
                    <ProtectedRoutes
                        isAllowed={isAllowed([UserRoles.ADMIN])}
                        fallBackPath="/"
                        components={AdminLayout}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            components={Meals}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            components={() => <p>AdminOrders</p>}
                        />
                    }
                />
            </Route>
            <Route path="*" element={<h2> page not FOUND!!! </h2>} />
        </Routes>
    );
};

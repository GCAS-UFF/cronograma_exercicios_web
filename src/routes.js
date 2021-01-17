import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import PassowrdReset from './pages/PasswordReset/PasswordReset';
import Main from './pages/Main/Main'
import Manage from './pages/Manage/Manage'
import RegisterExercise from './pages/RegisterExercise/RegisterExercise';
import { AuthContext, AuthProvider } from "./services/auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
            <Redirect to={"/signIn"} />
          )
      }
    />
  );
};

const Routes = () => (
  <AuthProvider>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/passwordReset" component={PassowrdReset} />
      <PrivateRoute exact path="/main" component={Main} />
      <PrivateRoute exact path="/registerExercise/:userId" component={RegisterExercise} />
      <PrivateRoute exact path="/manage" component={Manage} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
  </AuthProvider>
);

export default Routes;
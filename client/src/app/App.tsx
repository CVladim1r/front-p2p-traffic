import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateSchema, StoreProvider } from "./providers/store";
import { ApiError, AuthService, UsersService } from "../shared/api";
import { USER_ACCESS_TOKEN_KEY, userActions } from "../entities/User";
import Layout from "./Layout";
import "./App.css"


function App() {
  const dispatch = useDispatch();

  const {authorization, _initialized} = useSelector(
    (state: StateSchema) => state.user
  );

  const authUser = async () => {
    if (authorization) {
      try {
        await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)
        dispatch(userActions.initAuthorization());
        console.log("old auth done")
        return        
      } catch (error) {
        console.error("Request failed:", error);

        if ((error as ApiError).status === 422) { // if auth invalid => remove and create new by going further
          localStorage.removeItem(USER_ACCESS_TOKEN_KEY)
          dispatch(userActions.setAuthorization(""));
        }
      }
    }
    
    try {
      if (!window.Telegram.WebApp.initDataUnsafe.user || !window.Telegram.WebApp.initDataUnsafe.user.username)
        throw new Error("No user data");
        
      const response = await AuthService.postAuthApiV1P2PAuthPost({
        init_data_raw: {
          auth_date: new Date().toISOString(),
          hash: window.Telegram.WebApp.initDataUnsafe.hash,
          query_id: window.Telegram.WebApp.initDataUnsafe.query_id,
          user: {
            first_name: window.Telegram.WebApp.initDataUnsafe.user.first_name,
            id: window.Telegram.WebApp.initDataUnsafe.user.id,
            is_premium: window.Telegram.WebApp.initDataUnsafe.user.is_premium ?? false,
            username: window.Telegram.WebApp.initDataUnsafe.user.username,
          },
        },
        init_ton: {
          address: "address_string",
          signature: "full",
        },
        auth_type: "telegram",
      });
      
      const token = `Bearer ${response.access_token}`;
      localStorage.setItem(USER_ACCESS_TOKEN_KEY, token);
      dispatch(userActions.initAuthorization());
      console.log("new auth done")
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  useEffect(() => { // *Runs twice on dev on start with <Strictmode>
    console.log("start auth");
    authUser();
  }, [])

  return _initialized ? <StoreProvider><Layout /></StoreProvider> : <div>Loading...</div>;
}

export default App;

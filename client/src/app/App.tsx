import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AdditionalService, AuthService, UserMainPageOut, UsersService } from "../shared/api";
import { selectAuthorization, userActions } from "../entities/User";
import { appActions } from "../entities/App/slice/appSlice";
import Layout from "./Layout";
import "./App.css"
import { user } from "../index";
import { additionalActions } from "../entities/Additional/slice/additionalSlice";
import { useAppSelector } from "./providers/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "./providers/router";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDataRef = useRef<UserMainPageOut>(undefined)

  const authorizationRef = useRef(useAppSelector(selectAuthorization))
  const authSuccess = useAppSelector(s => s.app.authSuccess)

  const updateUserPhoto = async () => {
    if (!user?.photo_url)
      return

    try {
      await UsersService.updateUserPhotoApiV1P2PUserUpdateUserPhotoPost(
        authorizationRef.current,
        { photo_url: user.photo_url }
      )
      if (userDataRef.current)
        dispatch(userActions.setUserData(userDataRef.current))
      console.log("user photo updated");
    } catch (error) {
      console.error("Update user photo failed:", error);
    }
  }

  const loadAdditionalData = async () => {
    try {
      const response = await AdditionalService.getTransactionCurrencyTypesApiV1P2POtherTransactionCurrencyTypesGet()
      dispatch(additionalActions.setCurrencyTypes(response))
      console.log("Got currency types");
    } catch (error) {
      console.error("Get currency types failed:", error);
    }

    try {
      const response = await AdditionalService.getCategoriesApiV1P2POtherCategoriesGet()
      dispatch(additionalActions.setCategories(response))
      console.log("Got categories");
    } catch (error) {
      console.error("Get categories failed:", error);
    }

    try {
      const response = await AdditionalService.getUserAcquisitionTypeApiV1P2POtherUserAcquisitionTypeGet()
      dispatch(additionalActions.setUserAcquisitionType(response))
      console.log("Got user acquisition types");
    } catch (error) {
      console.error("Get user acquisition types failed:", error);
    }
  }

  const getMainData = async (authorization: string, setError=false, throwError=false) => {
    try {
      const response = await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)
      dispatch(userActions.setUserData(response));
      userDataRef.current = response
      return true
    } catch (error) {
      console.error("Main data retrieving failed:", error)
      if (throwError)
        throw error
      if (setError)
        dispatch(appActions.setErrorMessage("Не удалось загрузить данные пользователя"))
      return false
    }
  }

  const getMainDataOrCreateUser = async (authorization: string, setError=false) => {
    if (await getMainData(authorization))
      return true

    if (!user)
      throw new Error("no tg data")

    try {
      await UsersService.createUserApiV1P2PUserCreateUserPost(authorization, {tg_id: user.id, username: user.username})
      return await getMainData(authorization, setError)
    } catch (error) {
      console.error("Creating user failed:", error)
      if (setError)
        dispatch(appActions.setErrorMessage("Не удалось создать пользователя"))
      return false
    }
  }

  const authUser = async () => {
    console.log("start auth");
    
    if (import.meta.env.DEV && authorizationRef.current) {
      try {
        await getMainData(authorizationRef.current, false, true)
        console.log("old auth + data done")
        return true
      } catch {
        dispatch(userActions.setAuthorization(""))
        authorizationRef.current = ""
      }
    }
    
    if (!window.Telegram.WebApp.initDataUnsafe.user || !window.Telegram.WebApp.initDataUnsafe.user.username) {
      navigate({pathname: RoutePaths.noTgData})
      return false
    }

    if (authorizationRef.current) {
      try {
        await getMainData(authorizationRef.current, false, true)
        console.log("old auth + data done")
        return true
      } catch {
        dispatch(userActions.setAuthorization(""))
        authorizationRef.current = ""
      }
    }
    
    try {
      const response = await AuthService.postAuthApiV1P2PAuthPost({
        init_data_raw: {
          auth_date: new Date().toISOString(),
          hash: window.Telegram.WebApp.initDataUnsafe.hash,
          query_id: window.Telegram.WebApp.initDataUnsafe.query_id,
          user: {
            first_name: window.Telegram.WebApp.initDataUnsafe.user.first_name,
            id: window.Telegram.WebApp.initDataUnsafe.user.id,
            username: window.Telegram.WebApp.initDataUnsafe.user.username,
          },
        },
        init_ton: {
          address: "address_string",
          signature: "full",
        },
        auth_type: "telegram",
      });
      
      authorizationRef.current = `Bearer ${response.access_token}`;
      console.log("new auth done")
      if (!await getMainDataOrCreateUser(authorizationRef.current, true))
        return false

      console.log("get data done");
    } catch (error) { 
      console.error("Authentication failed:", error);
      dispatch(appActions.setErrorMessage("Не удалось аутентифицироваться"))
      return false
    }

    return true
  }

  const {data} = useQuery({
    queryKey: ["userMainData"],
    queryFn: async () => {
      return UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorizationRef.current)
    },

    refetchInterval: 10000,
    
    enabled: authSuccess
  })
  useEffect(() => {
    if (data)
      dispatch(userActions.setUserData(data))
  }, [data])

  const initApp = async () => {
    if (await authUser()) {
      await updateUserPhoto()
      await loadAdditionalData()
      dispatch(userActions.setAuthorization(authorizationRef.current))
      dispatch(appActions.setAuthSuccess(true))
    }
    dispatch(appActions.setIsLoading(false));
  };

  
  const initStarted = useRef(false)
  useEffect(() => { // *Runs twice on dev on start with <StrictMode>
    if (!initStarted.current) {
      initStarted.current = true
      initApp();
    }
  }, [])

  return <Layout /> ;
}

export default App;

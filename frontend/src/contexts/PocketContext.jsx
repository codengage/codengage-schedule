import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import PocketBase from "pocketbase";
import { useInterval } from "usehooks-ts";
import jwtDecode from "jwt-decode";
import ms from "ms";

const BASE_URL = "http://192.168.1.184:8090";
const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("2 minutes");

const PocketContext = createContext({});

export const PocketProvider = ({ children }) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);



  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
     setToken(token);
     setUser(model);
    });
  }, []);

  const register = useCallback(async (username, email, password, name) => {
    return await pb
     .collection("users")
     .create({ username, email, password, passwordConfirm: password, name });
  }, []);

  const login = useCallback(async (email, password) => {
     return await pb.collection("users").authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
     pb.authStore.clear();
  }, []);
  
  const registerReserve = useCallback(async (title, creator, sala, start, end, backgroundColor) => {
    const id = Array(15+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 15)
    return await pb
      .collection('ReserveCalendar')
      .create({id, title, creator, sala, start, end, backgroundColor, textColor: '#fff', borderColor: backgroundColor})
      .then (await pb
        .collection("users")
        .update(creator, {"reserva+": id}))
  }, []);

  const ler = useCallback(async () => {
     await pb.collection('ReserveCalendar').getFullList({
     })
      .then((res) => console.log(res));
  }, []);

  const show = useCallback(async (idRef) => {
    await pb.collection("ReserveCalendar")
    .getFirstListItem(idRef,{expand: 'relField1,relField2.subRelField',})
    .then((res) => console.log(res));
 }, []);

 const drag = useCallback(async (idRef, startRef, endRef) => {
  await pb.collection('ReserveCalendar')
  .update(idRef,{"start": startRef, "end": endRef});
}, []);

  const del = useCallback(async (idRef) => {
    await pb.collection('ReserveCalendar')
    .delete(idRef);
  }, []);

  const update = useCallback(async (title, creator, sala, backgroundColor) => {
    return await pb
      .collection('ReserveCalendar')
      .update({id, title, creator, sala, backgroundColor, textColor: '#fff', borderColor: backgroundColor}) 
  }, []);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection("users").authRefresh();
    }
  }, [token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  return (
    <PocketContext.Provider
      value={{ register, login, logout, drag, ler, show, del, update, registerReserve, user, token, pb }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
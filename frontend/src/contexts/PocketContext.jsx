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

  const register = useCallback(async (username, email, password, passwordConfirm) => {
    return await pb
     .collection("users")
     .create({username, email, password, passwordConfirm });
  }, []);

  const login = useCallback(async (email, password) => {
     return await pb.collection("users").authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
     pb.authStore.clear();
  }, []);
  
  const registerReserve = useCallback(async (title, creator, sala, start, end, backgroundColor) => {
    const id = (Math.random().toString(36)+'0000000000000000').slice(2, 15+2);
    id.substring(0,15)
    return await pb
      .collection('ReserveCalendar')
      .create({id, title, creator, sala, start, end, backgroundColor, textColor: '#fff', borderColor: backgroundColor})
      .then (await pb
        .collection("users")
        .update(creator, {"reserva+": id}))
  }, []);

  const salareg = useCallback(async (nome, cara, creator, start, end) => {
    return await pb
    .collection("horario")
    .create({start, end})
    .then( await pb
      .collection("sala")
      .create({ nome, cara, start, end, creator
      }));
  }, []);

  const leuser = useCallback(async () => {
    await pb.collection('users').getFullList({
    })
    .then ((res) => console.log(res))
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

  const del = useCallback(async (idRef) => {
    await pb.collection('ReserveCalendar')
    .delete(idRef);
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
      value={{ register, login, logout, salareg, ler, leuser, show, del, registerReserve, user, token, pb }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import PocketBase from "pocketbase";
import { useInterval } from "usehooks-ts";
import jwtDecode from "jwt-decode";
import ms from "ms";
import { useQuery } from "@tanstack/react-query";

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

  const register = useCallback(async (username, email, password) => {
    return await pb
     .collection("users")
     .create({ username, email, password, passwordConfirm: password });
  }, []);

  const login = useCallback(async (email, password) => {
     return await pb.collection("users").authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
     pb.authStore.clear();
  }, []);
  
  const retrive = useCallback(async (email) => {
    console.log(email);
    return await pb.collection("users").requestPasswordReset(email);
  }, []);

  const registerReserve = useCallback(async (title, creator, sala, start, end, backgroundColor) => {
    const id = Array(15+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 15)
    return await pb
      .collection('ReserveCalendar')
      .create({id, title, creator, sala, start, end, backgroundColor, textColor: '#fff', borderColor: backgroundColor})
      .then (pb
        .collection("users")
        .update(creator, {"reserva+": id}))
  }, []);

  const records = useCallback(async () => {
    await pb.collection('ReserveCalendar').getFullList({
      sort: 'start',
  });
  }, []);

  const show = useCallback(async (id) => {
    await pb.collection("ReserveCalendar")
    .getFirstListItem(id,{expand: 'relField1,relField2.subRelField',})
    .then((res) => console.log(res));
  }, []);

  const drag = useCallback(async (id, start, end) => {
    await pb.collection('ReserveCalendar')
    .update(id,{"start": start.toISOString().slice(0, 16), "end": end.toISOString().slice(0, 16)});
  }, []);

  const criador = useCallback(async (id) => {
    useQuery({
      queryKey: ['creator', id],
      queryFn: async () => {
        return(await pb.collection('users').getOne(id, {expand: 'username',
          })
        );
      }
    });
  }, []);

  const del = useCallback(async (id) => {
    await pb.collection('ReserveCalendar')
    .delete(id);
  }, []);

  const update = useCallback(async (id, title, sala, start, end, backgroundColor) => {
    return await pb
      .collection('ReserveCalendar')
      .update(id, {title, sala, start, end, backgroundColor, borderColor: backgroundColor}) 
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
      value={{ register, login, logout, retrive, criador, drag, records, show, del, update, registerReserve, user, token, pb }}
      >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
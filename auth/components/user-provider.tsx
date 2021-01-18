import React from "react";
import { getInitialState, User } from "../models/user";
import { isNull } from "../../util";
import { createContext, createContextHook } from "../../utils/context-hook";
import { ProviderComponentProps } from "../../components/provider-group";
import { useState } from "../../hooks/state";
import { useHistory } from "../../routing/hooks/history";
import { useNotifications } from "../../notifications/notifications-provider";

export interface ContextProps {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (user: User) => void;
}

export const UserContext = createContext<ContextProps>('user');
export const useUser = createContextHook(UserContext);

export function UserProvider({ children }: ProviderComponentProps) {
  const { show } = useNotifications();
  const { push } = useHistory();
  const { value: user, set } = useState<User | null>(getInitialState());

  function login(user: User): void {
    set(user);
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.email);
  }

  function logout(): void {
    set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // TODO: should probably call graphql too!
    // clear search parameters from url
    push('/', () => ({}));
    show({
      type: "success",
      message: "Wylogowano"
    });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !isNull(user),
        logout,
        login
      }}
    >
      { children }
    </UserContext.Provider>
  );
}

import { NextComponentType, NextPageContext } from "next";
import React from 'react';
import useSWR from 'swr';
import { API } from "../../configs/api-config";
import { EntityJSON } from "../../types/api";
import { User } from "../../types/user";
import { fetchDataByGet } from "../../util/network-util";
import AuthenticationUtil from "../../util/authentication-util";

export const UserContext = React.createContext(null);

export declare type WithUserProps = {
  user?: User;
};


export declare type ExcludeUserProps<P> = Pick<P, Exclude<keyof P, keyof WithUserProps>>;
export default function withUser<P extends WithUserProps, C = NextPageContext>(ComposedComponent: NextComponentType<C, any, P>): React.ComponentType<ExcludeUserProps<P>> {
  function WrappedComponent(props: P) {
    const { data, mutate } = useSWR<EntityJSON<User>>(API.LoggedUserData, fetchDataByGet);
    let user = data && data.entity;
    if (!AuthenticationUtil.isValidated()) {
      mutate(null);
      user = null;
    }
    return <UserContext.Provider value={user}><ComposedComponent {...props} /></UserContext.Provider>
  }
  WrappedComponent.getInitialProps = ComposedComponent.getInitialProps;
  return WrappedComponent;
}

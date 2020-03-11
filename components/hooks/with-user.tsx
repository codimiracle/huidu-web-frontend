import { NextComponentType, NextPageContext } from "next";
import React from 'react';
import { User } from "../../types/user";
import useSWR from 'swr';
import { API } from "../../configs/api-config";
import { fetchDataByGet } from "../../util/network-util";
import { EntityJSON } from "../../types/api";

export const UserContext = React.createContext(null);

export declare type WithUserProps = {
  user?: User;
};


export declare type ExcludeUserProps<P> = Pick<P, Exclude<keyof P, keyof WithUserProps>>;
export default function withUser<P extends WithUserProps, C = NextPageContext>(ComposedComponent: NextComponentType<C, any, P>): React.ComponentType<ExcludeUserProps<P>> {
  function WrappedComponent(props: P) {
    const { data, error } = useSWR<EntityJSON<User>>(API.LoggedUserData, fetchDataByGet);
    return <UserContext.Provider value={data && data.entity}><ComposedComponent {...props} /></UserContext.Provider>
  }
  WrappedComponent.getInitialProps = ComposedComponent.getInitialProps;
  return WrappedComponent;
}

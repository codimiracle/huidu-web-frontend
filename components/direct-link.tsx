import React from 'react';
import { UrlObject } from 'url';

import Link from 'next/link';

declare type Url = string | UrlObject;

export interface DirectLinkProps {
  href?: Url,
  as?: Url
};
export interface DirectLinkState { };

export default class DirectLink extends React.Component<DirectLinkProps, DirectLinkState> {
  render() {
    const { href, as, children } = this.props;
    return (
      <>
        <Link href={href} as={as}><a>{children}</a></Link>
        <style jsx>{`
          a {
            color: inherit;
          }
        `}</style>
      </>
    )
  }
}
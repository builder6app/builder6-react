/*
 * @LastEditTime: 2024-06-10 12:04:32
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @customMade: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';
import React, { PropsWithChildren } from 'react';
import { BuilderElement, Builder, withBuilder, BuilderStore } from '@builder6/react';

interface AmisProps {
  context: object;
  schema: object;
  data: object;
  builderState: BuilderStore;
  builderBlock: BuilderElement;
}

interface AmisComponentState {
  isLoaded: boolean;
}

class AmisRender extends React.Component<PropsWithChildren<AmisProps>, AmisComponentState> {
  amis: any = null;
  ref: any = null;
  amisScoped: any = null;

  firstLoad = true;

  // componentWillUnmount() {
  //   if (this.amisScoped) {
  //     this.amisScoped.unmount();
  //   }
  // }

  loadResources() {
    if (Builder.isBrowser && (window as any)['amisRequire'] && (window as any)['amisRequire']('amis/embed')) {
      this.setState({ isLoaded: true }, () => {
        this.initializeAmis();
      });
      return;
    }

    const unpkgUrl = Builder.settings["unpkgUrl"] || 'https://unpkg.steedos.cn';
    const amisVersion = Builder.settings["amisVersion"] || '6.5.0';
    const amisTheme = Builder.settings["amisTheme"] || 'antd';

    const scripts = [
      { src: `${unpkgUrl}/amis@${amisVersion}/sdk/sdk.js`, type: "script" },
    ];

    const styles = [
      { href: `${unpkgUrl}/amis@${amisVersion}/sdk/${amisTheme}.css`, type: "link" },
      { href: `${unpkgUrl}/amis@${amisVersion}/sdk/helper.css`, type: "link" },
      { href: `${unpkgUrl}/amis@${amisVersion}/sdk/iconfont.css`, type: "link" },
    ];
    let loadedScripts = 0;
    let loadedStyles = 0;

    const onLoad = () => {
      loadedScripts++;
      if (loadedScripts === scripts.length && loadedStyles === styles.length) {
        this.setState({ isLoaded: true }, () => {
          this.initializeAmis();
        });
      }
    };

    const onError = (src :any) => {
      console.error(`Failed to load resource: ${src}`);
    };

    scripts.forEach(({ src }) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = onLoad;
        script.onerror = () => onError(src);
        document.head.appendChild(script);
      } else {
        loadedScripts++;
      }
    });

    styles.forEach(({ href }) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => {
          loadedStyles++;
          if (loadedScripts === scripts.length && loadedStyles === styles.length) {
            this.setState({ isLoaded: true }, () => {
              this.initializeAmis();
            });
          }
        };
        link.onerror = () => onError(href);
        document.head.appendChild(link);
      } else {
        loadedStyles++;
      }
    });

    if (loadedScripts === scripts.length && loadedStyles === styles.length) {
      this.setState({ isLoaded: true }, () => {
        this.initializeAmis();
      });
    }
  }


  initializeAmis() {

    this.amis = Builder.isBrowser && (window as any)['amisRequire'] && (window as any)['amisRequire']('amis/embed');
    if (!this.amis) {
      console.error('Amis is not loaded');
      return;
    }
    const amisTheme = Builder.settings["amisTheme"] || 'antd';
    const { builderState } = this.props;
    const data = {
      ...builderState.state,
      ...this.props.data,
    };
    const context = {
      theme: amisTheme,
      ...this.props.context,
      ...builderState.context,
    };

    this.amisScoped = this.amis.embed(this.ref.current, this.props.schema, { data }, context);
    
  }


  constructor(props:any) {
    // console.log('AmisComponent', props);

    super(props);
    this.ref = React.createRef<HTMLDivElement>();
   
    this.state = {
      isLoaded: false,
    };
    this.loadResources = this.loadResources.bind(this);
    this.firstLoad = true;
  }

  componentDidMount() {
    this.loadResources();
  }

  componentDidUpdate(prevProps : any) {
    if (prevProps.schema !== this.props.schema) {
      this.amisScoped.updateSchema(this.props.schema);
    } else if (prevProps.data !== this.props.data) {
      this.amisScoped.updateProps(this.props.data, () => {
        /*更新回调 */
      });
    }
  }


  render() {
    return (
      <div ref={this.ref}>
        {!this.state.isLoaded && (<span>Loading...</span>)} 
      </div>
    );
  }
}

export const Amis = withBuilder(AmisRender, {
  name: 'Builder6:Amis',
  static: true,
  image:
    'https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2F682efef23ace49afac61748dd305c70a',
  inputs: [
    {
      name: 'schema',
      type: 'javascript',
      required: true,
      defaultValue: `{
        "type": "page",
        "title": "标题",
        "body": "Hello World!"
      }`,
      code: true,
    },
    {
      name: 'data',
      type: 'javascript',
      required: true,
      defaultValue: `{}`,
      code: true,
    },
  ],
  canHaveChildren: false,
});

/*
 * @LastEditTime: 2024-06-10 10:36:49
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @customMade: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';
import { BuilderComponent, builder, Builder } from '@builder6/react';
import DefaultErrorPage from 'next/error';
import '@builder6/widgets';

interface BuilderPageProps {
  content: any;
  data: any;
}

if (Builder.isBrowser) {
  (window as any).builder = builder;
  (window as any).Builder = Builder;
}

export function RenderBuilderContent({ content, data }: BuilderPageProps) {

  if (content) {
    return (
      <BuilderComponent 
        content={content} 
        data={data}
        model="page" 
      />
    )
  }

  return <DefaultErrorPage statusCode={404} />;
}

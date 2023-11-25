import * as React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
    children?: never;
    color?: string;
  }

export const PythonIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 76.84" width={15} height={15}>
    <g id="svg2">
      <path id="path1948" fill={color} d="M37.55,0c-3.13,.01-6.13,.28-8.76,.75-7.76,1.37-9.17,4.24-9.17,9.53v6.99h18.33v2.33H12.74c-5.33,0-9.99,3.2-11.45,9.29-1.68,6.98-1.76,11.34,0,18.63,1.3,5.43,4.41,9.29,9.74,9.29h6.3v-8.37c0-6.05,5.23-11.39,11.45-11.39h18.31c5.1,0,9.17-4.2,9.17-9.32V10.28c0-4.97-4.19-8.7-9.17-9.53C43.95,.22,40.68-.01,37.55,0Zm-9.91,5.62c1.89,0,3.44,1.57,3.44,3.5s-1.55,3.48-3.44,3.48-3.44-1.56-3.44-3.48,1.54-3.5,3.44-3.5Z"/>
      <path id="path1950" fill={color} d="M58.55,19.59v8.14c0,6.31-5.35,11.62-11.45,11.62H28.79c-5.02,0-9.17,4.29-9.17,9.32v17.46c0,4.97,4.32,7.89,9.17,9.32,5.8,1.71,11.37,2.01,18.31,0,4.61-1.34,9.17-4.03,9.17-9.32v-6.99h-18.31v-2.33h27.48c5.33,0,7.31-3.72,9.17-9.29,1.91-5.74,1.83-11.26,0-18.63-1.32-5.3-3.83-9.29-9.17-9.29h-6.88Zm-10.3,44.2c1.9,0,3.44,1.56,3.44,3.48s-1.54,3.5-3.44,3.5-3.44-1.57-3.44-3.5,1.55-3.48,3.44-3.48Z"/>
    </g>
  </svg>);
  }
);

PythonIcon.displayName = 'ArchiveIcon';

export default PythonIcon;
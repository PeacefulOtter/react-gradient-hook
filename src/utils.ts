import { RGB, TRGB } from "./types";


export const getColorString = (color: RGB) =>  `rgb(${color.r}, ${color.g}, ${color.b})`

const gradColor = (color: TRGB) => getColorString(color) + ` ${color.t * 100}%`

export const sortColors = ( colors: TRGB[] ) => [...colors].sort( (a: TRGB, b: TRGB) => a.t - b.t )


export const computeGradient = ( colors: TRGB[] ): string => {
    if ( colors.length === 0 ) return 'black';
    else if ( colors.length === 1 ) return getColorString(colors[0])
    
    return sortColors( colors )
        .reduce( (acc, cur, i) =>  
            acc + gradColor(cur) + (i === colors.length - 1 ? '' : ','), 
            'linear-gradient(90deg, '
        ) + ')'
}

export const interpolateColors = (colors: TRGB[], i: number, x: number): TRGB => {
    if ( i === 0 ) return { ...colors[0], t: x }
    if ( i === colors.length ) return { ...colors[i - 1], t: x }
    const c1 = colors[i - 1]
    const c2 = colors[i]
    const d1 = x - c1.t;
    const d2 = c2.t - x;
    const D = d1 + d2
    const f1 = 1 - d1 / D
    const f2 = 1 - d2 / D
    return {
        r: c1.r * f1 + c2.r * f2,
        g: c1.g * f1 + c2.g * f2,
        b: c1.b * f1 + c2.b * f2,
        t: x
    };
}

export const getColorOnGradient = (colors: TRGB[], pos: number): TRGB => {
    let i: number = 0;
    while ( colors[i].t < pos && ++i < colors.length );
    return interpolateColors(colors, i, pos);
}
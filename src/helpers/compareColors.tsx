export const getRGB = ( hexaColor: string ) => {
    const color: number = parseInt( hexaColor.substring(1), 16 );
    const r: number = color >> 16;
    const g: number = ( color - ( r<<16 ) ) >> 8;
    const b: number = color - ( r<<16 ) - ( g<<8 );
    
    return [ r, g, b ];
}

export const isSimilar = ( [r1, g1, b1]: number[], [r2, g2, b2]: number[] ) => {
    return Math.abs(r1-r2)+Math.abs(g1-g2)+Math.abs(b1-b2) < 100;
}
import React from 'react';
import Spline from '@splinetool/react-spline';

export default function webpage() {
    return (
        <div className="relative w-screen h-screen">
            <div className="relative w-full h-full pointer-events-none">
                <Spline scene="https://prod.spline.design/Y1lHTokbX9kL9nCm/scene.splinecode" />
            </div>
        </div>
    );
}

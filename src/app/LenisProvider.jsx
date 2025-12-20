'use client'

import { ReactLenis, useLenis } from 'lenis/react'

export default function LenisProvider({ children }) {
    const lenis = useLenis()
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    )
}

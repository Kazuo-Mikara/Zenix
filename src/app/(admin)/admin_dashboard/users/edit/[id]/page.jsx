'use client'
import React from 'react'
import { useSearchParams, usePathname } from 'next/navigation';
const page = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    // const id = searchParams.get('id');
    const id = pathname.split('/').filter((segment) => segment.includes('id'))
    let userId = null;
    // if (id) {
    //     userId = id.replace('id=', id)
    // }
    return (
        <div>ID is {(id.length)}</div>
    )
}

export default page
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image'
import React from 'react'

const Navbar = async () => {
    const user = await currentUser();

    return (
        <div className='flex items-center justify-between p-4'>
            {/* SEARCH BAR */}
            {/*ICONS AND USER */}
            <div className='flex items-center gap-8 justify-end w-full'>
                <div className='flex flex-col'>
                    <span className='text-xs leading-3 font-bold'>{user?.firstName}</span>
                    <span className='text-[12px] text-gray-500 text-right'>{user?.publicMetadata.role as string}</span>
                </div>
                <div>
                    {/*<Image src="/avatar.png" alt="" width={36} height={36} className='rounded-full'/>*/}
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Navbar
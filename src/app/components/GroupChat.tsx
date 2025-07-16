import { setGroupName } from '@/store/slices';
import React from 'react'
import { useDispatch } from 'react-redux';


export interface IGroupChat {
    group_id: number
    group_name: string;
    members: string[]
}[]

const GroupChat = ({
    Group,
    isModalOpen
}:
    {
        Group: IGroupChat[],
        isModalOpen: boolean
    }) => {


    const dispatch = useDispatch()

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className='overflow-y-auto'>
                {Group?.map((member) => {
                    return (
                        <div key={member.group_id} className={`flex items-center ${isModalOpen ? "gap-x-2" : "gap-x-4"}  
                        cursor-pointer hover:bg-[#002670] px-2 py-3` } onClick={() => dispatch(setGroupName(member.group_name))}>
                            <img
                                src="/images/profile.png"
                                alt="user-profile"
                                className="w-10 mx-2"
                            />
                            <span className='text-white text-lg'>
                                {member.group_name}
                            </span>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default GroupChat
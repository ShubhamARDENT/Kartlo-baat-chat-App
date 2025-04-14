
"use client"
import React from "react";
import { Poppins } from "next/font/google";
import { Plus } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;

}
const poppins = Poppins({
    subsets: ['latin'],
    weight: "400",
})

const Modal = ({ isOpen, setIsModalOpen, children }: ModalProps) => {

    if (!isOpen) return null;

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement).id === "modal-overlay") {
            setIsModalOpen(false)
        }
    }

    return (
        // modal bg
        <div id="modal-overlay" className="fixed inset-0 z-1 flex items-center justify-center bg-black/50"
            onClick={(e) => handleCloseModal(e)} >
            {/* modal content */}
            <div className="bg-[#001030] w-full rounded-xl shadow-lg p-7 min-w-[300px] max-w-lg relative">
                {/* create group name and + */}
                <div className="flex justify-between mb-5">
                    <input type="text"
                        placeholder="create group name"
                        className={`bg-white p-4 outline-none text-black text-sm w-[80%] ${poppins.className}`} />

                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;

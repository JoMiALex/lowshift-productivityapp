'use client'
import React, { useState } from "react";
//import { TextLink } from "./TextLink";
import Image from "next/image";

export const FormLogIn = (): JSX.Element => {
    const [isSupervisor, setIsSupervisor] = useState(false);
    const [isShiftView, setIsShiftView] = useState(false);

    return (
        <div className="flex flex-col w-[342px] h-[459px] items-center gap-[33px] px-5 py-[22px] relative bg-white rounded-lg border border-solid border-[#d9d9d9]">
        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="self-stretch mt-[-1.00px] relative font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
            Usename:
            </div>

            <div className="flex min-w-60 items-center px-4 py-3 relative self-stretch w-full flex-[0_0_auto] mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#d9d9d9]">
            <div className="relative flex-1 mt-[-0.50px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#b3b3b3] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                Value
            </div>
            </div>
        </div>

        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="self-stretch mt-[-1.00px] relative font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
            Password:
            </div>

            <div className="flex min-w-60 items-center px-4 py-3 relative self-stretch w-full flex-[0_0_auto] mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg overflow-hidden border border-solid border-[#d9d9d9]">
            <div className="relative flex-1 mt-[-0.50px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#b3b3b3] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                Value
            </div>
            </div>
        </div>

        <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <button className="all-[unset] box-border flex items-center justify-center gap-2 p-3 relative self-stretch w-full flex-[0_0_auto] bg-[#2c2c2c] rounded-lg overflow-hidden border border-solid border-[#2c2c2c]">
            <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
                Sign In
            </button>
            </button>
        </div>

        <div className="flex flex-col w-[236px] items-start relative flex-[0_0_auto]">
            <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex-1 relative font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                Supervisor/Admin
            </div>
            <button 
                onClick={() => setIsSupervisor(!isSupervisor)}
                className={`relative w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                isSupervisor ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
                <span
                className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    isSupervisor ? 'translate-x-4' : 'translate-x-0'
                }`}
                />
            </button>
            </div>
        </div>

        <div className="flex flex-col w-[236px] items-start relative flex-[0_0_auto]">
            <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex-1 relative font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                Shift View
            </div>
            <button 
                onClick={() => setIsShiftView(!isShiftView)}
                className={`relative w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                isShiftView ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
                <span
                className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    isShiftView ? 'translate-x-4' : 'translate-x-0'
                }`}
                />
            </button>
            </div>
        </div>

        {/* <TextLink
            className="!self-stretch !h-[22px] !flex !items-end !w-full"
            text="Forgot password?"
            href="/forgot-password"
        /> */}
            <a 
            href="/forgot-password"
            className="self-stretch h-[22px] flex items-end w-full text-[#1e1e1e] hover:underline"
            >
                Forgot password?
            </a>    
        </div>
  );
};

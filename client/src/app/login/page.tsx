'use client'
import React, { useState } from "react";
import Image from "next/image";

export const FormLogIn = () => {
    const [isSupervisor, setIsSupervisor] = useState(false);
    const [isShiftView, setIsShiftView] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="mb-8" style={{
                width: '497px',
                textAlign: 'center',
                color: 'white',
                fontSize: '36px',
                fontFamily: 'Inter',
                fontWeight: '400',
                lineHeight: '44px',
                wordWrap: 'break-word'
            }}>
                LowShift
            </div>

            <div className="flex flex-col w-600 h-700 items-center gap-33 px-5 py-22 relative bg-white rounded-lg border border-solid border-[#d9d9d9]">
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="self-stretch mt-[-1px] relative font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                        Username:
                    </div>

                    <div className="flex min-w-60 items-center px-4 py-3 relative self-stretch w-full flex-[0_0_auto] mb-[-1px] ml-[-1px] mr-[-1px] bg-white rounded-lg overflow-hidden border border-solid border-[#d9d9d9]">
                        <div className="relative flex-1 mt-[-0.5px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#b3b3b3] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                            Value
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="self-stretch mt-[-1px] relative font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                        Password:
                    </div>

                    <div className="flex min-w-60 items-center px-4 py-3 relative self-stretch w-full flex-[0_0_auto] mb-[-1px] ml-[-1px] mr-[-1px] bg-white rounded-lg overflow-hidden border border-solid border-[#d9d9d9]">
                        <div className="relative flex-1 mt-[-0.5px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#b3b3b3] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                            Value
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <button className="all-[unset] box-border flex items-center justify-center gap-2 p-3 relative self-stretch w-full flex-[0_0_auto] bg-[#2c2c2c] rounded-lg overflow-hidden border border-solid border-[#2c2c2c] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
                        Sign In
                    </button>
                </div>

                <div className="flex flex-col w-236 items-start relative flex-[0_0_auto]">
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

                <div className="flex flex-col w-236 items-start relative flex-[0_0_auto]">
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

                <a 
                    href="/forgot-password"
                    className="self-stretch h-22 flex items-end w-full text-[#1e1e1e] hover:underline"
                >
                    Forgot password?
                </a>    
            </div>
        </div>
    );
};
"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const SkillCircle = forwardRef(({ className, children, icon }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full border border-gray-600 bg-gray-700 p-2 shadow-[0_2px_8px_rgba(255,255,255,0.15)]",
        "size-14",
        className,
      )}      
    >
      {icon}
    </div>
  );
});

SkillCircle.displayName = "SkillCircle";

export function SkillsBeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const googleDriveRef = useRef(null);
  const whatsappRef = useRef(null);
  const googleDocsRef = useRef(null);
  const messengerRef = useRef(null);

  return (
    <div
      className="relative flex h-[300px] w-full items-start justify-center overflow-hidden bg-black"
      ref={containerRef}
    >
      <div className="relative h-full w-full max-w-xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SkillCircle 
            ref={centerRef} 
            className="size-16"
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffffff" strokeWidth="1.5"/>
                <path d="M18.4142 5.58579C15.6332 2.80474 11.3668 2.80474 8.58579 5.58579C5.80474 8.36683 5.80474 12.6332 8.58579 15.4142C11.3668 18.1953 15.6332 18.1953 18.4142 15.4142" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M5.58578 18.4142C8.36683 21.1953 12.6332 21.1953 15.4142 18.4142C18.1953 15.6332 18.1953 11.3668 15.4142 8.58579C12.6332 5.80474 8.36683 5.80474 5.58578 8.58579" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />
        </div>
        <div className="absolute top-[20%] left-[20%]">
          <SkillCircle 
            ref={googleDriveRef}
            icon={
              <svg width="20" height="20" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
              </svg>
            }
          />
        </div>
        <div className="absolute bottom-[20%] left-[20%]">
          <SkillCircle 
            ref={whatsappRef}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.76784 19.9323L4.67304 17.1776C4.76789 16.8831 4.71673 16.5632 4.54184 16.316C3.85469 15.1106 3.50002 13.6974 3.50002 12ZM12 1.5C6.20101 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 22.2707C0.928048 22.7084 1.02525 23.1947 1.3323 23.5345C1.63934 23.8742 2.12108 24.015 2.56639 23.9048L8.07918 22.3039C9.36369 22.7856 10.7768 23.0321 12.2452 22.9951C12.1641 22.9984 12.0822 23 12 23C17.799 23 22.5 18.299 22.5 12C22.5 5.70101 17.799 1 12 1C12.0826 1 12.1651 1.00169 12.2473 1.00506C12.1649 1.00169 12.0826 1.5 12 1.5Z" fill="#25D366"/>
                <path d="M9.60204 7.50178C9.3391 6.95423 8.94167 6.96082 8.57733 6.96082C8.02574 6.96082 7.0785 7.3315 7.0785 8.45643C7.0785 9.36003 7.52368 10.6771 9.41249 12.7955C11.1886 14.7947 13.4839 15.7458 15.4018 15.7458C16.5267 15.7458 16.7022 15.0279 16.7022 14.6166C16.7022 14.297 16.2241 13.8527 15.9517 13.7534C15.0899 13.448 13.9085 12.9581 13.6524 12.8829C13.4167 12.8142 13.286 12.9197 13.1682 13.0496C12.8661 13.3829 12.3244 14.0182 12.1414 14.1889C12.0023 14.318 11.8108 14.2829 11.6775 14.2056C11.2905 13.9799 10.0387 13.2064 9.08555 12.1354C8.35254 11.3215 8.15248 10.8999 8.0524 10.731C7.95835 10.5752 8.08418 10.4601 8.13456 10.4078C8.40056 10.1331 8.73463 9.66768 8.90921 9.43042C9.11228 9.15619 9.05588 8.95703 8.99347 8.82728C8.85771 8.55896 8.52363 7.76084 8.31455 7.37132C8.16081 7.08908 7.97574 7.01268 7.74047 7.00018C7.5052 6.98767 7.29612 6.99426 7.0785 7.00677L9.60204 7.50178Z" fill="#25D366"/>
              </svg>
            }
          />
        </div>
        <div className="absolute top-[20%] right-[20%]">
          <SkillCircle 
            ref={googleDocsRef}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#4285F4"/>
                <path d="M14 2V8H20L14 2Z" fill="#A1C2FA"/>
                <path d="M16 13H8V15H16V13Z" fill="#F1F1F1"/>
                <path d="M16 17H8V19H16V17Z" fill="#F1F1F1"/>
                <path d="M16 9H8V11H16V9Z" fill="#F1F1F1"/>
              </svg>
            }
          />
        </div>
        <div className="absolute bottom-[20%] right-[20%]">
          <SkillCircle 
            ref={messengerRef}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.36 2 2 6.13 2 11.7C2 14.61 3.33 17.13 5.47 18.73V22.82L9.45 20.45C10.25 20.64 11.1 20.74 12 20.74C17.64 20.74 22 16.61 22 11.04C22 5.47 17.64 2 12 2Z" fill="url(#paint0_radial_15251_2176)"/>
                <path d="M4.5 15.2C4.5 15.38 4.66 15.51 4.81 15.44C6.15 14.89 8.96 13.32 10.5 14.16C12.04 15 11.17 16.96 9.99 18.1C9.91 18.18 9.95 18.31 10.06 18.35C11.79 18.89 13.74 18.54 15.62 17.1L20 21L21 10L4 11L4.5 15.2Z" fill="url(#paint1_radial_15251_2176)"/>
                <path d="M11.99 13.93L9.41 11.12C9.22 10.91 8.86 10.95 8.73 11.2L7.1 14.1C6.93 14.42 7.19 14.79 7.54 14.73L10.5 14.2C10.68 14.17 10.82 14.05 10.87 13.88L11.27 12.23C11.34 12.01 11.22 11.77 11 11.7L10.61 11.57C10.49 11.53 10.47 11.37 10.58 11.29L11.87 10.34C12.08 10.19 12.36 10.31 12.42 10.56L12.79 12.01C12.86 12.3 13.2 12.4 13.42 12.19L14.14 11.5C14.33 11.32 14.64 11.4 14.73 11.65L15.47 13.69C15.57 13.98 15.95 14.05 16.14 13.82L17.75 11.85C17.91 11.66 18.19 11.66 18.35 11.85L19.5 13.22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <radialGradient id="paint0_radial_15251_2176" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22 2) rotate(180) scale(20 20)">
                    <stop stopColor="#0099FF"/>
                    <stop offset="0.61" stopColor="#A033FF"/>
                    <stop offset="0.935" stopColor="#FF5280"/>
                    <stop offset="1" stopColor="#FF7061"/>
                  </radialGradient>
                  <radialGradient id="paint1_radial_15251_2176" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21 10) rotate(180) scale(17)">
                    <stop stopColor="#0099FF"/>
                    <stop offset="0.61" stopColor="#A033FF"/>
                    <stop offset="0.935" stopColor="#FF5280"/>
                    <stop offset="1" stopColor="#FF7061"/>
                  </radialGradient>
                </defs>
              </svg>
            }
          />
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={googleDriveRef}
        toRef={centerRef}
        curvature={-35}
        pathWidth={2.5}
        pathOpacity={0.4}
        gradientStartColor="#0066da"
        gradientStopColor="#00ac47"
        delay={0}
        duration={5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={whatsappRef}
        toRef={centerRef}
        curvature={35}
        pathWidth={2.5}
        pathOpacity={0.4}
        gradientStartColor="#25D366"
        gradientStopColor="#128C7E"
        delay={0.4}
        duration={5.2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={googleDocsRef}
        toRef={centerRef}
        curvature={-35}
        pathWidth={2.5}
        pathOpacity={0.4}
        gradientStartColor="#4285F4"
        gradientStopColor="#A1C2FA"
        delay={0.6}
        duration={4.8}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={messengerRef}
        toRef={centerRef}
        curvature={35}
        pathWidth={2.5}
        pathOpacity={0.4}
        gradientStartColor="#0099FF"
        gradientStopColor="#FF5280"
        delay={1}
        duration={5.3}
        reverse={true}
      />
    </div>
  );
} 
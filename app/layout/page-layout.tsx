"use client";

import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import { LoadingModal } from "../components/loader/loading-modal";

interface LayoutProps {
  readonly showLoading?: boolean;
  readonly header?: ReactNode;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
}

export default function PageLayout({ showLoading = false, header, children, footer }: LayoutProps) {
  const [scale, setScale] = useState(1);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 1024 ? 0.75 : 1);
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scaleFactor = 1 / scale;
  
  return (
    <div className={clsx(
      {"w-screen": isDesktop}, 
      {"overflow-hidden": !isDesktop},)}>
      <div className="origin-top-left inline-block"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${scaleFactor * 100}%`,
          height: `${scaleFactor * 100}%`,
        }}
      >
        {header && (
          <header className="top-0 sticky z-50 bg-menu h-[50px] flex justify-center">
            <div className="w-full max-w-screen-xl">{header}</div>
          </header>
        )}
        <main className="flex justify-center">
          <div className="w-full max-w-screen-xl">{children}</div>
        </main>
        {footer && (
          <footer className="w-full mt-8">
            <div className="max-w-screen-xl mx-auto px-4">{footer}</div>
          </footer>
        )}
      </div>
      { showLoading && <LoadingModal />}
      <ToastContainer />
    </div>
  );
}
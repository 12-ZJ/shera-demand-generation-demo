import { useLoadingStore } from "@/app/store";
import Link from "next/link"
import React from "react";
import { AiOutlineEdit } from "react-icons/ai"
import { BeatLoader } from "react-spinners";

interface EditButtonProps {
    href: string;
}

export const EditButton = ({ href }: EditButtonProps) => {
    return (
        <div className="flex justify-center space-x-2">
            <Link href={href} className="edit-button">
            <AiOutlineEdit size={16} />
            </Link>
        </div>
    )
}

interface IconButtonProps {
  onClick: () => void;
  className?: string;
  icon?: React.ReactElement;
  label?: string;
  title?: string;
  size?: number;
  disable?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  className = "edit-button",
  icon = <AiOutlineEdit />,
  label,
  title = "Edit",
  size = 16,
  disable = false,
}) => {
  const iconWithSize = React.cloneElement(icon, { size });

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disable}
      title={title}
      aria-label={title}
      className="flex justify-center"
    >
      <div className={`${className} flex gap-2 items-center`}>
        {iconWithSize}
        {label}
      </div>
    </button>
  );
}

interface ActionButtonProps {
  type?: "button" | "submit";
  className?: string;
  label: string;
  loaderColor?: string;
  disable?: boolean;
  pending?: boolean;
  icon?: React.ReactElement;
  iconSize?: number
  onClick?: () => void;
}

export const ActionButton = ({ type = "button", className = "primary-button", label, loaderColor = "white", disable, pending, icon, iconSize = 16, onClick }: ActionButtonProps) => {
  const { processing } = useLoadingStore((state) => state);
  const loading = pending ?? processing;

  const iconWithSize = icon && React.cloneElement(icon as React.ReactElement<any>, { size: iconSize });
  return (
    <button type={type} className={className} disabled={disable || loading} onClick={onClick}>
      { loading
        ? <BeatLoader color={loaderColor} size={5} className="ml-3" />
        : <div className="flex gap-2 items-center"> {icon && iconWithSize} {label} </div>
      }
    </button>
  )
}
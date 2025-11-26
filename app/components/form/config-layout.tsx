"use client";

import { ReactNode } from "react";
import SecondaryHeader from "../header/secondary-header";
import { ActionButton } from "../common";

interface Props {
    title: string;
    tag: string;
    action?: string;
    onClickAction?: () => void;
    readonly children: ReactNode;
    onSave: (e: React.FormEvent) => void;
}

const Form = ({ title, tag, action, onClickAction, children, onSave }: Props) => {
    return (
        <form onSubmit={onSave} className="px-6 py-8 space-y-5">
            <SecondaryHeader title={title} tag={tag} action={action} onClickAction={onClickAction}/>
            <div>
                <div className="w-[1200px] space-y-4">
                    {children}
                </div>
            </div>
            <div className="w-full flex justify-center gap-4">
                <ActionButton type="submit" className="primary-button w-52" label="Save"/>
            </div>
        </form>
    )
}

export default Form;
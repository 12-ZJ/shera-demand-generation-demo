"use client"

import ModalLayout from "@/app/layout/modal-layout";
import { InspirationProductModel, Option, ProductModel } from "@/app/lib/types";
import { useEffect, useRef, useState } from "react";
import { IconButton, SelectField } from "../common";
import { Check, Trash2, X } from "lucide-react";
import { createChangeHandlerArray } from "@/app/lib/utils";

interface Props {
    isOpen: boolean;
    title: string;
    productMaster: ProductModel[];
    dataSource: InspirationProductModel[];
    base64Photo: string;
    onClose: () => void;
    onSubmit: (updateData: InspirationProductModel[]) => void;
}

const TagModal = ({ isOpen, title, productMaster, dataSource, base64Photo, onClose, onSubmit }: Props ) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [popupLeft, setPopupLeft] = useState(0);
    const [popupTop, setPopupTop] = useState(0);
    const [showOption, setShowOption] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [tags, setTags] = useState<InspirationProductModel[]>(dataSource);

    const { multiAt: handleMultiArrayChange } = createChangeHandlerArray(tags, setTags);

    useEffect(() => {
        setTags(dataSource);
    }, [isOpen, dataSource]);

    const productOption = () => {
        const items: Option[] = productMaster
            .filter(p => tags.some(item => item.productId === p.id && !item.posX && !item.posY))
            .map(i => ({
                value: String(i.id),
                label: i.name
            }));
        return items;
    }

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return; // ถ้า img ยังไม่ mount → exit
        const imgEl = imgRef.current;

        const containerRect = imgRef.current?.parentElement!.getBoundingClientRect();
        
        // ดึงตำแหน่งและขนาดของ <img> ปัจจุบันบนหน้าจอ (rendered size)
        const rect = imgEl.getBoundingClientRect();

        const offsetX = rect.left - containerRect.left;
        const offsetY = rect.top - containerRect.top;

        // ตำแหน่งคลิกใน px บน <img> ที่ render จริง
        // e.clientX / e.clientY = พิกัดคลิกใน viewport
        // rect.left / rect.top = พิกัดซ้ายบนของ img ใน viewport
        const clickX = e.clientX - rect.left; // ระยะคลิกจากขอบซ้ายของ img
        const clickY = e.clientY - rect.top;  // ระยะคลิกจากขอบบนของ img
        console.log("clickX", clickX);
        console.log("clickY", clickY);

        // แปลงเป็นอัตราส่วนตามขนาดรูปจริง (0–1)
        // imgEl.naturalWidth / naturalHeight = ขนาดรูปจริง (px) ของไฟล์
        // rect.width / rect.height = ขนาด img ที่ render บนหน้าเว็บ
        // clickX / rect.width = อัตราส่วนตำแหน่งบน render
        // posX = อัตราส่วนของตำแหน่งบนรูปจริง
        // สูตร simplify:
        const posX = clickX / rect.width; // = clickX / rect.width = อัตราส่วน 0–1
        const posY = clickY / rect.height;
        console.log("posX", posX);
        console.log("posY", posY);

        // บันทึก state ของ tag (posX / posY)
        // currentX / currentY = อัตราส่วน 0–1 ของตำแหน่งบนรูปจริง
        setCurrentX(posX);
        setCurrentY(posY);

        // เก็บตำแหน่ง popup เล็ก ๆ สำหรับ SelectField
        // popup จะโชว์ตรงที่ผู้ใช้คลิก

        const popupLeft = offsetX + posX * rect.width;
        const popupTop = offsetX + posY * rect.width;
        setPopupLeft(popupLeft);
        setPopupTop(popupTop);

        // เปิด modal / popup เลือกสินค้า
        setShowOption(true);
    };

    const handleSelectProduct = () => {
        if (!selectedProduct) return;

        const index = tags.findIndex(item => item.productId === selectedProduct);
        handleMultiArrayChange(index, {posX: String(currentX), posY: String(currentY)});
        handleClearProduct();
    }

    const handleClearProduct = () => {
        setCurrentX(0);
        setCurrentY(0);
        setSelectedProduct(0);
        setShowOption(false);
    }

    return (        
        <ModalLayout isOpen={isOpen} onClose={onClose}>
            <div className="flex relative">
                <div
                    className="w-2/3 h-[500px] flex justify-center items-center overflow-auto bg-black relative"
                    onClick={handleImageClick}
                >
                    <img
                        ref={imgRef}
                        src={`data:image/png;base64,${base64Photo}`}
                        alt="tag-photo"
                        style={{ maxHeight: "100%" }}
                    />

                    {tags.map((t, index) => {
                        if (t.posX === "" && t.posY === "") return null;
                        const prod = productMaster.find(p => p.id === t.productId);
                        return (
                            <div
                                key={index}
                                className="absolute flex flex-col items-center shadow-sm"
                                style={{
                                    left: `${Number(t.posX) * 100}%`,
                                    top: `${Number(t.posY) * 100}%`,
                                    transform: "translate(-50%, -0%)"
                                }}
                            >
                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-black/70" />
                                <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {prod?.name ?? "-"}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-1/3 bg-white flex flex-col">
                    <div className="overflow-auto h-[460px] border shadow">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="w-[90%]">Product</th>
                                    <th className="w-[10%]"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {tags.map((row, i) => {
                                    const prod = productMaster.find(p => p.id === row.productId);
                                    if (Number(row.posX) === 0 && Number(row.posY) === 0) return null;

                                    return (
                                        <tr key={i}>
                                            <td className="px-2 py-1">{prod?.name ?? "-"}</td>
                                            <td className="px-2 py-1">
                                                <IconButton
                                                    icon={<Trash2 />}
                                                    className="bg-none text-theme_back"
                                                    size={14}
                                                    onClick={() =>
                                                        handleMultiArrayChange(i, { posX: "", posY: "" })
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex fixed bottom-0 w-1/3">
                        <button
                            className="w-1/2 h-[40px] bg-theme_primary text-white font-medium"
                            onClick={() => onSubmit(tags)}
                        >
                            OK
                        </button>
                        <button
                            className="w-1/2 h-[40px] bg-theme_foreground text-theme_topic font-medium"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {showOption && (
                    <div
                        className="fixed z-50 flex bg-white px-2 py-1 gap-2 rounded shadow"
                        style={{
                            left: popupLeft,
                            top: popupTop,
                            transform: "translate(-50%, -150%)"
                        }}
                    >
                        <SelectField
                            id="select_productId"
                            name="productId"
                            className="w-[200px]"
                            options={productOption()}
                            value={selectedProduct}
                            selectAction={(e) => setSelectedProduct(Number(e?.value))}
                            menuPortalTarget={null}
                        />

                        <IconButton
                            icon={<Check />}
                            className="bg-none text-theme_primary"
                            size={18}
                            onClick={handleSelectProduct}
                        />

                        <IconButton
                            icon={<X />}
                            className="bg-none text-theme_red"
                            size={18}
                            onClick={handleClearProduct}
                        />
                    </div>
                )}
            </div>
        </ModalLayout>
    );
}

export default TagModal;
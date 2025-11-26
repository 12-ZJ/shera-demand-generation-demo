"use client"

import { InspirationProductExtended, InspirationProductModel } from "@/app/lib/types";
import { useRef, useState } from "react";

interface Props {
    dataSource: InspirationProductExtended[];
    base64Photo: string;
}

const TagPhoto = ({ dataSource, base64Photo }: Props ) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgSize, setImgSize] = useState<{width: number; height: number} | null>(null);

  const handleImgLoad = () => {
    if (!imgRef.current) return;
    setImgSize({
      width: imgRef.current.width,
      height: imgRef.current.height
    });
  };

return (
    <div className="relative w-full h-[500px] flex justify-center items-center bg-black">
      <img
        ref={imgRef}
        src={`data:image/png;base64,${base64Photo}`}
        alt="tag-photo"
        style={{ maxHeight: "100%" }}
        onLoad={handleImgLoad}
      />

      {imgSize &&
        dataSource.map((item, index) => {
            // ถ้า posX หรือ posY เป็น 0 → แปลว่ายังไม่ได้ tag จุดนี้ เลยไม่ต้อง render
            if (item.posX === "" && item.posY === "") return null;

            // ดึง element ของ <img> ปัจจุบันจาก ref
            const imgEl = imgRef.current;
            if (!imgEl) return null; // ถ้า img ยังไม่ mount → skip

            // ดึงขนาดและตำแหน่งของ div ครอบรูป (parent div) ใน viewport
            const divRect = imgEl.parentElement!.getBoundingClientRect();

            // ดึงขนาดและตำแหน่งของ <img> ใน viewport
            const imgRect = imgEl.getBoundingClientRect();

            // คำนวณ offset ของ <img> จากขอบซ้ายบนของ div
            // เพราะ <img> อาจไม่เต็ม div (centered) → ต้องบวก offset เพื่อให้ tag อยู่ตรงตำแหน่งที่ถูกต้อง
            const offsetX = imgRect.left - divRect.left; // ระยะว่างซ้ายของ img ใน div
            const offsetY = imgRect.top - divRect.top;   // ระยะว่างบนของ img ใน div

            // คำนวณตำแหน่ง tag ใน div (px)
            // item.posX / posY เป็นอัตราส่วน (0–1) ของรูปจริง
            // left = offsetX + posX * imgWidth
            // top  = offsetY + posY * imgHeight
            // จะได้ตำแหน่ง tag แบบ absolute ภายใน div ครอบรูป
            const left = offsetX + Number(item.posX) * imgSize.width;
            const top = offsetY + Number(item.posY) * imgSize.height;

          return (
            <div
              key={index}
              className="absolute flex flex-col items-center shadow-sm"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                transform: "translate(-50%, -100%)"
              }}
            >
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-black/70" />
              <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                {item.productName}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default TagPhoto;
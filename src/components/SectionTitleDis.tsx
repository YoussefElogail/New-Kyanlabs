import React from 'react'

type SectionTitleType = {
    title: string;
    subtitle?: string;
    classN?: "main-section-title-dis" | "second-section-title-dis";
}

export default function SectionTitleDis({title, subtitle, classN}:SectionTitleType) {
  return (
    <div className={`${classN} space-y-2 ps-[20px!important]`}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
    </div>
  )
}

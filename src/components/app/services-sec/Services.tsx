import React from "react";

type ServiceProps = {
  icon: React.ReactElement;
  title: string;
  dic: string;
};

export default function Services({ icon, title, dic }: ServiceProps) {
  return (
    <div className="service">
      <div className="flex justify-center" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{dic}</p>
    </div>
  );
}

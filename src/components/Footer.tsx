import React from "react";
import Image from "next/image";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

const infos = (address:string)=> [
  {
    icon: <MapPin color="#2bbaa5" />,
    title: "Address",
    content: address,
  },
  {
    icon: <Mail color="#2bbaa5" />,
    title: "Mail",
    content: "support@kyanlabs.com",
  },
  {
    icon: <Phone color="#2bbaa5" />,
    title: "Phone",
    content: "01024856345",
  },
];

const socialMedia = [
  {
    icon: <Facebook color="#1877f2" />,
    url: "https://www.facebook.com/kyanlabsoffical",
    name: "Facebook",
  },
  // {
  //   icon: <Twitter color="#1da1f2" />,
  //   url: "https://www.facebook.com/kyanlabsoffical",
  // },
  // {
  //   icon: <Facebook color="#1877f2" />,
  //   url: "https://www.facebook.com/kyanlabsoffical",
  // },
  {
    icon: <Linkedin color="#0a66c2" />,
    url: "https://www.linkedin.com/company/kyanlabs",
    name: "LinkedIn",
  },
]

export default function Footer() {

  const t = useTranslations('HomePage.Footer');

  return (
    <footer className="bg-slate-300" role="contentinfo">
      <div className="container grid md:grid-cols-3 gap-5 p-8 ">
        <div className="flex flex-col justify-start items-start gap-5">
          <Image
            src={"/images/logo/logo.png"}
            height={50}
            width={50}
            alt="logo"
            className="grayscale"
          />
          <p>
            {t("footerDes")}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-5">
          {infos(t("location")).map((info, i) => (
            <div key={i} className="flex gap-4">
              <div>{info.icon}</div>
              <div>
                <p>{info.title}</p>
                <p>{info.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-start gap-5">
          {socialMedia.map((item,i)=> 
            <div key={i} className="p-2 w-fit">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Visit our ${item.name} page`}
              >
                {item.icon}
                <span className="sr-only">{item.name}</span>
              </a>
            </div>
          )}
        </div>
        
      </div>
      <div className="container text-center text-black p-4">
        {t("All rights reserved")}
      </div>
    </footer>
  );
}

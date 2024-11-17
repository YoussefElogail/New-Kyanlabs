"use client"
import React, {useEffect, useState} from "react";

export default function ContactUsMap() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    if(!isClient) {
        return null;
    }

    return (
    <div style={{ width: "100%" }}>
      <iframe
        width="100%"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="location"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=29%C2%B058'30.0%22N%2031%C2%B016'58.5%22E+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      >
        <a href="https://www.gps.ie/">gps devices</a>
      </iframe>
    </div>
  );
}

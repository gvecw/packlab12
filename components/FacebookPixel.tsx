"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

const FB_PIXEL_ID = "2460863961036980";

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    // This will run on every route change
    if (typeof window.fbq === "undefined") return;

    if (!initialized.current) {
      const testEventCode = searchParams.get("test_event_code");
      const initOptions = testEventCode ? { test_event_code: testEventCode } : {};
      
      window.fbq("init", FB_PIXEL_ID, initOptions);
      initialized.current = true;
      console.log(`[Facebook Pixel] Initialized with ID: ${FB_PIXEL_ID}`, initOptions);
    }

    const testEventCode = searchParams.get("test_event_code");
    const options = testEventCode ? { test_event_code: testEventCode } : {};

    window.fbq("track", "PageView", {}, options);
    
    console.log(`[Facebook Pixel] Event tracked: PageView at ${pathname}`, options);
  }, [pathname, searchParams]);

  const handleScriptLoad = () => {
    if (typeof window.fbq === "undefined") return;
    
    if (!initialized.current) {
      const testEventCode = searchParams.get("test_event_code");
      const initOptions = testEventCode ? { test_event_code: testEventCode } : {};
      
      window.fbq("init", FB_PIXEL_ID, initOptions);
      initialized.current = true;
      console.log(`[Facebook Pixel] Initialized on script load with ID: ${FB_PIXEL_ID}`, initOptions);
      
      window.fbq("track", "PageView", {}, initOptions);
      console.log(`[Facebook Pixel] Event tracked on script load: PageView at ${pathname}`, initOptions);
    }
  };

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

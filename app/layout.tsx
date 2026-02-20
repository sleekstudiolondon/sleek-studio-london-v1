import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Sleek Studio London',
    template: '%s - Sleek Studio London'
  },
  description: 'Luxury digital marketing for interior designers in London.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="file-protocol-fixes" strategy="beforeInteractive">
          {`
(function () {
  if (location.protocol !== 'file:') return;
  var path = location.pathname.replace(/\\\\/g, '/');
  var marker = '/out/';
  var idx = path.lastIndexOf(marker);
  if (idx === -1) return;
  var root = path.slice(0, idx + marker.length);
  var fixAttr = function (el, attr) {
    var val = el.getAttribute(attr);
    if (!val || val[0] !== '/') return;
    el.setAttribute(attr, root + val.slice(1));
  };
  var fixAll = function () {
    document.querySelectorAll('a[href^="/"]').forEach(function (el) { fixAttr(el, 'href'); });
    document.querySelectorAll('link[href^="/"]').forEach(function (el) { fixAttr(el, 'href'); });
    document.querySelectorAll('script[src^="/"]').forEach(function (el) { fixAttr(el, 'src'); });
    document.querySelectorAll('img[src^="/"]').forEach(function (el) { fixAttr(el, 'src'); });
    document.querySelectorAll('source[srcset^="/"]').forEach(function (el) { fixAttr(el, 'srcset'); });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixAll);
  } else {
    fixAll();
  }
  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest('a[href^="/"]');
    if (link) fixAttr(link, 'href');
  });
})();
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

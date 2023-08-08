import '../styles/globals.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Suspense} from 'react';
import Loading from './loading'


export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <Suspense fallback={<Loading/>}>
        <body>
          {children}
        </body>
      </Suspense>
    </html>
  )
}

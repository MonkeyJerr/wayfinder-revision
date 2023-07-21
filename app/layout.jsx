import '../styles/globals.css';
import "react-big-calendar/lib/css/react-big-calendar.css";


export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

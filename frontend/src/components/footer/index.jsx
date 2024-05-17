
import { Footer as AntFooter } from 'antd/lib/layout/layout'
function Footer() {
  return (
    <AntFooter style={{ textAlign: "center", backgroundColor: "#d5bdaf" }}>
        ©{new Date().getFullYear()} Mugla Sitki Kocman University 2024 -
        Software Engineering - Fundamentals of Database Systems - Barış Can
        Ataklı
      </AntFooter>
  )
}

export default Footer

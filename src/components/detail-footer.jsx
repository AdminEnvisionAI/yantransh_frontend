import Link from "next/link";
import { T } from "../theme";

/** Compact footer used on industry, service and legal pages. */
export default function DetailFooter() {
  return (
    <footer style={{ padding: "30px 0", background: T.bgAlt, borderTop: `1px solid ${T.bdr}` }}>
      <div style={{ maxWidth: T.mw, margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <Link href="/" style={{ fontFamily: T.fn, fontWeight: 800, fontSize: 16, color: T.navy, textDecoration: "none" }}>
            <span style={{ color: T.blue }}>Y</span>antransh<span style={{ color: T.blue }}>VT</span>
          </Link>
          <span style={{ fontFamily: T.fn, fontSize: 12, color: T.txtS }}>{"©"} {new Date().getFullYear()} YantranshVT Solutions. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

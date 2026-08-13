"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.wrapper}>
      {/* Top Header Information Bar */}
    

      {/* Main Navigation Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logo}>
            FNCE<span style={{ color: "#2E7C68" }}>.</span>
          </div>

          <nav style={styles.navLinks}>
            <Link href="/dashboard" style={styles.navLink}>
              Dashboard
            </Link>
            <Link href="/login" style={styles.navLink}>
              Entrar
            </Link>
          </nav>

          <Link href="/register">
            <button style={styles.ctaButton}>Criar Conta</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Serviços Financeiros</h1>
          <p style={styles.heroSubtitle}>
            Gestão financeira inteligente e simplificada para a sua empresa crescer
          </p>

          <div style={styles.heroButtons}>
            <Link href="/register">
              <button style={styles.primaryBtn}>Começar Agora</button>
            </Link>
            <Link href="/dashboard">
              <button style={styles.secondaryBtn}>Acessar Dashboard</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  topBar: {
    backgroundColor: "#123C3F",
    color: "#EDE5D8",
    fontSize: "13px",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  topBarContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  header: {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#123C3F",
    letterSpacing: "-0.5px",
  },
  navLinks: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },
  navLink: {
    color: "#123C3F",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    transition: "color 0.2s",
  },
  ctaButton: {
    backgroundColor: "#2E7C68",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  heroSection: {
    position: "relative",
    height: "calc(100vh - 110px)",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(18, 60, 63, 0.75)", // Overlay escuro usando tom #123C3F
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: "800px",
    padding: "0 20px",
    color: "#ffffff",
  },
  heroTitle: {
    fontSize: "56px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#ffffff",
    lineHeight: 1.1,
  },
  heroSubtitle: {
    fontSize: "20px",
    color: "#EDE5D8",
    marginBottom: "35px",
    fontWeight: "300",
  },
  heroButtons: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#2E7C68",
    color: "#ffffff",
    padding: "14px 32px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  secondaryBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(5px)",
    padding: "14px 32px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
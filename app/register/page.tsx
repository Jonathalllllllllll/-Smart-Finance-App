"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    alert("Enviado!");
  };

  return (
    <main style={styles.pageWrapper}>
      <div style={styles.cardContainer}>
        {/* Lado Esquerdo: Formulário */}
        <div style={styles.formSection}>
          <div style={styles.logo}>
            FNCE<span style={{ color: "#2E7C68" }}>.</span>
          </div>

          <div style={styles.navTabs}>
            <Link href="/login" style={styles.inactiveTab}>
              Log In
            </Link>
            <span style={styles.activeTab}>Sign Up</span>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>E-mail</label>
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Senha</label>
              <input
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              Cadastrar
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerText}>ou</span>
          </div>

          {/* Botões de Login Social */}
          <div style={styles.socialButtons}>
            <button type="button" style={styles.socialBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Entrar com Google</span>
            </button>

            <button type="button" style={{ ...styles.socialBtn, backgroundColor: "#1877F2", color: "#fff" }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Entrar com Facebook</span>
            </button>
          </div>
        </div>

        {/* Lado Direito: Banner Visual Verde (Sem o monitor) */}
        <div style={styles.bannerSection}>
          <div style={styles.decorationCircle1} />
          <div style={styles.decorationCircle2} />

          <div style={styles.bannerContent}>
            <h2 style={styles.bannerTitle}>
              Todas as suas finanças em um só lugar.
            </h2>
            <p style={styles.bannerSubtitle}>
              Acompanhe seus rendimentos e mantenha sua empresa em crescimento contínuo.
            </p>
          </div>

          <div style={styles.carouselIndicators}>
            <span style={{ ...styles.dot, opacity: 0.4 }} />
            <span style={{ ...styles.dot, width: "24px", opacity: 1 }} />
            <span style={{ ...styles.dot, opacity: 0.4 }} />
          </div>
        </div>
      </div>
    </main>
  );
}

// Estilos complementares que utilizam a paleta do seu globals.css
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    width: "100%",
    maxWidth: "960px",
    minHeight: "560px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(18, 60, 63, 0.08)",
    overflow: "hidden",
    flexWrap: "wrap",
  },
  formSection: {
    flex: "1 1 420px",
    padding: "40px 50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#123C3F",
    marginBottom: "30px",
    letterSpacing: "-0.5px",
  },
  navTabs: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
  },
  activeTab: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#123C3F",
    borderBottom: "2px solid #2E7C68",
    paddingBottom: "4px",
    cursor: "default",
  },
  inactiveTab: {
    fontSize: "18px",
    color: "#8FA3A1",
    textDecoration: "none",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#123C3F",
  },
  submitBtn: {
    width: "100%",
    marginTop: "10px",
    fontWeight: "bold",
  },
  divider: {
    textAlign: "center",
    margin: "20px 0",
    position: "relative",
  },
  dividerText: {
    color: "#8FA3A1",
    fontSize: "14px",
    backgroundColor: "#fff",
    padding: "0 10px",
  },
  socialButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  socialBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backgroundColor: "#F4F7F6",
    color: "#123C3F",
    border: "1px solid #C6E7DA",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  bannerSection: {
    flex: "1 1 400px",
    backgroundColor: "#2E7C68",
    color: "#ffffff",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  decorationCircle1: {
    position: "absolute",
    top: "-50px",
    right: "-50px",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  decorationCircle2: {
    position: "absolute",
    bottom: "-80px",
    left: "-40px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  bannerContent: {
    margin: "auto 0",
    position: "relative",
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "15px",
    lineHeight: "1.2",
  },
  bannerSubtitle: {
    fontSize: "16px",
    color: "#E2F2EC",
    lineHeight: "1.5",
  },
  carouselIndicators: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    transition: "all 0.3s ease",
  },
};
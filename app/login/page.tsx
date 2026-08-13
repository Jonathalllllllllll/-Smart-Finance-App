"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Importação do Router

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const router = useRouter(); // 2. Inicialização do Router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o <form>

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      
      // 3. Redireciona o usuário para o dashboard
      router.push("/dashboard");
    } else {
      alert(data.error || "Falha ao fazer login");
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">

        {/* LADO ESQUERDO */}
        <section className="login-form-area">

          <div className="login-form-content">

            <div className="login-logo">
              <span>SMART</span>
              <strong>FINANCE.</strong>
            </div>

            <h1>Log In</h1>

            <p className="login-subtitle">
              Acesse sua conta
            </p>

            {/* ENVOLVIDO COM A TAG <form> AGORA */}
            <form onSubmit={handleLogin}>
              <input
                className="login-input"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <button
                type="submit"
                className="login-button"
              >
                Log In
              </button>
            </form>

            <div className="login-or">
              <span>ou</span>
            </div>

            <div className="login-social">
              <button type="button" className="social-button google">
                <span>G</span>
                Log In
              </button>

              <button type="button" className="social-button facebook">
                <span>f</span>
                Log In
              </button>
            </div>

          </div>

        </section>

        {/* LADO DIREITO */}
        <section className="login-visual">
          <div className="login-decoration decoration-1"></div>
          <div className="login-decoration decoration-2"></div>

          <div className="login-visual-content">
            <div className="finance-dashboard">
              <div className="dashboard-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="chart">
                <div className="chart-line"></div>
                <div className="chart-bars">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="dashboard-bottom">
                <div></div>
                <div></div>
              </div>
            </div>

            <div className="plant plant-left">🌱</div>
            <div className="plant plant-right">🪴</div>

            <h2>
              Controle suas finanças
              <br />
              em um só lugar.
            </h2>

            <div className="login-dots">
              <span></span>
              <span className="active"></span>
              <span></span>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}



/*"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login feito!");
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">

        {}
        <section className="login-form-area">

          <div className="login-form-content">

            <div className="login-logo">
              <span>SMART</span>
              <strong>FINANCE.</strong>
            </div>

            <h1>Log In</h1>

            <p className="login-subtitle">
              Acesse sua conta
            </p>

            <input
              className="login-input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              className="login-button"
              onClick={handleLogin}
            >
              Log In
            </button>

            <div className="login-or">
              <span>ou</span>
            </div>

            <div className="login-social">

              <button className="social-button google">
                <span>G</span>
                Log In
              </button>

              <button className="social-button facebook">
                <span>f</span>
                Log In
              </button>

            </div>

          </div>

        </section>

        { }
        <section className="login-visual">

          <div className="login-decoration decoration-1"></div>
          <div className="login-decoration decoration-2"></div>

          <div className="login-visual-content">

            <div className="finance-dashboard">

              <div className="dashboard-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="chart">

                <div className="chart-line"></div>

                <div className="chart-bars">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>

              <div className="dashboard-bottom">
                <div></div>
                <div></div>
              </div>

            </div>

            <div className="plant plant-left">
              🌱
            </div>

            <div className="plant plant-right">
              🪴
            </div>

            <h2>
              Controle suas finanças
              <br />
              em um só lugar.
            </h2>

            <div className="login-dots">
              <span></span>
              <span className="active"></span>
              <span></span>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

*/
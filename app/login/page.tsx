"use client";

import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("user", data.user);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("token", data.token);

            if (data.rol === "admin") {
                window.location.href = "/proyectos/admin";
            } else {
                window.location.href = "/proyectos";
            }
        } else {
            alert(data.error);
        }
    };

    return (
        <main className="min-h-screen bg-[#050814] text-white flex items-center justify-center px-6">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-[#08111f] border border-[#00d9ff]/40 rounded-2xl p-8 shadow-lg shadow-cyan-500/20"
            >
                <h1 className="text-3xl font-bold text-[#00d9ff] text-center mb-2">
                    Login
                </h1>

                <p className="text-gray-400 text-center mb-8">
                    Accede como usuario o administrador.
                </p>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />

                    <button
                        type="submit"
                        className="bg-[#00d9ff] text-black font-bold py-3 rounded-lg hover:bg-[#00b8d4] transition"
                    >
                        Entrar
                    </button>

                    <a
                        href="/register"
                        className="text-center text-sm text-gray-400 hover:text-[#00d9ff]"
                    >
                        Crear cuenta nueva
                    </a>

                    <a
                        href="/proyectos"
                        className="text-center text-sm text-gray-400 hover:text-[#00d9ff]"
                    >
                        Volver al catálogo
                    </a>
                </div>
            </form>
        </main>
    );
}
"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    const validarFormulario = () => {
        const regexUsuario = /^[A-Za-z0-9]{3,20}$/;
        const regexPassword = /^[A-Za-z0-9]{6,30}$/;

        if (!regexUsuario.test(username)) {
            return "El usuario debe tener entre 3 y 20 caracteres y solo letras y números.";
        }

        if (!regexPassword.test(password)) {
            return "La contraseña debe tener entre 6 y 30 caracteres y solo letras y números.";
        }

        return "";
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensaje("");

        const errorValidacion = validarFormulario();

        if (errorValidacion) {
            setMensaje(errorValidacion);
            return;
        }

        setCargando(true);

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.trim(),
                password: password.trim(),
            }),
        });

        const data = await res.json();

        setCargando(false);

        if (data.success) {
            alert("Usuario registrado correctamente");
            window.location.href = "/login";
        } else {
            setMensaje(data.error || "Error al registrar usuario");
        }
    };

    return (
        <main className="min-h-screen bg-[#050814] text-white flex items-center justify-center px-6">
            <form
                onSubmit={handleRegister}
                className="w-full max-w-md bg-[#08111f] border border-[#00d9ff]/40 rounded-2xl p-8 shadow-lg shadow-cyan-500/20"
            >
                <h1 className="text-3xl font-bold text-[#00d9ff] text-center mb-2">
                    Crear cuenta
                </h1>

                <p className="text-gray-400 text-center mb-8">
                    Regístrate para poder dejar reseñas.
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

                    {mensaje && (
                        <p className="text-red-400 text-sm text-center">{mensaje}</p>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="bg-[#00d9ff] text-black font-bold py-3 rounded-lg hover:bg-[#00b8d4] transition disabled:opacity-50"
                    >
                        {cargando ? "Registrando..." : "Registrarme"}
                    </button>

                    <a
                        href="/login"
                        className="text-center text-sm text-gray-400 hover:text-[#00d9ff]"
                    >
                        Ya tengo cuenta
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
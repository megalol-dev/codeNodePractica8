"use client";

import { useEffect, useState } from "react";

export default function ProyectosPage() {
    const [proyectos, setProyectos] = useState<any[]>([]);
    const [user, setUser] = useState<string | null>(null);
    const [rol, setRol] = useState<string | null>(null);

    useEffect(() => {
        setUser(localStorage.getItem("user"));
        setRol(localStorage.getItem("rol"));

        fetch("/api/proyectos")
            .then((res) => res.json())
            .then((data) => setProyectos(data));
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        localStorage.removeItem("rol");
        localStorage.removeItem("token");

        window.location.href = "/proyectos";
    };

    return (
        <main className="min-h-screen bg-[#050814] text-white">
            <header className="border-b border-[#00d9ff]/20 p-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[#00d9ff]">
                            Catálogo de videojuegos
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Juegos guardados en SQLite y servidos desde tu API de Next.js.
                        </p>
                    </div>

                    <nav className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-sm text-[#00d9ff]">
                                    Sesión: {user}
                                </span>

                                {rol === "admin" && (
                                    <a
                                        href="/proyectos/admin"
                                        className="bg-[#00d9ff] text-black px-4 py-2 rounded font-bold hover:bg-[#00b8d4]"
                                    >
                                        Panel admin
                                    </a>
                                )}

                                <button
                                    onClick={cerrarSesion}
                                    className="text-sm text-red-400 hover:text-red-300"
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="text-sm text-gray-300 hover:text-white"
                                >
                                    Login
                                </a>

                                <a
                                    href="/register"
                                    className="text-sm text-gray-300 hover:text-white"
                                >
                                    Registro
                                </a>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <section className="max-w-6xl mx-auto px-8 py-10">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {proyectos.map((juego: any) => (
                        <article
                            key={juego.id}
                            className="bg-[#08111f] border border-[#00d9ff]/40 rounded-2xl p-6 shadow-lg shadow-cyan-500/10"
                        >
                            <h2 className="text-2xl font-bold text-[#00d9ff] mb-2">
                                {juego.titulo}
                            </h2>

                            <p className="text-sm text-gray-400 mb-2">
                                {juego.compania} · {juego.anio}
                            </p>

                            <p className="text-sm mb-2">{juego.genero}</p>
                            <p className="text-sm mb-2">{juego.informacion}</p>
                            <p className="text-sm mb-2">Nota gestor: {juego.nota}/10</p>

                            <p className="text-gray-200 border-t border-[#00d9ff]/20 pt-3 mb-4">
                                {juego.conclusion}
                            </p>

                            <a
                                href={`/proyectos/${juego.id}/resenas`}
                                className="inline-block bg-[#00d9ff] text-black font-bold px-4 py-2 rounded hover:bg-[#00b8d4]"
                            >
                                {user ? "Poner / editar reseña" : "Ver reseñas"}
                            </a>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
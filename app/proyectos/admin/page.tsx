"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [proyectos, setProyectos] = useState<any[]>([]);

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        const token = localStorage.getItem("token");

        if (rol !== "admin" || !token) {
            window.location.href = "/login";
            return;
        }

        setIsAdmin(true);

        fetch("/api/proyectos")
            .then((res) => res.json())
            .then((data) => setProyectos(data));
    }, []);

    const borrarJuego = async (id: number) => {
        const confirmar = confirm("¿Seguro que quieres borrar este juego?");

        if (!confirmar) return;

        const res = await fetch(`/api/proyectos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();

        if (data.success) {
            alert("Juego borrado correctamente");
            setProyectos(proyectos.filter((juego) => juego.id !== id));
        } else {
            alert(data.error || "Error al borrar");
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        localStorage.removeItem("rol");
        localStorage.removeItem("token");

        window.location.href = "/proyectos";
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <main className="min-h-screen bg-[#050814] text-white">
            <header className="border-b border-[#00d9ff]/20 px-8 py-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#00d9ff]">
                            Panel de administración
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Gestiona el catálogo de videojuegos.
                        </p>
                    </div>

                    <nav className="flex gap-4 items-center">
                        <a href="/proyectos" className="text-gray-300 hover:text-[#00d9ff]">
                            Ver catálogo
                        </a>

                        <button
                            onClick={cerrarSesion}
                            className="text-red-400 hover:text-red-300"
                        >
                            Cerrar sesión
                        </button>
                    </nav>
                </div>
            </header>

            <section className="max-w-6xl mx-auto px-8 py-10">
                <div className="mb-8">
                    <a
                        href="/proyectos/nuevo"
                        className="inline-block bg-[#00d9ff] text-black font-bold px-5 py-3 rounded-lg hover:bg-[#00b8d4] transition"
                    >
                        + Crear nuevo juego
                    </a>
                </div>

                <div className="grid gap-6">
                    {proyectos.map((juego) => (
                        <article
                            key={juego.id}
                            className="bg-[#08111f] border border-[#00d9ff]/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-[#00d9ff]">
                                    {juego.titulo}
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    ID {juego.id} · {juego.compania} · {juego.anio}
                                </p>

                                <p className="text-gray-300 mt-2">
                                    {juego.genero} · Nota: {juego.nota}/10
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <a
                                    href={`/proyectos/editar/${juego.id}`}
                                    className="bg-[#00d9ff] text-black font-bold px-4 py-2 rounded hover:bg-[#00b8d4]"
                                >
                                    Editar
                                </a>

                                <button
                                    onClick={() => borrarJuego(juego.id)}
                                    className="bg-red-600 text-white font-bold px-4 py-2 rounded hover:bg-red-500"
                                >
                                    Borrar
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
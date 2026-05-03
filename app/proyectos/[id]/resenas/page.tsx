"use client";

import { use, useEffect, useState } from "react";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function ResenasPage({ params }: PageProps) {
    const { id } = use(params);

    const [juego, setJuego] = useState<any>(null);
    const [resenas, setResenas] = useState<any[]>([]);
    const [nota, setNota] = useState("");
    const [comentario, setComentario] = useState("");
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        setUser(localStorage.getItem("user"));

        fetch(`/api/proyectos/${id}`)
            .then((res) => res.json())
            .then((data) => setJuego(data));

        fetch(`/api/resenas/${id}`)
            .then((res) => res.json())
            .then((data) => setResenas(data));
    }, [id]);

    const enviarResena = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión para dejar una reseña");
            window.location.href = "/login";
            return;
        }

        const res = await fetch(`/api/resenas/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nota: Number(nota),
                comentario,
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Reseña publicada correctamente");
            window.location.reload();
        } else {
            alert(data.error || "Error al publicar reseña");
        }
    };

    return (
        <main className="min-h-screen bg-[#050814] text-white px-8 py-10">
            <section className="max-w-4xl mx-auto">
                <a href="/proyectos" className="text-[#00d9ff] hover:underline">
                    ← Volver al catálogo
                </a>

                <header className="my-8">
                    <h1 className="text-4xl font-bold text-[#00d9ff]">
                        Reseñas de {juego?.titulo || "videojuego"}
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Opiniones de usuarios registrados.
                    </p>
                </header>

                {user ? (
                    <div className="bg-[#08111f] border border-[#00d9ff]/30 rounded-2xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-[#00d9ff] mb-4">
                            Escribir reseña como {user}
                        </h2>

                        <form onSubmit={enviarResena} className="flex flex-col gap-4">
                            <input
                                type="number"
                                min="1"
                                max="10"
                                placeholder="Nota del 1 al 10"
                                value={nota}
                                onChange={(e) => setNota(e.target.value)}
                                className="input"
                                required
                            />

                            <textarea
                                placeholder="Tu reseña"
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                className="input"
                                required
                            />

                            <button className="bg-[#00d9ff] text-black font-bold py-2 rounded hover:bg-[#00b8d4]">
                                Publicar reseña
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-[#08111f] border border-[#00d9ff]/30 rounded-2xl p-6 mb-8">
                        <p className="text-gray-300 mb-4">
                            Puedes ver reseñas, pero debes iniciar sesión para escribir una.
                        </p>

                        <a
                            href="/login"
                            className="inline-block bg-[#00d9ff] text-black font-bold px-4 py-2 rounded hover:bg-[#00b8d4]"
                        >
                            Iniciar sesión
                        </a>
                    </div>
                )}

                <div className="grid gap-4">
                    {resenas.length === 0 ? (
                        <p className="text-gray-400">Todavía no hay reseñas.</p>
                    ) : (
                        resenas.map((resena) => (
                            <article
                                key={resena.id}
                                className="bg-[#08111f] border border-[#00d9ff]/20 rounded-xl p-5"
                            >
                                <div className="flex justify-between gap-4 mb-3">
                                    <h3 className="font-bold text-[#00d9ff]">
                                        {resena.username}
                                    </h3>

                                    <span className="text-sm text-gray-400">
                                        {resena.fecha}
                                    </span>
                                </div>

                                <p className="text-sm mb-2">Nota: {resena.nota}/10</p>

                                <p className="text-gray-200">{resena.comentario}</p>
                            </article>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
"use client";

import { useEffect, useState } from "react";

export default function NuevoProyecto() {
    const [form, setForm] = useState({
        titulo: "",
        compania: "",
        anio: "",
        genero: "",
        informacion: "",
        nota: "",
        conclusion: "",
    });

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        const token = localStorage.getItem("token");

        if (rol !== "admin" || !token) {
            window.location.href = "/login";
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const res = await fetch("/api/proyectos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...form,
                anio: Number(form.anio),
                nota: Number(form.nota),
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Juego añadido correctamente");
            window.location.href = "/proyectos/admin";
        } else {
            alert(data.error || "Error al añadir");
        }
    };

    return (
        <main className="min-h-screen bg-[#050814] text-white px-8 py-10">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-bold text-[#00d9ff] mb-6">
                    Añadir videojuego
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 bg-[#08111f] p-6 rounded-xl border border-[#00d9ff]/30"
                >
                    <input name="titulo" placeholder="Título" onChange={handleChange} className="input" required />
                    <input name="compania" placeholder="Compañía" onChange={handleChange} className="input" required />
                    <input name="anio" placeholder="Año" onChange={handleChange} className="input" />
                    <input name="genero" placeholder="Género" onChange={handleChange} className="input" />
                    <textarea name="informacion" placeholder="Información" onChange={handleChange} className="input" />
                    <input name="nota" placeholder="Nota" onChange={handleChange} className="input" />
                    <textarea name="conclusion" placeholder="Conclusión" onChange={handleChange} className="input" />

                    <button
                        type="submit"
                        className="bg-[#00d9ff] text-black font-bold py-2 rounded hover:bg-[#00b8d4]"
                    >
                        Crear juego
                    </button>
                </form>
            </div>
        </main>
    );
}